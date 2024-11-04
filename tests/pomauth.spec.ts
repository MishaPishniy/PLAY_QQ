import { test, expect } from '@playwright/test';
let LoginPage = require('./pages/LoginPage')

test ('done avtoriz',async({page}) => {


    const loginPageInstance = new LoginPage(page);
    await loginPageInstance.navigate();
    await loginPageInstance.login('standard_user','secret_sauce')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

})