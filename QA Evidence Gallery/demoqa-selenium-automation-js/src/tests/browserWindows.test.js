const { createDriver } = require('../utils/driverSetup');
const BrowserWindowsPage = require('../pages/BrowserWindows');
const { expect } = require('chai');

describe('Browser Windows Automation Suite', function () {
    let driver;
    let windowPage;

    before(async function () {
        driver = await createDriver();
        await driver.manage().window().maximize();
        windowPage = new BrowserWindowsPage(driver);
    });

    it('Should handle New Tab correctly', async function () {
        await windowPage.openBaseUrl("/browser-windows");

        const originalWindow = await driver.getWindowHandle();
        await windowPage.clickNewTab();

        const windows = await driver.getAllWindowHandles();

        for (const handle of windows) {
            if (handle !== originalWindow) {
                await driver.switchTo().window(handle);
            }
        }

        const heading = await windowPage.find(windowPage.sampleHeading);
        const text = await heading.getText();
        expect(text).to.equal("This is a sample page");

        await driver.close();
        await driver.switchTo().window(originalWindow);
    });

    after(async function () {
        if (driver) {
            await driver.quit();
        }
    });
});