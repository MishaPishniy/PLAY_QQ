import { test, expect } from '@playwright/test';

test.describe('Demo Tests', () => {
  test('Login, Add Items ', async ({ page }) => {
 
    await page.goto('https://www.saucedemo.com/');

    const usernameLocator = page.locator('#user-name');
    await usernameLocator.fill('standard_user');
  
    const passwordLocator = page.locator('#password');
    await passwordLocator.fill('secret_sauce');

    const loginButtonLocator = page.locator('#login-button');
    await loginButtonLocator.click()
  })

  test('Login, Add Items back ', async ({ page }) => {
 
    await page.goto('https://www.saucedemo.com/');

    const usernameLocator = page.locator('#user-name');
    await usernameLocator.fill('standard_user');


    const passwordLocator = page.locator('#password');
    await passwordLocator.fill('secret_sauce');

    const loginButtonLocator = page.locator('#login-button');
    await loginButtonLocator.click()


    await page.goBack()

    await usernameLocator.fill('standard_user');
    await passwordLocator.fill('secret_sauce');
    await loginButtonLocator.click()

  })

  test('Login, Add Items back new ', async ({ page }) => {
 
    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')

    const productTitleLocator = page.locator('.title')
    await expect(productTitleLocator).toBeVisible();
    await expect(productTitleLocator).toHaveText('Products')

   //await expect(page.locator('.title')).toBeVisible();

  // await expect(page.locator('.title')).toHaveText('Products')

  })

})