const { getDriver } = require('../utils/driverSetup');
const RegisterPage = require('../pages/RegisterPage');
const fs = require('fs');
const { expect } = require('chai');

describe('AwesomeQA Registration Feature', function() {
    let driver;
    let registerPage;

    // open browser and initialize page object before each test
    beforeEach(async function() {
        driver = await getDriver();
        registerPage = new RegisterPage(driver);
    });

    // close browser after each test
    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

const SUCCESS_TITLE = 'Your Account Has Been Created!';

// TC-01: Successful registration (Positive)
it('TC-01: Should successfully register a new user', async function() {
    await registerPage.openPage();
   let dynamicEmail = "testuser" + Date.now() + "@gmail.com";
   const testData = {
        email: dynamicEmail,
        password: 'Automation123!'
    };
    fs.writeFileSync('./utils/testData.json', JSON.stringify(testData));

    await registerPage.enterFirstName('Sourav');
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(dynamicEmail);
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.equal(SUCCESS_TITLE);
});

// TC-02: Empty form (Negative)
it('TC-02: Should not register with empty form', async function() {
    await registerPage.openPage();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
});

// TC-03: Invalid email
it('TC-03: Should not register with invalid email', async function() {
    await registerPage.openPage();
    

    await registerPage.enterFirstName('Sourav');
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail('invalidemail');
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
});

// TC-04: Password mismatch
it('TC-04: Should not register when passwords do not match', async function() {
    await registerPage.openPage();
    let dynamicEmail = "testuser" + Date.now() + "@gmail.com";

    await registerPage.enterFirstName('Sourav');
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(dynamicEmail);
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('dsdfbjbskjf');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
});


// TC-05: Without agree checkbox
it('TC-05: Should not register without agreeing to terms', async function() {
    await registerPage.openPage();
    let dynamicEmail = "testuser" + Date.now() + "@gmail.com";

    await registerPage.enterFirstName('Sourav');
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(dynamicEmail);
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
});

// TC-06: Boundary (min name)
it('TC-06: Should handle minimum length first name', async function() {
    await registerPage.openPage();
    let dynamicEmail = "testuser" + Date.now() + "@gmail.com";

    await registerPage.enterFirstName('A');
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(dynamicEmail);
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.exist;
});

// TC-07: Boundary (max name)
it('TC-07: Should handle maximum length first name', async function() {
    await registerPage.openPage();
    let dynamicEmail = "testuser" + Date.now() + "@gmail.com";
    let longName = "A".repeat(50);

    await registerPage.enterFirstName(longName);
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(dynamicEmail);
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
});

// TC-08: Duplicate email
it('TC-08: Should not allow duplicate email', async function() {
    await registerPage.openPage();
    
    let email = "duplicate@test.com";

    await registerPage.enterFirstName('Sourav');
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(email);
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
});

// TC-09: Invalid phone
it('TC-09: Should not register with invalid phone', async function() {
    await registerPage.openPage();
    let dynamicEmail = "testuser" + Date.now() + "@gmail.com";

    await registerPage.enterFirstName('Sourav');
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(dynamicEmail);
    await registerPage.enterTelephone('abc123');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
});

// TC-10: SQL Injection
it('TC-10: Should handle SQL injection safely', async function() {
    await registerPage.openPage();
    let dynamicEmail = "testuser" + Date.now() + "@gmail.com";

    await registerPage.enterFirstName("' OR '1'='1");
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(dynamicEmail);
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
});

// TC-11: XSS
it('TC-11: Should handle XSS safely', async function() {
    await registerPage.openPage();
    let dynamicEmail = "testuser" + Date.now() + "@gmail.com";

    await registerPage.enterFirstName("<script>alert('XSS')</script>");
    await registerPage.enterLastName('Shill');
    await registerPage.enterEmail(dynamicEmail);
    await registerPage.enterTelephone('01711223344');
    await registerPage.enterPassword('Automation123!');
    await registerPage.enterConfirmPassword('Automation123!');
    await registerPage.clickAgreeCheckbox();
    await registerPage.clickContinue();

    let title = await driver.getTitle();
    expect(title).to.not.equal(SUCCESS_TITLE);
}); 

});
