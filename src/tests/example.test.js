const BaseTest = require('./BaseTest');
const BasePage = require('../pages/BasePage');

describe('Example Test Suite', () => {
    let testInstance;

    beforeEach(() => {
        testInstance = new BaseTest();
    });

    afterEach(async () => {
        await testInstance.teardown();
    });

    test('should verify example.com title', async () => {
        await testInstance.setup();
        
        const page = new BasePage(testInstance.driver);
        
        // Example test steps
        await page.navigateTo('https://example.com');
        await page.waitForElement('h1');
        const title = await page.getText('h1');
        
        testInstance.logger.info(`Page title: ${title}`);
        
        // Jest assertion
        expect(title).toBe('Example Domain');
    });
}); 