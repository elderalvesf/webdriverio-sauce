import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';
import { USERS, CHECKOUT_DATA, PRODUCTS } from '../../data/testData.js';

describe('Checkout', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERS.standard.username, USERS.standard.password);
        await LoginPage.waitForUrl('inventory');
    });

    beforeEach(async () => {
        await InventoryPage.open();
        await InventoryPage.addToCart(PRODUCTS.backpack);
        await InventoryPage.goToCart();
        await CartPage.proceedToCheckout();
    });

    afterEach(async () => {
        await browser.url('/cart.html');
        await $('.cart_list').waitForDisplayed({ timeout: 10000 });
        const hasBackpack = await CartPage.isDisplayed('[data-test="remove-sauce-labs-backpack"]');
        if (hasBackpack) {
            await CartPage.removeItem(PRODUCTS.backpack);
        }
    });

    it('should complete full E2E checkout successfully', async () => {
        await CheckoutPage.fillShippingInfo(
            CHECKOUT_DATA.firstName,
            CHECKOUT_DATA.lastName,
            CHECKOUT_DATA.zipCode
        );
        await CheckoutPage.continue();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-step-two'),
            { timeout: 10000 }
        );
        await CheckoutPage.finish();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-complete'),
            { timeout: 10000 }
        );
    });

    it('should show error when first name is missing', async () => {
        await CheckoutPage.fillShippingInfo('', CHECKOUT_DATA.lastName, CHECKOUT_DATA.zipCode);
        await CheckoutPage.continue();
        const error = await CheckoutPage.getErrorMessage();
        await expect(error).toContain('First Name is required');
    });

    it('should show error when last name is missing', async () => {
        await CheckoutPage.fillShippingInfo(CHECKOUT_DATA.firstName, '', CHECKOUT_DATA.zipCode);
        await CheckoutPage.continue();
        const error = await CheckoutPage.getErrorMessage();
        await expect(error).toContain('Last Name is required');
    });

    it('should show error when zip code is missing', async () => {
        await CheckoutPage.fillShippingInfo(CHECKOUT_DATA.firstName, CHECKOUT_DATA.lastName, '');
        await CheckoutPage.continue();
        const error = await CheckoutPage.getErrorMessage();
        await expect(error).toContain('Postal Code is required');
    });

    it('should display item subtotal, tax and total on order summary', async () => {
        await CheckoutPage.fillShippingInfo(
            CHECKOUT_DATA.firstName,
            CHECKOUT_DATA.lastName,
            CHECKOUT_DATA.zipCode
        );
        await CheckoutPage.continue();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-step-two'),
            { timeout: 10000 }
        );
        const subtotal = await CheckoutPage.getSubtotal();
        const tax = await CheckoutPage.getTax();
        const total = await CheckoutPage.getTotal();
        await expect(subtotal).toContain('Item total');
        await expect(tax).toContain('Tax');
        await expect(total).toContain('Total');
    });

    it('should show order confirmation after finishing checkout', async () => {
        await CheckoutPage.fillShippingInfo(
            CHECKOUT_DATA.firstName,
            CHECKOUT_DATA.lastName,
            CHECKOUT_DATA.zipCode
        );
        await CheckoutPage.continue();
        await CheckoutPage.finish();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-complete'),
            { timeout: 10000 }
        );
        const header = await CheckoutPage.getCompleteHeader();
        await expect(header).toBe('Thank you for your order!');
    });
});
