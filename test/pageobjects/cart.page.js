import BasePage from './base.page.js';

class CartPage extends BasePage {
    get cartItems()             { return $$('.cart_item'); }
    get cartItemNames()         { return $$('.inventory_item_name'); }
    get continueShoppingButton(){ return $('[data-test="continue-shopping"]'); }
    get checkoutButton()        { return $('[data-test="checkout"]'); }

    async open() {
        await super.open('/cart.html');
    }

    async getCartItemCount() {
        const items = await this.cartItems;
        return items.length;
    }

    async getCartItemNames() {
        return $$('.inventory_item_name').map(el => el.getText());
    }

    async removeItem(productName) {
        const slug = productName.toLowerCase().replace(/\s+/g, '-');
        await this.click(`[data-test="remove-${slug}"]`);
    }

    async continueShopping() {
        await this.click('[data-test="continue-shopping"]');
        await this.waitForUrl('inventory');
    }

    async proceedToCheckout() {
        await this.click('[data-test="checkout"]');
        await this.waitForUrl('checkout-step-one');
    }
}

export default new CartPage();
