import {test as base} from '@playwright/test'
import { HomePage } from './homePage'
import { LoginPage } from './loginPage'
import { RegisterPage } from './registerPage'
import { AccountPage } from './accountPage'

type PageFixture = {
    homePage: HomePage
    loginPage: LoginPage
    registerPage: RegisterPage
    accountPage: AccountPage
}

export const test = base.extend<PageFixture>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page))
  },
  accountPage: async ({ page }, use) => {
    await use(new AccountPage(page))
  }
});