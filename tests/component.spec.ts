import { test, expect } from '@playwright/test';
let LoginPage  =  require('./pages/login.page');



test ('done avtoriz',async({page}) => {


    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.loginForm.login(process.env.USERNAME, process.env.PASSWORD)
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

})