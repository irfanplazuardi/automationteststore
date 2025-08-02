import { expect} from '@playwright/test';
import { test } from '../pages/fixture';
import { qase } from 'playwright-qase-reporter';

test.describe('Account', () => {
    test.beforeEach(async ({page})=> {
        await page.goto('/');
    });

    test(qase (21,'Logout account'), async ({page, homePage, accountPage}) => {
        await homePage.hoverWelcomeMenu()
        await expect(homePage.logout).toBeVisible()
        await homePage.clickLogout()
        await expect(page.locator('h1').getByText('Account Logout')).toBeVisible();
        await expect(homePage.registerOrLogin).toBeVisible()
        await accountPage.clickContinueToAccount()
        await expect(page).toHaveURL('https://automationteststore.com/')
    });
})