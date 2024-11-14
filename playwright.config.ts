import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';



function loadEnvConfig(env: string){
  dotenv.config({ path: path.resolve(__dirname, `.env.${env}`), override: true });
}
const env = process.env.NODE_ENV || 'development';
loadEnvConfig(env)

/**
 * Конфігурація Playwright.
 */
export default defineConfig({


  reporter: "allure-playwright",
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: [['junit',{outputFile:'report.xml'}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //  storageState : 'storageState.json',
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,  // Використання змінної з .env файлу

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
   // headless: process.env.HEADLESS === 'true',  // Підтримка перемикання headless режиму через .env файл
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'development',
      testMatch: '**/*.spec.ts',
      use: {
         baseURL: process.env.BASE_URL,    
         screenshot:'only-on-failure',
         video:'on',
         headless: process.env.HEADLESS === 'true',  
        ...devices['Desktop Chrome'] },
    },
    {
      name: 'staging',
      testMatch: '**/*.spec.ts',
      use: { 
        baseURL: process.env.BASE_URL,  
        screenshot: 'on',
        video:"retain-on-failure",  
        ...devices['Desktop Firefox'] },
    },
    {
      name: 'production',
      testMatch: '**/*.spec.ts',
      use: { 
        baseURL: process.env.BASE_URL,  
        video: 'on',  
        ...devices['Desktop Safari'] ,
        ...devices['Desktop Firefox'] },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
