import { test, expect } from '@playwright/test';

class LoginPage {
    loginButton: any;
    passwordField: any;
    usernameField: any;
    page: any;

    constructor(page) {
        this.page = page;

        this.usernameField = page.locator('#user-name');
        this.passwordField = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async navigate() {

        await this.page.goto('https://www.saucedemo.com/');

    }

    async login(username,password){
        await this.usernameField.fill(username)
        await this.passwordField.fill(password)
        await this.loginButton.click()
    }
}

module.exports = LoginPage;