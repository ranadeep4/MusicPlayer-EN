import { Page } from '@playwright/test';

export class AlbumPage {
  protected _page: Page;
  constructor(page: Page) {
    this._page = page;
  }
  get page() {
    return this._page;
  }

  async selectFirstAlbum() {
    await this._page.click('div[data-testid="album-list"] div[role="listitem"]:first-child');
  }

  async filterByName(name: string) {
    await this._page.fill('input[id="search"]', name);
    // await this._page.press('input[id="search"]', 'Enter');
    await this._page.waitForTimeout(10000);
  }
}
