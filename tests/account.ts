import { expect} from '@playwright/test';
import { test } from '../pages/fixture';

test.describe('Account', () => {
    test.beforeEach(async ({page})=> {
        await page.goto('/');
    });

    test('Logout account', async ({page, homePage, accountPage}) => {
        await homePage.hoverWelcomeMenu()
        await expect(homePage.logout).toBeVisible()
        await homePage.clickLogout()
        await expect(page.locator('h1').getByText('Account Logout')).toBeVisible();
        await expect(homePage.registerOrLogin).toBeVisible()
        await accountPage.clickContinueToAccount()
        await expect(page).toHaveURL('https://automationteststore.com/')
    });
})