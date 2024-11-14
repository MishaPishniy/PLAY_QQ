import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));
    await page.goto('https://www.saucedemo.com'); 
});

test('Login with correct credentials', async ({ page }) => {
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
