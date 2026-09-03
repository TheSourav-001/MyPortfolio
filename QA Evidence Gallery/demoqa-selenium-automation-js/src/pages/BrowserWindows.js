const BasePage = require('./BasePage');
const { By } = require('selenium-webdriver');

class BrowserWindowsPage extends BasePage {
    constructor(driver) {
        super(driver);
        this.tabButton = By.id('tabButton');
        this.windowButton = By.id('windowButton');
        this.sampleHeading = By.id('sampleHeading');
    }

    async clickNewTab() {
        await this.clickElement(this.tabButton);
    }

    async clickNewWindow() {
        await this.clickElement(this.windowButton);
    }
}

module.exports = BrowserWindowsPage;