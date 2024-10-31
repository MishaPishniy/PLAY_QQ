import { test, expect } from '@playwright/test';

test.describe('Screens', () => {
    test('Screen full', async ({ page }) => {
   
      await page.goto('https://google.com/');
      await expect(await page.screenshot({fullPage: true})).toMatchSnapshot('sauce-demo-full-page.png');
    });

    test('Screen form', async ({ page }) => {
   
        await page.goto('https://www.saucedemo.com/');
        const loginForm = page.locator('#login_button_container')
        await expect(await loginForm.screenshot()).toMatchSnapshot('sauce-demo-full-form.png');
      });
  
  })
