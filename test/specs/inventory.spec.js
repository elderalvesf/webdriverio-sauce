import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import { USERS, PRODUCTS } from '../../data/testData.js';

describe('Inventory', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERS.standard.username, USERS.standard.password);
    });

    beforeEach(async () => {
        await InventoryPage.open();
    });

    it('should display all 6 products', async () => {
        const count = await InventoryPage.getProductCount();
        await expect(count).toBe(6);
    });

    it('should sort products by price low to high', async () => {
        await InventoryPage.sortBy('Price (low to high)');
        const names = await InventoryPage.getProductNames();
        await expect(names[0]).toBe('Sauce Labs Onesie');
    });

    it('should sort products by name A to Z', async () => {
        await InventoryPage.sortBy('Name (A to Z)');
        const names = await InventoryPage.getProductNames();
        const sorted = [...names].sort();
        await expect(names).toEqual(sorted);
    });

    it('should update cart badge count when product is added', async () => {
        await InventoryPage.addToCart(PRODUCTS.backpack);
        const badgeCount = await InventoryPage.getCartBadgeCount();
        await expect(badgeCount).toBe(1);
        await InventoryPage.removeFromCart(PRODUCTS.backpack);
    });

    it('should remove product from cart directly from inventory listing', async () => {
        await InventoryPage.addToCart(PRODUCTS.backpack);
        await InventoryPage.removeFromCart(PRODUCTS.backpack);
        const badgeVisible = await InventoryPage.isDisplayed('.shopping_cart_badge');
        await expect(badgeVisible).toBe(false);
    });
});
