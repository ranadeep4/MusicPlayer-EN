import { test, expect } from '../src/basetest.js';
import { loginData, LoginTestCase } from '../src/data/loginData.js';

test.describe('Login Tests', () => {
  for (const data of loginData) {
    test(`Login: ${data.description}`, async ({ loginPage, homePage }) => {
      await loginPage.goto();
      await loginPage.login(data.username, data.password);
      if (data.valid) {
        // Home page should load, login form should disappear
        // await expect(loginPage.page.locator('li[role="menuitem"]')).not.toHaveCount(0);
        await expect(loginPage.page.locator('input[name="username"]')).not.toBeVisible()
      } else {
        await expect(loginPage.page.locator('input[name="username"]')).toBeVisible();
      }
    });
  }
});
