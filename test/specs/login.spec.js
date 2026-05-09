import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import { USERS } from '../../data/testData.js';

describe('Login', () => {

    beforeEach(async () => {
        await LoginPage.open();
        await browser.execute(() => {
            localStorage.clear();
            sessionStorage.clear();
        });
        await browser.deleteCookies();
        await LoginPage.open();
    });

    it('should login successfully with valid credentials', async () => {
        await LoginPage.login(USERS.standard.username, USERS.standard.password);
        await LoginPage.waitForUrl('inventory');
        const url = await browser.getUrl();
        expect(url).toContain('inventory');
    });

    it('should show error with invalid password', async () => {
        await LoginPage.login(USERS.standard.username, 'wrong_password');
        const error = await LoginPage.getErrorMessage();
        await expect(error).toContain('Epic sadface');
    });

    it('should show specific error for locked out user', async () => {
        await LoginPage.login(USERS.locked.username, USERS.locked.password);
        const error = await LoginPage.getErrorMessage();
        await expect(error).toContain('Sorry, this user has been locked out');
    });

    it('should show error when username field is empty', async () => {
        await LoginPage.login('', USERS.standard.password);
        const error = await LoginPage.getErrorMessage();
        await expect(error).toContain('Username is required');
    });

    it('should logout and redirect to login page', async () => {
        await LoginPage.login(USERS.standard.username, USERS.standard.password);
        await LoginPage.waitForUrl('inventory');
        await InventoryPage.logout();
        const loginVisible = await LoginPage.isDisplayed('#login-button');
        await expect(loginVisible).toBe(true);
    });
});
