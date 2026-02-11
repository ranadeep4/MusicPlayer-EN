import { expect, Page } from '@playwright/test';

export class HomePage {
  protected _page: Page;
  constructor(page: Page) {
    this._page = page;
  }
  get page() {
    return this._page;
  }

  async search(term: string) {
    await this._page.fill('input[id="search"]', term);
    await this._page.press('input[id="search"]', 'Enter');
  }

  async openRecentlyAddedAlbums() {
    // await this._page.click('a[href*="recentlyAdded"]');
    await this._page.locator('//a[@role="menuitem" and contains(text(),"Recently Added")]').click();
    
    
  }

  async openUserMenu() {
    await this._page.click('//button[@title="Settings"]')

  }
  async openFavorites( playlistName = 'Favourites') {
    const playlist = await this._page.getByRole('menuitem', { name: playlistName });
    
    await playlist.click();
  }

  async logout() {
    await this.openUserMenu();
    await this._page.getByText('Logout').click();
  }

}
