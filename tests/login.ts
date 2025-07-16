import { expect} from '@playwright/test';
import { test } from '../pages/fixture';

test.describe('Login', () => {
    test.beforeEach(async ({page, homePage})=> {
        await page.goto('/');
        await homePage.clickRegisterLogin()
    });

    test('Login with unregistered account', async ({page, loginPage}) => {
        await loginPage.inputLoginName('testaccount')
        await loginPage.inputPassword(process.env.PASSWORD!)
        await loginPage.clickLogin()
        await expect(page.getByText('Error: Incorrect login or password provided.')).toBeVisible();
    });

    test('Login with wrong password', async ({page, loginPage}) => {
        await loginPage.inputLoginName(process.env.LOGIN_NAME!)
        await loginPage.inputPassword('sdfasfdfsdfqq1ew')
        await loginPage.clickLogin()
        await expect(page.getByText('Error: Incorrect login or password provided.')).toBeVisible();
    });

    test('Login with valid credentials', async ({page, loginPage}) => {
        await loginPage.inputLoginName(process.env.LOGIN_NAME!)
        await loginPage.inputPassword(process.env.PASSWORD!)
        await loginPage.clickLogin()
        await expect(page.locator('h1').getByText('My Account')).toBeVisible();
    });
})