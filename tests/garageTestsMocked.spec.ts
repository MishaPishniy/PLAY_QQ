import { test, expect } from '@playwright/test';
import { GaragePage } from '../page-objects/pages/garagePage';
import { users } from '../test-data/credentials';


test.describe('Garage tests with POM', () => {
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
    })

    test('Verify added cars', async ({ page }) => {
        const testData =
        {
            "status": "ok",
            "data": [
                {
                    "id": 176802,
                    "carBrandId": 2,
                    "carModelId": 6,
                    "initialMileage": 434,
                    "updatedMileageAt": "2024-07-09T16:50:01.000Z",
                    "carCreatedAt": "2024-07-09T16:50:01.000Z",
                    "mileage": 434,
                    "brand": "BMW",
                    "model": "3",
                    "logo": "412848218412jdsf.png"
                },
                {
                    "id": 176798,
                    "carBrandId": 1,
                    "carModelId": 1,
                    "initialMileage": 4,
                    "updatedMileageAt": "2024-07-09T15:41:48.000Z",
                    "carCreatedAt": "2024-07-09T15:41:48.000Z",
                    "mileage": 4,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png"
                }
            ]
        }

        await page.route('**/api/cars', route => route.fulfill({
            status: 200,
            body: JSON.stringify(testData),
        }));
        await garagePage.openAsLoggedUser(users.mainUser.email, users.mainUser.password);
    });


    test('Abort request', async ({ page }) => {
        await page.route('**/api/cars', route => route.abort());
        await garagePage.openAsLoggedUser(users.mainUser.email, users.mainUser.password);
        await page.pause();

    });

});