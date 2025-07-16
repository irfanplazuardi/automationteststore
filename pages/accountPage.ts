import {type Page, Locator, } from '@playwright/test';

export class AccountPage {
    readonly page: Page;
    readonly continue: Locator;

    constructor(page: Page) {
        this.page = page;
        this.continue = page.getByRole('link', { name: 'Continue' });
    }

    async clickContinueToAccount() {
        await this.continue.click()
    }
}