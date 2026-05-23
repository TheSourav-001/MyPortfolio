# Sourav Dipto Shill Apu - Professional QA Engineering Portfolio

<div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
  <img src="myphoto/SOURAV.webp" width="49%" alt="QA Portfolio Banner" />
  <img src="https://github.com/user-attachments/assets/6b0843bd-0c36-4cc4-b498-a1c952e974c4" width="49%" alt="WhatsApp Image" />
</div>

> **"Turning bugs into better experiences."**

Welcome to the official repository for my professional Quality Assurance Engineering portfolio. This project is a modern, responsive, and highly interactive single-page application (SPA) designed to showcase my expertise in manual and automated testing, technical skills, and project experience.

---

## Key Features

* **Advanced Glassmorphism UI:** A sleek, premium design utilizing modern CSS backdrop-filters and subtle neon glows tailored for both Dark and Light themes.
* **Dynamic Node.js Automation:** Integrates a custom Node.js script (`count_test_cases.js`) that automatically parses `.xlsx` and `.pdf` files from the local filesystem to compute exact test case metrics and seamlessly injects them into the DOM.
* **Live GitHub API Integration:** Fetches real-time public repository counts from GitHub to keep the statistics dashboard consistently updated.
* **Custom SVG Network Topology:** Features an intricate, animated SVG workflow diagram that visually maps the entire Software Testing Life Cycle (STLC).
* **Responsive Architecture:** Fully optimized across Ultrawide, Desktop, Tablet, and Mobile devices with coordinated smooth-scroll navigation and intersection-observer reveal animations.

## Technology Stack

* **Frontend:** HTML5, CSS3 (Custom Properties, Flexbox, Grid), Vanilla JavaScript (ES6+).
* **Backend Automation:** Node.js (v24+).
* **Libraries/Dependencies:** 
  * `xlsx` (SheetJS) - For parsing TestRail and Excel execution sheets.
  * `pdf-parse` - For extracting test scenarios from PDF documentation.

## Project Structure

```text
├── index.html                   # Main single-page application structure
├── style.css                    # Design tokens, theme variables, and responsive styling
├── script.js                    # Core frontend logic (animations, APIs, observers)
├── count_test_cases.js          # Node.js automation script for parsing test evidence
├── package.json                 # Node.js dependencies
├── QA Evidence Gallery/         # Directory containing Excel and PDF test execution files
├── Insights & Articles/         # PDF research papers and QA testing articles
├── mycv/                        # Downloadable CV files
├── myphoto/                     # Profile imagery
└── tools logo/                  # Tech stack SVG/PNG icons for the marquee
```

## Local Development & Setup

To run this portfolio locally and utilize the dynamic test case compilation:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Installation
Clone the repository and install the required dependencies for the automation script:
```bash
npm install
```

### 3. Update Evidence Statistics
Whenever you add new `.xlsx` or `.pdf` test case documents into the `QA Evidence Gallery/` directory, run the compiler script. This script will scan your files, exclude empty rows and sub-steps, compute the total number of unique test cases, and automatically update `index.html`.
```bash
node count_test_cases.js
```

### 4. Serve the Application
You can use any local HTTP server to view the portfolio. For example, using `npx`:
```bash
npx serve .
```
Or open the folder using the **Live Server** extension in VS Code.

## How The Automation Works

The `count_test_cases.js` script provides build-time automation without sacrificing frontend performance:
1. **Spreadsheet Parsing:** Recursively maps the directory tree and reads `.xlsx` files using `xlsx`. It identifies test cases via standardized ID prefixes (e.g., `TC_`), specifically excluding header rows or secondary step lines.
2. **PDF Extraction:** Buffers binary PDF data and executes a precise Regex filter (`/\bC\d+\s+TC/gi`) across the extracted text to count documented TestRail exports.
3. **DOM Injection:** Locates the exact dynamic markers within `index.html` and injects the new compiled sums natively, requiring zero runtime cost for the end user.

## 📫 Let's Connect

- **LinkedIn:** [Sourav Dipta Shill Apu](https://linkedin.com/in/sourav-dipta-shill-apu-b71a75389)
- **GitHub:** [TheSourav-001](https://github.com/TheSourav-001)
- **Email:** shouravdiptoshillapu@gmail.com

---
*Designed & Engineered for precision.*
