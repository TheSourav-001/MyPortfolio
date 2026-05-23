Copy-Item 'QA Evidence Gallery\TestCase-saucedemo\Bug List\Bug List.xlsx' 'temp_bug_list.zip'
Expand-Archive 'temp_bug_list.zip' 'temp_bug_list'
$xml = [xml](Get-Content 'temp_bug_list\xl\worksheets\sheet1.xml')
$xml.worksheet.sheetData.row.Count
Remove-Item 'temp_bug_list.zip'
Remove-Item -Recurse -Force 'temp_bug_list'
