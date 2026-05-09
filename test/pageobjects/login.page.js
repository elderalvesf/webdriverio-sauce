import BasePage from './base.page.js';

class LoginPage extends BasePage {
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton()   { return $('#login-button'); }
    get errorMessage()  { return $('[data-test="error"]'); }

    async login(username, password) {
        await this.setValue('#user-name', username);
        await this.setValue('#password', password);
        await this.click('#login-button');
    }

    async getErrorMessage() {
        return this.getText('[data-test="error"]');
    }

    async open() {
        await super.open('/');
    }
}

export default new LoginPage();
