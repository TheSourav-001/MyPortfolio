const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const pdf = require('pdf-parse');

const dirs = [
  path.join(__dirname, 'QA Evidence Gallery', 'All TestCase'),
  path.join(__dirname, 'QA Evidence Gallery', 'TestCase-saucedemo', 'Test Case')
];

let totalCount = 0;
const results = [];

function scanDir(dir) {
  if (!fs.existsSync(dir)) return [];
  let fileList = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      fileList = fileList.concat(scanDir(fullPath));
    } else {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = [];
dirs.forEach(d => {
  allFiles.push(...scanDir(d));
});

const uniqueFiles = Array.from(new Set(allFiles));

async function run() {
  for (const filePath of uniqueFiles) {
    const ext = path.extname(filePath).toLowerCase();
    const basename = path.basename(filePath);
    
    if (ext === '.xlsx') {
      let fileCount = 0;
      const workbook = xlsx.readFile(filePath);
      workbook.SheetNames.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        const rows = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        
        let sheetCount = 0;
        rows.forEach((row, idx) => {
          if (idx === 0) return; // Header
          
          if (basename.includes('Testrail') || (row.length >= 4 && typeof row[2] === 'number')) {
            if (row[2] && row[3]) {
              sheetCount++;
            }
          } else {
            const tcId = row[0];
            if (tcId && typeof tcId === 'string' && tcId.trim().toUpperCase().startsWith('TC')) {
              sheetCount++;
            }
          }
        });
        fileCount += sheetCount;
      });
      totalCount += fileCount;
      results.push({ file: basename, count: fileCount });
    } else if (ext === '.pdf') {
      try {
        const dataBuffer = fs.readFileSync(filePath);
        const uint8Array = new Uint8Array(dataBuffer);
        const parser = new pdf.PDFParse(uint8Array);
        await parser.load();
        const textObj = await parser.getText();
        const text = textObj.text || '';
        
        const matches = text.match(/\bC\d+\s+TC/gi) || [];
        const fileCount = matches.length;
        totalCount += fileCount;
        results.push({ file: basename, count: fileCount });
      } catch (err) {
        console.error(`Error parsing PDF ${basename}:`, err);
      }
    }
  }
  
  console.log('\n=========================================');
  console.log('TEST CASE COUNT BREAKDOWN:');
  results.forEach(res => {
    console.log(`- ${res.file}: ${res.count}`);
  });
  console.log(`TOTAL COMBINED TEST CASES: ${totalCount}`);
  console.log('=========================================');

  // Now, update index.html
  const htmlPath = path.join(__dirname, 'index.html');
  if (fs.existsSync(htmlPath)) {
    let htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    // 1. Update text paragraph
    // Designed and executed 70+ manual test cases across 7 real-world projects
    // or similar variants
    const pRegex = /Designed and executed \d+\+ manual test cases across \d+ real-world projects/g;
    if (pRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(pRegex, `Designed and executed ${totalCount}+ manual test cases across 9 real-world projects`);
      console.log('Updated introductory paragraph test cases count to ' + totalCount + ' and projects to 9.');
    }
    
    // 2. Update stats cards target
    const tcCardRegex = /(<div class="stat-number"[^>]*data-target=")\d+("[^>]*>\s*0\s*<\/div>\s*<div class="stat-label">Test Cases<\/div>)/g;
    if (tcCardRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(tcCardRegex, `$1${totalCount}$2`);
      console.log('Updated Test Cases card target to ' + totalCount + '.');
    }
    
    // Also update Projects card target from whatever it was to 9
    const projCardRegex = /(<div class="stat-number"[^>]*data-target=")\d+("[^>]*>\s*0\s*<\/div>\s*<div class="stat-label">Projects<\/div>)/g;
    if (projCardRegex.test(htmlContent)) {
      htmlContent = htmlContent.replace(projCardRegex, `$19$2`);
      console.log('Updated Projects card target to 9.');
    }
    
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log('Successfully wrote updates to index.html');
  } else {
    console.error('index.html not found!');
  }
}

run();
