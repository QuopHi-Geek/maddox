import {Page, Locator,expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#email-input');
        this.passwordInput = page.locator('#password-input');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText('Invalid email or password.')
    }

    async gotoLogin(url: string) {
        await this.page.goto(url);
    }

    async fillUserDetails(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async verifyLoginSuccess(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async verifyLoginError() {
        await expect(this.errorMessage).toBeVisible();
    }
}

export default LoginPage;
