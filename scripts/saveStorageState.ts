import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

(async ( ) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();

    const page = await  context.newPage();
    await page.goto(process.env.BASE_URL!);

    await page.fill('#user-name', process.env.USER_NAME!);
    await page.fill('#password', process.env.USER_PASS!);
    await page.click('#login-button');

    await context.storageState({path : 'storageState.json'});
    await browser.close();
}) ();