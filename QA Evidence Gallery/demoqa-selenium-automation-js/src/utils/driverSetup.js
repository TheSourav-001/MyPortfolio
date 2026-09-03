const { Builder } = require('selenium-webdriver');

async function createDriver() {
    return await new Builder().forBrowser('chrome').build();
}

module.exports = { createDriver };