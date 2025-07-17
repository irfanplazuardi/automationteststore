import {test as base} from '@playwright/test'
import { HomePage } from './homePage'
import { LoginPage } from './loginPage'
import { RegisterPage } from './registerPage'
import { AccountPage } from './accountPage'
import { ForgotPasswordPage } from './forgotPasswordPage'

type PageFixture = {
    homePage: HomePage
    loginPage: LoginPage
    registerPage: RegisterPage
    accountPage: AccountPage
    forgotPasswordPage: ForgotPasswordPage
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
  },
  forgotPasswordPage: async ({page}, use) => {
    await use(new ForgotPasswordPage(page))
  }
});