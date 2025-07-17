import {type Page, Locator, } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly registerOrLogin: Locator;
    readonly welcome: Locator
    readonly logout: Locator

    constructor(page: Page) {
        this.page = page;
        this.registerOrLogin = page.getByRole('link', { name: 'Login or register' })
        this.welcome = page.locator('.menu_text')
        this.logout = page.getByRole('link', {name: `Not ${process.env.FIRST_NAME}? Logoff`})
    }
    
    async clickRegisterLogin() {
        await this.registerOrLogin.click()
    }

    async hoverWelcomeMenu() {
        await this.welcome.getByText(`Welcome back ${process.env.FIRST_NAME}`).hover()
    }

    async clickLogout() {
        await this.logout.click()
    }
}