import { expect} from '@playwright/test';
import { test } from '../pages/fixture';
import { faker } from '@faker-js/faker'

test.describe('Forgot Password', () => {
    test.beforeEach(async ({page, homePage})=> {
        await page.context().clearCookies();
        await page.goto('/');
        await homePage.clickRegisterLogin()
    });

    test('Forgot login name with not registered last name or email address', async ({page, loginPage, forgotPasswordPage}) => {
        await loginPage.clickForgetLoginName()
        await forgotPasswordPage.inputLastName(faker.person.lastName())
        await forgotPasswordPage.inputEmail(faker.internet.email())
        await forgotPasswordPage.clickContinue()
        await expect(page.getByText('Error: No records found matching information your provided, please check your information and try again!')).toBeVisible();
        await expect(page.locator('.alert-danger')).toHaveCSS('color', 'rgb(169, 68, 66)')
        await forgotPasswordPage.inputLastName(`${process.env.LAST_NAME}`)
        await forgotPasswordPage.inputEmail(faker.internet.email())
        await forgotPasswordPage.clickContinue()
        await expect(page.getByText('Error: No records found matching information your provided, please check your information and try again!')).toBeVisible();
        await expect(page.locator('.alert-danger')).toHaveCSS('color', 'rgb(169, 68, 66)')
        await forgotPasswordPage.inputLastName(faker.person.lastName())
        await forgotPasswordPage.inputEmail(`${process.env.EMAIL}`)
        await forgotPasswordPage.clickContinue()
        await expect(page.getByText('Error: No records found matching information your provided, please check your information and try again!')).toBeVisible();
        await expect(page.locator('.alert-danger')).toHaveCSS('color', 'rgb(169, 68, 66)')
    });

    test('Forgot login name with valid last name and email address', async ({page, loginPage, forgotPasswordPage}) => {
        await loginPage.clickForgetLoginName()
        await forgotPasswordPage.inputLastName(`${process.env.LAST_NAME}`)
        await forgotPasswordPage.inputEmail(`${process.env.EMAIL}`)
        await forgotPasswordPage.clickContinue()
        await expect(page.getByText('Success: Your login name reminder has been sent to your e-mail address.')).toBeVisible();
        await expect(page.locator('.alert-success')).toHaveCSS('color', 'rgb(60, 118, 61)')
        await forgotPasswordPage.clickBack()
        await expect(page.getByRole('link', {name: 'Forgot your password?'})).toBeVisible()
    });

    test('forgot password with not registered login name or email address', async ({page, loginPage, forgotPasswordPage}) => {
        await loginPage.clickForgetPassword()
        await forgotPasswordPage.inputLoginName(faker.internet.username())
        await forgotPasswordPage.inputEmail(faker.internet.email())
        await forgotPasswordPage.clickContinue()
        await expect(page.getByText('Error: No records found matching information your provided, please check your information and try again!')).toBeVisible();
        await expect(page.locator('.alert-danger')).toHaveCSS('color', 'rgb(169, 68, 66)')
        await forgotPasswordPage.inputLoginName(`${process.env.LOGIN_NAME}`)
        await forgotPasswordPage.inputEmail(faker.internet.email())
        await forgotPasswordPage.clickContinue()
        await expect(page.getByText('Error: No records found matching information your provided, please check your information and try again!')).toBeVisible();
        await expect(page.locator('.alert-danger')).toHaveCSS('color', 'rgb(169, 68, 66)')
        await forgotPasswordPage.inputLoginName(faker.internet.username())
        await forgotPasswordPage.inputEmail(`${process.env.EMAIL}`)
        await forgotPasswordPage.clickContinue()
        await expect(page.getByText('Error: No records found matching information your provided, please check your information and try again!')).toBeVisible();
        await expect(page.locator('.alert-danger')).toHaveCSS('color', 'rgb(169, 68, 66)')
    });
     test('Forgot login password with valid login name and email address', async ({page, loginPage, forgotPasswordPage}) => {
        await loginPage.clickForgetPassword()
        await forgotPasswordPage.inputLoginName(`${process.env.LOGIN_NAME}`)
        await forgotPasswordPage.inputEmail(`${process.env.EMAIL}`)
        await forgotPasswordPage.clickContinue()
        await expect(page.getByText('Success: Password reset link has been sent to your e-mail address.')).toBeVisible();
        await expect(page.locator('.alert-success')).toHaveCSS('color', 'rgb(60, 118, 61)')
        await forgotPasswordPage.clickBack()
        await expect(page.getByRole('link', {name: 'Forgot your password?'})).toBeVisible()
    });
})