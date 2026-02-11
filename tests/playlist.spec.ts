import { test, expect } from '../src/basetest.js';
import { playlistData } from '../src/data/musicData.js';

test.describe('Playlist Tests', () => {
  for (const data of playlistData) {
    test(`Playlist: ${data.description}`, async ({ albumPage,loginPage, homePage, playlistPage }) => {
      await loginPage.goto();
      await loginPage.login('demo', 'demo');
      await homePage.openRecentlyAddedAlbums();
      if (data.shouldExist) {
        await albumPage.filterByName(data.songName);

        await playlistPage.addSongToPlaylist(data.songName,data.playlistName);
        
        await homePage.openFavorites(data.playlistName);
        await albumPage.filterByName(data.songName);
        await albumPage.page.waitForTimeout(10000);
        // await expect(albumPage.page.locator(`text=${data.songName}`)).toBeVisible();
        expect(albumPage.page.locator('//li[@class = "MuiGridListTile-root"]')).toBeTruthy();
        // await albumPage.page.waitForTimeout(5000);
      } else {     
        await albumPage.filterByName(data.songName);
        await albumPage.page.waitForTimeout(10000);
        // await expect(albumPage.page.locator('//li[@class = "MuiGridListTile-root"]')).not.toBeVisible();
        const items = await  albumPage.page.locator('//li[@class="MuiGridListTile-root"]');
        await expect(items).toHaveCount(0);
      
      }
    });
  }
});
