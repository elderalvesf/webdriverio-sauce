import BasePage from './base.page.js';

class InventoryPage extends BasePage {
    get productItems()  { return $$('.inventory_item'); }
    get productNames()  { return $$('.inventory_item_name'); }
    get sortDropdown()  { return $('.product_sort_container'); }
    get menuButton()    { return $('#react-burger-menu-btn'); }
    get logoutLink()    { return $('#logout_sidebar_link'); }

    async open() {
        await super.open('/inventory.html');
        await $('.inventory_list').waitForDisplayed({ timeout: 10000 });
    }

    async sortBy(visibleText) {
        const dropdown = await this.sortDropdown;
        await dropdown.waitForDisplayed({ timeout: 10000 });
        await dropdown.selectByVisibleText(visibleText);
    }

    async getProductNames() {
        return $$('.inventory_item_name').map(el => el.getText());
    }

    async getProductCount() {
        const items = await this.productItems;
        return items.length;
    }

    async addToCart(productName) {
        const slug = productName.toLowerCase().replace(/\s+/g, '-');
        await this.click(`[data-test="add-to-cart-${slug}"]`);
    }

    async removeFromCart(productName) {
        const slug = productName.toLowerCase().replace(/\s+/g, '-');
        await this.click(`[data-test="remove-${slug}"]`);
    }

    async getCartBadgeCount() {
        try {
            const badge = await $('.shopping_cart_badge');
            await badge.waitForExist({ timeout: 5000 });
            return parseInt(await badge.getText());
        } catch {
            return 0;
        }
    }

    async goToCart() {
        await browser.url('/cart.html');
    }

    async logout() {
        await this.click('#react-burger-menu-btn');
        const logoutLink = await $('#logout_sidebar_link');
        await logoutLink.waitForDisplayed({ timeout: 10000 });
        await this.click('#logout_sidebar_link');
        await browser.waitUntil(
            async () => !(await browser.getUrl()).includes('inventory'),
            { timeout: 10000, timeoutMsg: 'Logout did not redirect to login page' }
        );
    }
}

export default new InventoryPage();
