import { expect, Page } from '@playwright/test';

export class PlaylistPage {
  protected _page: Page;
  constructor(page: Page) {
    this._page = page;
  }
  get page() {
    return this._page;
  }



  async addSongToPlaylist( songName="",playlistName = 'Favourites') {
    
    const fav = await this._page.locator(
  `(//p[contains(.,'${songName}')]/ancestor::div[contains(@class,'MuiGridListTile-tile')]//span[contains(@class,'MuiIconButton-label')])[2]`
);
    await fav.click();
    
    
  }

  async isSongInPlaylist(songName: string) {
    return this._page.isVisible(`text=${songName}`);
  }
}
