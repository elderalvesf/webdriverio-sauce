export default class BasePage {
    async open(path = '') {
        await browser.url(path);
    }

    async click(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await browser.execute((el) => el.click(), element);
    }

    // Use for form submission buttons where React must read state before acting
    async submitClick(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
    }

    async setValue(selector, value) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        await browser.execute((el, val) => {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            setter.call(el, val);
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, element, value);
    }

    async getText(selector) {
        const element = await $(selector);
        await element.waitForDisplayed({ timeout: 10000 });
        return element.getText();
    }

    async isDisplayed(selector) {
        try {
            const element = await $(selector);
            return element.isDisplayed();
        } catch {
            return false;
        }
    }

    async waitForUrl(expectedUrl, timeout = 10000) {
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes(expectedUrl),
            { timeout, timeoutMsg: `URL did not contain: ${expectedUrl}` }
        );
    }
}
