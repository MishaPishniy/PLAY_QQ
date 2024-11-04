import { test, expect } from '@playwright/test';
const LoginPage = require('./pages/login.page');

test('done avtoriz', async ({ page }) => {
    require('dotenv').config();
    console.log('Loaded USERNAME:', process.env.USERNAME); // додав логування 
    console.log('Loaded PASSWORD:', process.env.PASSWORD); 

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.loginForm.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
