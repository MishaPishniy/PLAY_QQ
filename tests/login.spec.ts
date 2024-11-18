import { test, expect } from '@playwright/test';
import { SignInForm } from '../page-objects/forms/signInForm';
import { users, incorrectEmail, incorrectPassword } from '../test-data/credentials';

test.describe('Login tests', () => {
  let signInForm: SignInForm;

  test.beforeEach(async ({ page }) => {
    // Блокування
    await page.route('**/*.{png,jpg,jpeg,gif,svg,webp}', route => route.abort());

    // логування 
    page.on('request', request => console.log('>>', request.method(), request.url()));
    page.on('response', response => console.log('<<', response.status(), response.url()));

    await page.goto('/');
  });

  test.describe('Login tests with POM', () => {
    test.beforeEach(async ({ page }) => {
      signInForm = new SignInForm(page);
    });

    test('Login with correct credentials', async ({ page }) => {
      await signInForm.open();
      await signInForm.loginWithCredentials(users.mainUser.email, users.mainUser.password);
      await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    });

    test('Login with incorrect credentials', async ({ page }) => {
      await signInForm.open();
      await signInForm.loginWithCredentials(incorrectEmail, incorrectPassword);
      await expect(signInForm.errorMessageBox).toHaveText('Wrong email or password');
    });
  });

  test.describe('Login tests without POM', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Sign In' }).click();
      await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
      await page.getByLabel('Email').fill('michael@gmail.com');
    });

    test('Login with correct credentials', async ({ page }) => {
      await page.getByLabel('Password').fill('ZSgeVQhuU3qkvlG');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    });

    test('Login with incorrect credentials', async ({ page }) => {
      await page.getByLabel('Password').fill('wrongPassword');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.locator('.alert-danger')).toHaveText('Wrong email or password');
    });
  });
});
