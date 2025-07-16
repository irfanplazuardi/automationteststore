import {type Page, Locator, } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly continueRegister: Locator;
    readonly loginName: Locator
    readonly password: Locator
    readonly login: Locator
    readonly forgetPassword: Locator
    readonly forgetYourLogin: Locator

    constructor(page: Page) {
        this.page = page;
        this.continueRegister = page.getByRole('button', { name: 'Continue' })
        this.loginName = page.locator('#loginFrm_loginname')
        this.password = page.locator('#loginFrm_password')
        this.login = page.getByRole('button',{name: 'Login' })
        this.forgetPassword = page.getByRole('link', {name: 'Forgot your password?'})
        this.forgetYourLogin = page.getByRole('link', {name: 'Forgot your login?'})
    }

    async clickContinueRegister() {
        await this.continueRegister.click()
    }

    async inputLoginName(loginName) {
        await this.loginName.fill(loginName)

    }async inputPassword(password) {
        await this.password.fill(password)
    }

    async clickLogin() {
        await this.login.click()
    }

    async clickForgetPassword() {
        await this.forgetPassword.click()
    }

    async clickForgetLoginName() {
        await this.forgetYourLogin.click()
    }
}