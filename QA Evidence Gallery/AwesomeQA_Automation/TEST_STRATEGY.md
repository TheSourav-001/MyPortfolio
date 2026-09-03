# System Analysis and Progress

## Project Overview
- **Project Name:** AwesomeQA_Automation
- **Description:** End-to-end UI automation framework using Selenium WebDriver (JavaScript) with Mocha. Implements Page Object Model (POM), explicit waits, data-driven testing, Allure reporting, and GitHub Actions CI. Designed as a scalable, maintainable, real-world QA automation project for portfolio and interview.

## Key Components
1. **Framework:**
   - **Testing Framework:** Mocha
   - **Assertion Library:** Chai
   - **Reporting Tool:** Mochawesome
   - **Automation Tool:** Selenium WebDriver

2. **Dependencies:**
   - chai: ^6.2.2
   - mocha: ^11.7.5
   - mochawesome: ^7.1.4
   - selenium-webdriver: ^4.41.0

3. **Scripts:**
   - `npm test`: Runs all test files in the `tests` directory with a timeout of 30 seconds and generates a Mochawesome report.

## Progress Made
1. **Test Strategy Document:**
   - Created a detailed `TEST_STRATEGY.md` file outlining the testing plan, including:
     - Scope of testing (included and excluded features).
     - Types of testing (Unit, Integration, System, End-to-End).
     - Test environment setup.
     - Test data for login and registration.
     - Tools used for testing.
     - Test schedule prioritizing End-to-End Testing (User Journey).
     - Defect management process.
     - Exit criteria and roles/responsibilities.

2. **Branch Management:**
   - Renamed the feature branch to `feature`.
   - Pushed all updated code to the `feature` branch.

3. **Test Data:**
   - Stored valid login credentials in `testData.json`:
     - Email: `testuser1775852315969@gmail.com`
     - Password: `Automation123!`

4. **Test Execution:**
   - Configured the test runner to execute all test files in the `tests` directory.

# Test Strategy for AwesomeQA_Automation

## Objective
The objective of this test strategy is to outline the approach, scope, and methodology for testing the AwesomeQA_Automation project. This document ensures that the testing process is systematic, efficient, and aligned with industry best practices.

## Scope
- **In-Scope:**
  - End-to-end testing of login and registration functionalities.
  - Validation of user journeys using the Page Object Model (POM).
  - Data-driven testing using JSON-based test data.
  - Generation of detailed test reports using Mochawesome.
- **Out-of-Scope:**
  - Full automation of the target website due to its unavailability.
  - Cross-browser testing and mobile testing.

## Testing Approach
1. **Test Levels:**
   - Unit Testing: Not applicable as this is an end-to-end automation framework.
   - Integration Testing: Validation of interactions between different components (e.g., login and registration).
   - System Testing: Comprehensive testing of the entire application flow.
   - End-to-End Testing: Focus on user journeys and critical workflows.

2. **Test Types:**
   - Functional Testing: Ensures that the application meets the specified requirements.
   - Regression Testing: Verifies that new changes do not break existing functionality.
   - Data-Driven Testing: Uses multiple data sets to validate application behavior.

3. **Test Design:**
   - Test cases are designed based on the requirements and user stories.
   - Each test case includes preconditions, test steps, expected results, and postconditions.

## Test Environment
- **Tools and Frameworks:**
  - Selenium WebDriver for browser automation.
  - Mocha as the test framework.
  - Chai for assertions.
  - Mochawesome for reporting.
- **Browsers:**
  - Google Chrome (latest version).
- **Test Data:**
  - Stored in `utils/testData.json`.

## Test Execution
- Tests are executed using the following command:
  ```bash
  npm test
  ```
- The Mochawesome report is generated in the `mochawesome-report` directory.

## Defect Management
- Defects are logged and tracked using a defect management tool (e.g., Jira, Trello).
- Each defect includes a unique ID, description, steps to reproduce, severity, priority, and status.

## Exit Criteria
- All critical test cases are executed and passed.
- No high-severity defects remain unresolved.
- Test coverage meets the defined goals.

## Roles and Responsibilities
- **Test Engineer:**
  - Design and execute test cases.
  - Report and track defects.
  - Generate test reports.
- **Project Manager:**
  - Define the testing scope and schedule.
  - Ensure resource availability.

## Limitations
- Due to the unavailability of the target website, the full automation of the application could not be completed.

## Recommendations
- Store the Mochawesome HTML report in the `docs` directory of the GitHub repository for easy access.
- Consider integrating Allure reporting for enhanced visualization in future updates.

---

**Note:** This test strategy is a living document and will be updated as the project evolves.