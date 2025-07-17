import {type Page, Locator, } from '@playwright/test';

export class ForgotPasswordPage {
    readonly page: Page;
    readonly lastName: Locator
    readonly loginName: Locator;
    readonly emailAddress: Locator
    readonly continue: Locator
    readonly back: Locator
    constructor(page: Page) {
        this.page = page;
        this.lastName = page.locator('#forgottenFrm_lastname')
        this.loginName = page.locator('#forgottenFrm_loginname');
        this.emailAddress = page.locator('#forgottenFrm_email');
        this.continue = page.getByRole('button', {name:'Continue'});
        this.back = page.getByRole('link', {name:'Back'});
    }
     async inputLastName(lastName: string) {
        await this.lastName.fill(lastName)
    }

    async inputLoginName(loginName: string) {
        await this.loginName.fill(loginName)
    }

    async inputEmail(email: string) {
        await this.emailAddress.fill(email)
    }

    async clickContinue() {
        await this.continue.click()
    }

    async clickBack() {
        await this.back.click()
    }
}