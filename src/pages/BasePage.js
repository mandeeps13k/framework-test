const { Builder, By, until } = require('selenium-webdriver');
const logger = require('../utils/logger');
const config = require('../config/config');

class BasePage {
    constructor(driver) {
        this.driver = driver;
        this.config = config;
        this.logger = logger;
    }

    async navigateTo(url) {
        try {
            await this.driver.get(url);
            this.logger.info(`Navigated to ${url}`);
        } catch (error) {
            this.logger.error(`Failed to navigate to ${url}: ${error.message}`);
            throw error;
        }
    }

    async waitForElement(selector, timeout = this.config.browser.defaultTimeout) {
        try {
            const element = await this.driver.wait(
                until.elementLocated(By.css(selector)),
                timeout
            );
            await this.driver.wait(until.elementIsVisible(element), timeout);
            return element;
        } catch (error) {
            this.logger.error(`Element ${selector} not found: ${error.message}`);
            throw error;
        }
    }

    async click(selector) {
        try {
            const element = await this.waitForElement(selector);
            await element.click();
            this.logger.info(`Clicked on element ${selector}`);
        } catch (error) {
            this.logger.error(`Failed to click element ${selector}: ${error.message}`);
            throw error;
        }
    }

    async type(selector, text) {
        try {
            const element = await this.waitForElement(selector);
            await element.clear();
            await element.sendKeys(text);
            this.logger.info(`Typed '${text}' into element ${selector}`);
        } catch (error) {
            this.logger.error(`Failed to type into element ${selector}: ${error.message}`);
            throw error;
        }
    }

    async getText(selector) {
        try {
            const element = await this.waitForElement(selector);
            const text = await element.getText();
            this.logger.info(`Got text '${text}' from element ${selector}`);
            return text;
        } catch (error) {
            this.logger.error(`Failed to get text from element ${selector}: ${error.message}`);
            throw error;
        }
    }

    async takeScreenshot(name) {
        try {
            const screenshot = await this.driver.takeScreenshot();
            // Save screenshot logic here
            this.logger.info(`Took screenshot: ${name}`);
            return screenshot;
        } catch (error) {
            this.logger.error(`Failed to take screenshot: ${error.message}`);
            throw error;
        }
    }
}

module.exports = BasePage; 