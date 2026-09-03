# AwesomeQA_Automation

## Project Overview
AwesomeQA_Automation is a professional-grade end-to-end UI automation framework built with Selenium WebDriver (JavaScript) and Mocha. The framework follows industry best practices, including the Page Object Model (POM), explicit waits, data-driven testing, and comprehensive reporting. This project demonstrates scalable and maintainable automation suitable for real-world QA teams.

## Features
- **Testing Framework:** Mocha
- **Assertion Library:** Chai
- **Reporting:** Mochawesome (HTML reports)
- **Automation Tool:** Selenium WebDriver
- **Design Pattern:** Page Object Model (POM)
- **Data-Driven Testing:** Test data managed via JSON
- **Continuous Integration:** GitHub Actions (planned)

## Project Structure
- `pages/` — Page Object Model classes for each application page
- `tests/` — Test scripts for login and registration
- `utils/` — Utilities and test data
- `config/` — Configuration files
- `mochawesome-report/` — Auto-generated test reports (see below for recommendations)

## What Has Been Done
- Designed and implemented the project structure following POM
- Developed automated test cases for login and registration
- Created and maintained test data in `utils/testData.json`
- Configured Mocha and Chai for test execution and assertions
- Integrated Mochawesome for detailed HTML reporting
- Authored a comprehensive test strategy in `TEST_STRATEGY.md`

## Limitations
> The original intention was to automate the entire website. However, after completing the initial automation work, the target website became unavailable. As a result, further automation and test coverage could not be completed.

## How to Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run all tests:
   ```bash
   npm test
   ```
3. View the HTML report:
   - The Mochawesome HTML report is generated in the `mochawesome-report/` directory by default.
   - **Recommendation:** For sharing in your GitHub repository, move the latest `mochawesome.html` file to a `docs/` directory at the root of your repository. This makes it easily accessible and viewable on GitHub Pages or as a downloadable artifact.

## Recommendations
- Store the latest Mochawesome HTML report in a `docs/` directory for easy access and sharing.
- Consider integrating Allure reporting for enhanced visualization in future updates.
- Expand test coverage and CI integration when the target website is available again.

---

**Note:** This project is a work in progress and will be updated as new features and test cases are added.
