import BasePage from './base.page.js';

class CheckoutPage extends BasePage {
    // Step 1 — shipping info
    get firstNameInput()  { return $('[data-test="firstName"]'); }
    get lastNameInput()   { return $('[data-test="lastName"]'); }
    get zipCodeInput()    { return $('[data-test="postalCode"]'); }
    get continueButton()  { return $('[data-test="continue"]'); }
    get errorMessage()    { return $('[data-test="error"]'); }

    // Step 2 — order summary
    get subtotalLabel()   { return $('.summary_subtotal_label'); }
    get taxLabel()        { return $('.summary_tax_label'); }
    get totalLabel()      { return $('.summary_total_label'); }
    get finishButton()    { return $('[data-test="finish"]'); }

    // Step 3 — confirmation
    get completeHeader()  { return $('.complete-header'); }
    get completeText()    { return $('.complete-text'); }
    get backToProducts()  { return $('[data-test="back-to-products"]'); }

    async fillShippingInfo(firstName, lastName, zipCode) {
        await this.setValue('[data-test="firstName"]', firstName);
        await this.setValue('[data-test="lastName"]', lastName);
        await this.setValue('[data-test="postalCode"]', zipCode);
    }

    async continue() {
        await this.click('[data-test="continue"]');
    }

    async finish() {
        await this.click('[data-test="finish"]');
    }

    async getErrorMessage() {
        return this.getText('[data-test="error"]');
    }

    async getSubtotal() {
        return this.getText('.summary_subtotal_label');
    }

    async getTax() {
        return this.getText('.summary_tax_label');
    }

    async getTotal() {
        return this.getText('.summary_total_label');
    }

    async getCompleteHeader() {
        return this.getText('.complete-header');
    }
}

export default new CheckoutPage();
