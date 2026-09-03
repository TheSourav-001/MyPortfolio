const { By, until } = require('selenium-webdriver');
const config = require('../config/config');

class RegisterPage {
    constructor(driver) {
        this.driver = driver;

        
        this.firstNameInput = By.id('input-firstname');
        this.lastNameInput = By.id('input-lastname');
        this.emailInput = By.id('input-email');
        this.telephoneInput = By.id('input-telephone');
        this.passwordInput = By.id('input-password');
        this.confirmPasswordInput = By.id('input-confirm');
        this.agreeCheckbox = By.name('agree');
        this.continueButton = By.css('input[value="Continue"]');

        
        this.warningMessage = By.css('.alert-danger');
        this.firstNameError = By.css('#input-firstname + .text-danger');
        this.lastNameError = By.css('#input-lastname + .text-danger');
        this.emailError = By.css('#input-email + .text-danger');
        this.telephoneError = By.css('#input-telephone + .text-danger');
        this.passwordError = By.css('#input-password + .text-danger');
    }

    // NAVIGATION
    async openPage() {
        await this.driver.get(`${config.baseURL}/index.php?route=account/register`);
    }

    
    async enterFirstName(firstName) {
        let el = await this.driver.wait(until.elementLocated(this.firstNameInput), 10000);
        await el.clear();
        await el.sendKeys(firstName);
    }

    async enterLastName(lastName) {
        let el = await this.driver.wait(until.elementLocated(this.lastNameInput), 10000);
        await el.clear();
        await el.sendKeys(lastName);
    }

    async enterEmail(email) {
        let el = await this.driver.wait(until.elementLocated(this.emailInput), 10000);
        await el.clear();
        await el.sendKeys(email);
    }

    async enterTelephone(telephone) {
        let el = await this.driver.wait(until.elementLocated(this.telephoneInput), 10000);
        await el.clear();
        await el.sendKeys(telephone);
    }

    async enterPassword(password) {
        let el = await this.driver.wait(until.elementLocated(this.passwordInput), 10000);
        await el.clear();
        await el.sendKeys(password);
    }

    async enterConfirmPassword(password) {
        let el = await this.driver.wait(until.elementLocated(this.confirmPasswordInput), 10000);
        await el.clear();
        await el.sendKeys(password);
    }

    async clickAgreeCheckbox() {
        let el = await this.driver.wait(until.elementLocated(this.agreeCheckbox), 10000);
        await el.click();
    }

    async clickContinue() {
        let el = await this.driver.wait(until.elementLocated(this.continueButton), 10000);
        await el.click();
    }

    
    async getTextSafe(locator) {
        try {
            let el = await this.driver.wait(until.elementLocated(locator), 3000);
            return await el.getText();
        } catch (e) {
            return null;
        }
    }


    async getWarningMessage() {
        return await this.getTextSafe(this.warningMessage);
    }

    async getFirstNameError() {
        return await this.getTextSafe(this.firstNameError);
    }

    async getLastNameError() {
        return await this.getTextSafe(this.lastNameError);
    }

    async getEmailError() {
        return await this.getTextSafe(this.emailError);
    }

    async getTelephoneError() {
        return await this.getTextSafe(this.telephoneError);
    }

    async getPasswordError() {
        return await this.getTextSafe(this.passwordError);
    }
}

module.exports = RegisterPage;