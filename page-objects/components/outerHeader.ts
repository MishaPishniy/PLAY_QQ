import { type Locator, type Page } from '@playwright/test';

export class OuterHeader {
    readonly page: Page;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.getByRole('button', { name: 'Sign In' });
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

}