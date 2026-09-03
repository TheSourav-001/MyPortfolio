const { getDriver } = require('../utils/driverSetup');
const LoginPage = require('../pages/LoginPage');
const fs = require('fs');
const { expect } = require('chai');

describe('AwesomeQA Login Feature', function() {
    let driver;
    let loginPage;
    let testData;

    before(function() {
        const rawData = fs.readFileSync('./utils/testData.json');
        testData = JSON.parse(rawData);
    });

    beforeEach(async function() {
        driver = await getDriver();
        loginPage = new LoginPage(driver);
    });

    afterEach(async function() {
        if (driver) {
            await driver.quit();
        }
    });

    // TC-01: Successful Login
    it('TC-01: Should login successfully with registered credentials', async function() {
        await loginPage.openPage();

        await loginPage.enterEmail(testData.email); 
        await loginPage.enterPassword(testData.password);
        await loginPage.clickLogin();
        
        await driver.sleep(1000); 
        let title = await driver.getTitle();
        expect(title).to.equal('My Account'); 
    });

    // TC-02: Invalid Password (Negative Test)
    it('TC-02: Should not login with wrong password', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail(testData.email);
        await loginPage.enterPassword('WrongPassword123!');
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });

    // TC-03: Unregistered/Invalid Email (Negative Test)
    it('TC-03: Should not login with unregistered email', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail('abcd_12345@gmail.com');
        await loginPage.enterPassword(testData.password);
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });

    // TC-04: SQL Injection in Login (Security Test)
    it('TC-04: Should handle SQL injection safely in login', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail("' OR '1'='1");
        await loginPage.enterPassword("' OR '1'='1");
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    }); // Closing TC-04

    // TC-05: Keep empty fields both email and password 
    it('TC-05: Should not login with empty email and password', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail(" ");
        await loginPage.enterPassword(" ");
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });

    // TC-05: Empty Email Field (Negative Test)
    it('TC-05: Should not login with empty email field', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail('');
        await loginPage.enterPassword(testData.password);
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });

    // TC-06: Empty Password Field (Negative Test)
    it('TC-06: Should not login with empty password field', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail(testData.email);
        await loginPage.enterPassword('');
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });

    // TC-07: Both Fields Empty (Negative Test)
    it('TC-07: Should not login with both fields empty', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail('');
        await loginPage.enterPassword('');
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });

    // TC-08: Invalid Email Format (Negative Test)
    it('TC-08: Should not login with invalid email format', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail('invalidemail');
        await loginPage.enterPassword(testData.password);
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });

    // TC-09: Password Minimum Length Validation (Negative Test)
    it('TC-09: Should not login with password shorter than minimum length', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail(testData.email);
        await loginPage.enterPassword('123');
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });

    // TC-10: Password Maximum Length Validation (Negative Test)
    it('TC-10: Should not login with password longer than maximum length', async function() {
        await loginPage.openPage();
        
        await loginPage.enterEmail(testData.email);
        await loginPage.enterPassword('a'.repeat(101));
        await loginPage.clickLogin();

        let title = await driver.getTitle();
        expect(title).to.not.equal('My Account');
    });
});