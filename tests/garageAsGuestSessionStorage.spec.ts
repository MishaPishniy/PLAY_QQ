import { expect } from '@playwright/test';
import { test } from '../fixture/fuelExpensesFixture'

test.describe('Garage tests in guest mode using Session Storage', () => {
    test('Session Storage is empty by default', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? '';
        const parsedObject = JSON.parse(data);
        expect(parsedObject.cars).toHaveLength(0);
    })

    test('Verify brand name in Session Storage after car adding', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
        await page.getByText('Add car').click();
        await page.locator('#addCarMileage').fill('400');
        await page.waitForTimeout(1000);
        await page.getByText('Add', { exact: true }).click();
        await expect(page.locator('.car_name')).toBeVisible();
        const data = await page.evaluate(() => window.sessionStorage.getItem('guestData')) ?? '';
        const parsedObject = JSON.parse(data);
        const firstCar = parsedObject.cars[0];
        expect(firstCar.brand).toBe('Audi')
    })

    test('Change Session Storage', async ({ page }) => {
        await page.goto('/');
        const data = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                },
                {
                    "id": 2,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                },
                {
                    "id": 3,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "bmw.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                },
                {
                    "id": 4,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "fsafsafasf.png",
                    "initialMileage": 400,
                    "updatedMileageAt": "2024-05-17T17:43:49.958Z",
                    "carCreatedAt": "2024-05-17T17:43:49.958Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 400
                }
            ],
            "nextCarId": 2,
            "nextExpenseId": 1
        }
        await page.evaluate((object) => {
            window.sessionStorage.setItem('guestData', JSON.stringify(object))

        }, data)
        await page.getByText('Guest log in').click();
        await expect(page.locator('.car_name')).toHaveText('Audi TT');


    })
});