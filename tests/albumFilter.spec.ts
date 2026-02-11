import { test, expect } from '../src/basetest.js';
import { albumData } from '../src/data/musicData.js';

test.describe('Album Filtering Tests', () => {
  for (const data of albumData) {
    test(`Filter: ${data.description}`, async ({ loginPage, homePage, albumPage }) => {
      await loginPage.goto();
      await loginPage.login('demo', 'demo');
      await homePage.openRecentlyAddedAlbums();
      await albumPage.filterByName(data.filter);
      await albumPage.page.waitForTimeout(10000);
      
      if (data.shouldFind) {
        await expect(albumPage.page.locator('//li[@class = "MuiGridListTile-root"]')).toBeTruthy();
      } else {
        const items = await  albumPage.page.locator('//li[@class="MuiGridListTile-root"]');
        await expect(items).toHaveCount(0);
      }
    });
  }
});
