import { test, expect } from '@playwright/test';
import fs from 'fs';

const logStream = fs.createWriteStream('browser-console-logs.txt', { flags: 'a' });

test('Capture and analyze console logs for errors', async ({ page }) => {

  const consoleErrors = [];

  page.on('console', async msg => {
    const location = msg.location();
    const logMessage = `Console ${msg.type()} at ${location.url}:${location.lineNumber}:${location.columnNumber}\n${msg.text()}\n`;
    logStream.write(logMessage);

    if (msg.type() === 'error') {
      consoleErrors.push(logMessage);
    }

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

  if (consoleErrors.length > 0) {
    console.log('Знайдені помилки в консолі:', consoleErrors);
  }

  expect(consoleErrors.length).toBe(0);

  logStream.end();
});
