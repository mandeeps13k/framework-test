# JavaScript Automation Framework

A robust automation framework built with JavaScript, Selenium WebDriver, and Puppeteer for web automation and testing.

## Features

- Page Object Model pattern implementation
- Built-in logging with Winston
- Configuration management
- Retry mechanism for flaky tests
- Screenshot capture on failure
- Support for both Selenium WebDriver and Puppeteer
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Chrome browser installed

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
HEADLESS=true
DEFAULT_TIMEOUT=30000
API_BASE_URL=http://localhost:3000
API_TIMEOUT=5000
RETRY_COUNT=2
SCREENSHOT_ON_FAILURE=true
LOG_LEVEL=info
```

## Project Structure

```
src/
├── config/         # Configuration files
├── pages/          # Page object classes
├── tests/          # Test classes
└── utils/          # Utility functions
```

## Writing Tests

1. Create a new page object by extending `BasePage`:
```javascript
class LoginPage extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async login(username, password) {
        await this.type('#username', username);
        await this.type('#password', password);
        await this.click('#login-button');
    }
}
```

2. Create a test by extending `BaseTest`:
```javascript
class LoginTest extends BaseTest {
    async runTest() {
        try {
            await this.setup();
            const loginPage = new LoginPage(this.driver);
            // Add your test steps here
        } finally {
            await this.teardown();
        }
    }
}
```

## Running Tests

Run all tests:
```bash
npm test
```

Run a specific test:
```bash
node src/tests/example.test.js
```

## Best Practices

1. Use the Page Object Model pattern
2. Implement proper error handling
3. Use the built-in logging system
4. Keep tests independent
5. Use the retry mechanism for flaky tests
6. Take screenshots on failure
7. Follow the configuration management system

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request # framework-test
