export const config = {
    runner: 'local',
    specs: ['./test/specs/**/*.spec.js'],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'wdio:enforceWebDriverClassic': true,
        'goog:chromeOptions': {
            args: ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--window-size=1920,1080']
        }
    }],
    logLevel: 'warn',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    baseUrl: 'https://www.saucedemo.com',
}
