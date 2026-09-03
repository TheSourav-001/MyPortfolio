const { By } = require('selenium-webdriver');

class BasePage {
    constructor(driver) {
        this.driver = driver;
        this.baseUrl = 'https://demoqa.com';
    }

    async openUrl(url) {
        await this.driver.get(url);
    }

    async openBaseUrl(path = '') {
        await this.driver.get(this.baseUrl + path);
    }

    async find(locator) {
        return await this.driver.findElement(locator);
    }

    async enterText(locator, text) {
        const element = await this.find(locator);
        await element.clear();
        await element.sendKeys(text);
    }

    async clickElement(locator) {
        const element = await this.find(locator);
        await element.click();
    }

    async getText(locator) {
        const element = await this.find(locator);
        return await element.getText();
    }

    async waitForElement(locator, timeout = 10000) {
        const { WebDriverWait, until } = require('selenium-webdriver');
        const wait = new WebDriverWait(this.driver, timeout);
        return await wait.until(until.elementLocated(locator));
    }
}

module.exports = BasePage;