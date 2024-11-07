import { test, expect } from '@playwright/test';

test('Тест логіну з використанням конфігурації середовища', async ({ page }) => {
  await page.goto(process.env.BASE_URL as string);
  await page.fill('#user-name', process.env.USER_NAME as string);
  await page.fill('#password', process.env.USER_PASS as string);
  await page.click('#login-button');
  await expect(page).toHaveURL(/inventory\.html/);
});
