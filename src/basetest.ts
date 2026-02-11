import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from './pages/LoginPage.js';
import { HomePage } from './pages/HomePage.js';
import { AlbumPage } from './pages/AlbumPage.js';
import { PlaylistPage } from './pages/PlaylistPage.js';
import { PlayerPage } from './pages/PlayerPage.js';

// Extend base test with our POMs
export const test = base.extend<{
  loginPage: LoginPage;
  homePage: HomePage;
  albumPage: AlbumPage;
  playlistPage: PlaylistPage;
  playerPage: PlayerPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  albumPage: async ({ page }, use) => {
    await use(new AlbumPage(page));
  },
  playlistPage: async ({ page }, use) => {
    await use(new PlaylistPage(page));
  },
  playerPage: async ({ page }, use) => {
    await use(new PlayerPage(page));
  },
});

export { expect };
