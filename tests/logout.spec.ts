import { test, expect } from '../src/basetest.js';

test('Logout Test', async ({ loginPage, homePage }) => {
  await loginPage.goto();
  await loginPage.login('demo', 'demo');
  await homePage.logout();
  await expect(loginPage.page.locator('button:has-text("Sign in")')).toBeVisible();
});
