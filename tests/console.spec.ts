import { test, expect } from '@playwright/test';
import fs from 'fs';

const logStream = fs.createWriteStream('browser-console-logs.txt', { flags: 'a' });

test('Capture and save all possible browser logs and errors to a file', async ({ page }) => {

  page.on('console', async msg => {
   
    const location = msg.location();
    const logMessage = `Console ${msg.type()} at ${location.url}:${location.lineNumber}:${location.columnNumber}\n${msg.text()}\n`;
    logStream.write(logMessage);

  
    for (const arg of msg.args()) {
      try {
        const value = await arg.jsonValue();
        if (typeof value === 'object') {
          logStream.write(`Console argument: ${JSON.stringify(value, null, 2)}\n`);
        } else {
          logStream.write(`Console argument: ${value}\n`);
        }
      } catch {
        const handleStr = await arg.evaluate(node => node.toString());
        logStream.write(`Console argument: ${handleStr}\n`);
      }
    }
    logStream.write('---\n'); 
  });
  page.on('pageerror', error => {
    logStream.write(`Page error: ${error.message}\n`);
    logStream.write(`Error details: ${error.stack || 'No stack trace available'}\n`);
    logStream.write('---\n');
  });
  page.on('requestfailed', request => {
    logStream.write(`Request failed: ${request.url()}\n`);
    logStream.write(`Failure text: ${request.failure()?.errorText || 'Unknown error'}\n`);
    logStream.write('---\n');
  });

  page.on('response', response => {
    const responseMessage = `Response from: ${response.url()}\nStatus code: ${response.status()} - ${response.statusText()}\n`;
    logStream.write(responseMessage);
    logStream.write('---\n');
  });

  await page.addInitScript(() => {
    window.addEventListener('error', event => {
      console.error(`Global error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`);
    });

    window.addEventListener('unhandledrejection', event => {
      console.error(`Unhandled promise rejection: ${event.reason}`);
    });

    window.onerror = (message, source, lineno, colno, error) => {
      console.error(`Window.onerror captured: ${message} at ${source}:${lineno}:${colno}`);
      if (error && error.stack) {
        console.error(`Stack trace: ${error.stack}`);
      }
    };
  });

  logStream.write('Navigating to https://www.saucedemo.com\n');
  await page.goto('https://www.saucedemo.com');

  logStream.write('Filling in the username and password fields\n');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  logStream.write('Clicking the login button\n');
  await page.click('[data-test="login-button"]');


  logStream.write('Waiting for logs to capture...\n');
  await page.waitForTimeout(2000);

  logStream.write('Checking if the URL has changed to the inventory page\n');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  logStream.write('Test completed successfully\n');

  logStream.end();
});
