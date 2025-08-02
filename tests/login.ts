import { expect} from '@playwright/test';
import { test } from '../pages/fixture';
import { qase } from 'playwright-qase-reporter';

test.describe('Login', () => {
    test.beforeEach(async ({page, homePage})=> {
        await page.context().clearCookies();
        await page.goto('/');
        await homePage.clickRegisterLogin()
    });

    test(qase (7,'Login with unregistered account'), async ({page, loginPage}) => {
        await loginPage.inputLoginName('testaccount')
        await loginPage.inputPassword(process.env.PASSWORD!)
        await loginPage.clickLogin()
        await expect(page.getByText('Error: Incorrect login or password provided.')).toBeVisible();
    });

    test(qase (8,'Login with wrong password'), async ({page, loginPage}) => {
        await loginPage.inputLoginName(process.env.LOGIN_NAME!)
        await loginPage.inputPassword('sdfasfdfsdfqq1ew')
        await loginPage.clickLogin()
        await expect(page.getByText('Error: Incorrect login or password provided.')).toBeVisible();
    });

    test(qase (9,'Login with valid credentials'), async ({page, loginPage}) => {
        await loginPage.inputLoginName(process.env.LOGIN_NAME!)
        await loginPage.inputPassword(process.env.PASSWORD!)
        await loginPage.clickLogin()
        await expect(page.locator('h1').getByText('My Account')).toBeVisible();
        await expect(page.locator('.menu_text').getByText(`Welcome back ${process.env.FIRST_NAME}`)).toBeVisible();
    });
})