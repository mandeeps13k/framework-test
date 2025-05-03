require('dotenv').config();

module.exports = {
    // Browser configuration
    browser: {
        headless: process.env.HEADLESS === 'true',
        defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
    },
    
    // API configuration
    api: {
        baseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
        timeout: parseInt(process.env.API_TIMEOUT || '5000', 10),
    },
    
    // Test configuration
    test: {
        retryCount: parseInt(process.env.RETRY_COUNT || '2', 10),
        screenshotOnFailure: process.env.SCREENSHOT_ON_FAILURE === 'true',
    }
}; 