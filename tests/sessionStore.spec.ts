import { test, expect } from '@playwright/test';

test.describe('Test with localStor', () =>{

    test.beforeEach(async ({page}) => {

        await page.goto('https://www.saucedemo.com');

        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');

        const sessionStorage  = await page.evaluate(() => JSON.stringify(window.sessionStorage ));
        await page.context().addInitScript((Storage) =>{
            Object.entries(JSON.parse(Storage)).forEach(([key,value])=> {
                window.sessionStorage .setItem(key,value)
            });
        },sessionStorage );
    });

    test ( "Local Stor add", async ({page}) => {

        await page.goto('https://www.saucedemo.com/inventory.html');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
      
        await expect(page.locator('.inventory_item')).toHaveCount(6)

    })


})