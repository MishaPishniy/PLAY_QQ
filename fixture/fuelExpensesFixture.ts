import { test as base } from '@playwright/test'
import { FuelExpenses } from '../page-objects/pages/fuelExpenses';
import { expect } from '@playwright/test';

// type MyFixtures = {
//     garagePageAsUser: GaragePage;
//     garagePageAsGuest: GaragePage;
// };

export const test = base.extend({
    fuelExpensesAsGust: async ({ page }, use) => {
        let fuelExpenses = new FuelExpenses(page);
        await page.goto('/');
        await page.locator('.-guest').click();
        await expect(page.locator('h1')).toHaveText('Garage');
        await page.locator('[routerlink="expenses"]').click();
        await expect(fuelExpenses.pageHeader).toBeVisible();
        use(fuelExpenses);
    },



});