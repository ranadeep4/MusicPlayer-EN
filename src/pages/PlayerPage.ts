import { Page } from '@playwright/test';

export class PlayerPage {
  protected _page: Page;
  constructor(page: Page) {
    this._page = page;
  }
  get page() {
    return this._page;
  }

  async playFirstSong() {
    const firstButton = this._page
  .locator('//div[contains(@class,"MuiGridList-root")]//span[contains(@class,"MuiIconButton-label")]')
  .first();

    await firstButton.click();
    await this._page.waitForTimeout(10000); 
  }

  async pause() {
    await this._page.click('span[title="Click to pause"]');
  }

  async isPlaying() {
    return this._page.isVisible('span[title="Click to pause"]');
  }

  async isPaused() {
    return this._page.isVisible('span[title="Click to play"]');
  }
}
