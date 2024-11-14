import { test, expect } from '@playwright/test';

test('intercept requests and log details', async ({ page }) => {
  await page.route('**/api/cars', (route) => {
    console.log('Request URL:', route.request().url());
    console.log('Request Method:', route.request().method());

        route.continue();

    });
    await page.goto('https://www.saucedemo.com/');
    });