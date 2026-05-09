import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import { USERS, PRODUCTS } from '../../data/testData.js';

describe('Cart', () => {

    before(async () => {
        await LoginPage.open();
        await LoginPage.login(USERS.standard.username, USERS.standard.password);
        await LoginPage.waitForUrl('inventory');
    });

    beforeEach(async () => {
        await InventoryPage.open();
    });

    it('should add product and see it in the cart', async () => {
        await InventoryPage.addToCart(PRODUCTS.backpack);
        await InventoryPage.goToCart();
        const names = await CartPage.getCartItemNames();
        await expect(names).toContain(PRODUCTS.backpack);
        await CartPage.removeItem(PRODUCTS.backpack);
    });

    it('should remove product from cart', async () => {
        await InventoryPage.addToCart(PRODUCTS.backpack);
        await InventoryPage.goToCart();
        await CartPage.removeItem(PRODUCTS.backpack);
        const count = await CartPage.getCartItemCount();
        await expect(count).toBe(0);
    });

    it('should return to inventory when continuing shopping', async () => {
        await InventoryPage.goToCart();
        await CartPage.continueShopping();
        const url = await browser.getUrl();
        expect(url).toContain('inventory');
    });

    it('should display correct product name and quantity in cart', async () => {
        await InventoryPage.addToCart(PRODUCTS.bikeLight);
        await InventoryPage.goToCart();
        const names = await CartPage.getCartItemNames();
        const count = await CartPage.getCartItemCount();
        await expect(names).toContain(PRODUCTS.bikeLight);
        await expect(count).toBe(1);
        await CartPage.removeItem(PRODUCTS.bikeLight);
    });
});
