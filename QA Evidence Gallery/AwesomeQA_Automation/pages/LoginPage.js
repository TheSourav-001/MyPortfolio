const { By, until } = require('selenium-webdriver');
const config = require('../config/config');

class LoginPage {
    constructor(driver) {
        this.driver = driver;

        this.emailInput = By.id('input-email');
        this.passwordInput = By.id('input-password');
        this.loginbutton = By.css('input[value="Login"]');

        // error messages
        this.emailError = By.css('#input-email + .text-danger');
        this.passwordError = By.css('#input-password + .text-danger');
    }

    // NAVIGATION
        async openPage() {
            await this.driver.get(`${config.baseURL}/index.php?route=account/login`);
        }

    async enterEmail(email) {
        let el = await this.driver.wait(until.elementLocated(this.emailInput), 10000);
        await el.clear();
        await el.sendKeys(email);
    }

    async enterPassword(password) {
        let el = await this.driver.wait(until.elementLocated(this.passwordInput), 10000);
        await el.clear();
        await el.sendKeys(password);
    }
    
    async clickLogin() {
        let el = await this.driver.wait(until.elementLocated(this.loginbutton), 10000);
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

    async getEmailError() {
        return await this.getTextSafe(this.emailError);
    }

    async getPasswordError() {
        return await this.getTextSafe(this.passwordError);
    }
}

module.exports = LoginPage;