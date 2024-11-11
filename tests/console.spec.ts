import { test, expect } from '@playwright/test';
import fs from 'fs';

// Create a writable stream for logging
const logStream = fs.createWriteStream('browser-console-logs.txt', { flags: 'a' });

// Test to capture and save all possible browser logs and errors to a file

test('Capture and save all possible browser logs and errors to a file', async ({ page }) => {
  // Listen for console events and log the message
  page.on('console', async msg => {
    // Log all console types in their original format
    const location = msg.location();
    const logMessage = `Console ${msg.type()} at ${location.url}:${location.lineNumber}:${location.columnNumber}\n${msg.text()}\n`;
    logStream.write(logMessage);

    // Print arguments as they appear in the browser console
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
    logStream.write('---\n'); // Separator for clarity
  });

  // Listen for page errors
  page.on('pageerror', error => {
    logStream.write(`Page error: ${error.message}\n`);
    logStream.write(`Error details: ${error.stack || 'No stack trace available'}\n`);
    logStream.write('---\n');
  });

  // Listen for failed network requests
  page.on('requestfailed', request => {
    logStream.write(`Request failed: ${request.url()}\n`);
    logStream.write(`Failure text: ${request.failure()?.errorText || 'Unknown error'}\n`);
    logStream.write('---\n');
  });

  // Listen for all responses, including successful ones
  page.on('response', response => {
    const responseMessage = `Response from: ${response.url()}\nStatus code: ${response.status()} - ${response.statusText()}\n`;
    logStream.write(responseMessage);
    logStream.write('---\n');
  });

  // Inject a script to listen for global uncaught errors and promise rejections
  await page.addInitScript(() => {
    window.addEventListener('error', event => {
      console.error(`Global error: ${event.message} at ${event.filename}:${event.lineno}:${event.colno}`);
    });

    window.addEventListener('unhandledrejection', event => {
      console.error(`Unhandled promise rejection: ${event.reason}`);
    });

    // Capture window.onerror
    window.onerror = (message, source, lineno, colno, error) => {
      console.error(`Window.onerror captured: ${message} at ${source}:${lineno}:${colno}`);
      if (error && error.stack) {
        console.error(`Stack trace: ${error.stack}`);
      }
    };
  });

  // Navigate to the specified website
  logStream.write('Navigating to https://www.saucedemo.com\n');
  await page.goto('https://www.saucedemo.com');

  // Perform some interactions to generate console logs (optional)
  logStream.write('Filling in the username and password fields\n');
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  logStream.write('Clicking the login button\n');
  await page.click('[data-test="login-button"]');

  // Wait for some time if needed to capture logs
  logStream.write('Waiting for logs to capture...\n');
  await page.waitForTimeout(2000);

  // Test assertion (optional)
  logStream.write('Checking if the URL has changed to the inventory page\n');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  logStream.write('Test completed successfully\n');

  // Close the stream after the test completes
  logStream.end();
});
