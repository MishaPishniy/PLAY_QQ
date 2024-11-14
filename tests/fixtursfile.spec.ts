import { test } from '../fixture/login.fixture';
import { expect } from '@playwright/test';

test('should login and display inventory', async ({ loggedInPage }) => {
  
    const addButton = loggedInPage.locator('.inventory_item button').first()
    await addButton.click();

    await expect(addButton).toHaveText('Remove')
});
