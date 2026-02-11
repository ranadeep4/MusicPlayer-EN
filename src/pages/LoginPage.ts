import { Page } from '@playwright/test';

export class LoginPage {
  protected _page: Page;
  constructor(page: Page) {
    this._page = page;
  }
  get page() {
    return this._page;
  }

  async goto() {
    await this._page.goto('https://demo.navidrome.org/app/');
  }

  async login(username: string, password: string) {
    await this._page.fill('input[name="username"]', username);
    await this._page.fill('input[name="password"]', password);
    await this._page.click('button:has-text("Sign in")');
  }

  async getErrorMessage() {
    return this._page.textContent('div[role="alert"]');
  }
}
