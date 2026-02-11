import { test, expect } from '../src/basetest.js';

test('Search Functionality Test', async ({ loginPage, homePage }) => {
  await loginPage.goto();
  await loginPage.login('demo', 'demo');
  await homePage.search('my latin way');
   await expect(homePage.page.locator('//li[@class = "MuiGridListTile-root"]')).toBeTruthy();
});
