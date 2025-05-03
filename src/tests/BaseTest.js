const { Builder } = require('selenium-webdriver');
const logger = require('../utils/logger');
const config = require('../config/config');

class BaseTest {
    constructor() {
        this.driver = null;
        this.config = config;
        this.logger = logger;
    }

    async setup() {
        try {
            this.driver = await new Builder()
                .forBrowser('chrome')
                .build();
            
            await this.driver.manage().window().maximize();
            this.logger.info('Browser setup completed');
        } catch (error) {
            this.logger.error(`Failed to setup browser: ${error.message}`);
            throw error;
        }
    }

    async teardown() {
        try {
            if (this.driver) {
                await this.driver.quit();
                this.logger.info('Browser closed successfully');
            }
        } catch (error) {
            this.logger.error(`Failed to close browser: ${error.message}`);
            throw error;
        }
    }

    async runWithRetry(testFunction, retryCount = this.config.test.retryCount) {
        let lastError;
        
        for (let i = 0; i < retryCount; i++) {
            try {
                await testFunction();
                return;
            } catch (error) {
                lastError = error;
                this.logger.warn(`Attempt ${i + 1} failed: ${error.message}`);
                
                if (i < retryCount - 1) {
                    this.logger.info('Retrying...');
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            }
        }
        
        throw lastError;
    }
}

module.exports = BaseTest; 