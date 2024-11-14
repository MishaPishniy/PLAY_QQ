import { test, expect } from '@playwright/test';

test.use({storageState : 'storageState.json'})

test('storageState', async ({ page }) => {

    await page.goto(process.env.BASE_URL!)
  
    const addButton = page.locator('.inventory_item button').first()
    await addButton.click();

    await expect(addButton).toHaveText('Remove')
});