import { test as base, Page, expect } from '@playwright/test';


export const test = base.extend<{ 
    loggedInPage: any 
}>({
    loggedInPage: async ({ page }, use) => {
  
     await page.goto('/');
  
   
      await page.fill('#user-name', process.env.USER_NAME!);
      await page.fill('#password', process.env.USER_PASS!);
      await page.click('#login-button');
      
      await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
      
      await use(page);

      await page.close();
    },
  });