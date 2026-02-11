import { test, expect } from '../src/basetest.js';

test('Play Song Test', async ({ loginPage, homePage, playerPage }) => {
  await loginPage.goto();
  await loginPage.login('demo', 'demo');
  await homePage.openRecentlyAddedAlbums();
  await playerPage.playFirstSong();
  await expect(await playerPage.isPlaying()).toBeTruthy();
  await playerPage.pause();
  await expect(await playerPage.isPaused()).toBeTruthy();
});
