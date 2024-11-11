import { test as base, expect } from '@playwright/test';

const test = base.extend<{ loggedInPage: any }>({
  loggedInPage: async ({ page }, use) => {

    await page.goto('https://www.saucedemo.com/');

    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
    
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    await use(page);
  },
});


test.describe('Use fixture' , () =>{
    test('Kilkist tovariv na storinci', async ({loggedInPage}) =>{
        await expect(loggedInPage.locator('.inventory_item')).toHaveCount(6)
    });



    test('Kilkist tovariv na', async ({loggedInPage}) =>{
 
        const addButton = loggedInPage.locator('.inventory_item button').first()
        await addButton.click();

        await expect(addButton).toHaveText('Remove')
    });
})