import {type Page, Locator, } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly registerOrLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerOrLogin = page.getByRole('link', { name: 'Login or register' })
    }

    async clickRegisterLogin() {
        await this.registerOrLogin.click()
    }
}