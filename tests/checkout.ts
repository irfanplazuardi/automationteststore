import { expect} from '@playwright/test';
import { test } from '../pages/fixture';
import { faker } from '@faker-js/faker';
import { qase } from 'playwright-qase-reporter';

test.describe('Checkout with account logout', () => {
    test.beforeEach(async ({page})=> {
        await page.context().clearCookies();
        await page.goto('/');
    });

    test(qase(17,'Checkout item as guest'), async ({page, homePage, cartPage, checkoutPage, loginPage}) => {
        await homePage.addToCartByName('Skinsheen Bronzer Stick')
        await cartPage.assertCartItemQuantityBubble(1)
        await homePage.addToCartByName('Brunette expressions Conditioner')
        await cartPage.assertCartItemQuantityBubble(2)
        await homePage.clickCart()
        await cartPage.assertTotalPerItem('Skinsheen Bronzer Stick')
        await cartPage.assertTotalPerItem('Brunette expressions Conditioner')
        await cartPage.selectShipmentCountry('Indonesia')
        await cartPage.selectShipmentRegion('Yogyakarta')
        await cartPage.inputPostCode(faker.helpers.replaceSymbols(('*****')))
        await cartPage.clickEstimateShipmentRate()
        await cartPage.selectShipmentRate('Flat Shipping Rate - $2.00')
        await cartPage.assertGrandTotal()
        await cartPage.clickCheckout()
        await loginPage.selectGuestCheckout()
        await loginPage.clickContinue()
        await checkoutPage.inputForm({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            telephone: faker.helpers.replaceSymbols('08##########'),
            fax: faker.helpers.replaceSymbols(('*****')),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.streetAddress(),
            country: 'Indonesia',
            city: faker.location.city(),
            region: 'Jakarta Raya',
            zipcode: faker.helpers.replaceSymbols(('*****'))
        })
        await checkoutPage.clickContinueCheckout()
        await checkoutPage.clickConfirmOrder()
        await checkoutPage.assertOrderSuccess()
        await checkoutPage.clickContinueSuccessOrder()
        await expect(page.getByRole('link', { name: 'Home' })).toHaveCSS('background-color', 'rgb(0, 161, 203)')
    });

     test(qase(18,'Checkout item by register account'), async ({page, homePage, cartPage, checkoutPage, loginPage, registerPage}) => {
        await homePage.addToCartByName('Skinsheen Bronzer Stick')
        await cartPage.assertCartItemQuantityBubble(1)
        await homePage.addToCartByName('Brunette expressions Conditioner')
        await cartPage.assertCartItemQuantityBubble(2)
        await homePage.clickCart()
        await cartPage.assertTotalPerItem('Skinsheen Bronzer Stick')
        await cartPage.assertTotalPerItem('Brunette expressions Conditioner')
        await cartPage.selectShipmentCountry('Indonesia')
        await cartPage.selectShipmentRegion('Yogyakarta')
        await cartPage.inputPostCode(faker.helpers.replaceSymbols(('*****')))
        await cartPage.clickEstimateShipmentRate()
        await cartPage.selectShipmentRate('Flat Shipping Rate - $2.00')
        await cartPage.assertGrandTotal()
        await cartPage.clickCheckout()
        await loginPage.clickContinue()
        await registerPage.inputForm({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            telephone: faker.helpers.replaceSymbols('08##########'),
            fax: faker.helpers.replaceSymbols(('*****')),
            company: faker.company.name(),
            address1: faker.location.streetAddress(),
            address2: faker.location.streetAddress(),
            country: 'United Kingdom',
            city: faker.location.city(),
            region: 'Cardiff',
            zipcode: faker.helpers.replaceSymbols(('*****')),
            loginName: faker.internet.username(),
            password: `${process.env.PASSWORD}`,
            passwordConfirm: `${process.env.PASSWORD}` 
        })
        await registerPage.agreePrivacyPolicy(true)
        await registerPage.buttonContinue()
        await checkoutPage.clickConfirmOrder()
        await checkoutPage.assertOrderSuccess()
        await checkoutPage.clickContinueSuccessOrder()
        await expect(page.getByRole('link', { name: 'Home' })).toHaveCSS('background-color', 'rgb(0, 161, 203)')
    });

     test(qase(19,'Checkout item by login'), async ({page, homePage, cartPage, checkoutPage, loginPage}) => {
        await homePage.addToCartByName('Skinsheen Bronzer Stick')
        await cartPage.assertCartItemQuantityBubble(1)
        await homePage.addToCartByName('Brunette expressions Conditioner')
        await cartPage.assertCartItemQuantityBubble(2)
        await homePage.clickCart()
        await cartPage.assertTotalPerItem('Skinsheen Bronzer Stick')
        await cartPage.assertTotalPerItem('Brunette expressions Conditioner')
        await cartPage.selectShipmentCountry('Indonesia')
        await cartPage.selectShipmentRegion('Yogyakarta')
        await cartPage.inputPostCode(faker.helpers.replaceSymbols(('*****')))
        await cartPage.clickEstimateShipmentRate()
        await cartPage.selectShipmentRate('Flat Shipping Rate - $2.00')
        await cartPage.assertGrandTotal()
        await cartPage.clickCheckout()
        await loginPage.inputLoginName(process.env.LOGIN_NAME!)
        await loginPage.inputPassword(process.env.PASSWORD!)
        await loginPage.clickLogin()
        await checkoutPage.clickConfirmOrder()
        await checkoutPage.assertOrderSuccess()
        await checkoutPage.clickContinueSuccessOrder()
        await expect(page.getByRole('link', { name: 'Home' })).toHaveCSS('background-color', 'rgb(0, 161, 203)')
    });
})

test.describe('Checkout with account already login', async () => {
    test.beforeEach(async ({page})=> {
        await page.goto('/');
    });

    test(qase(20,'Checkout item already login'), async ({page, homePage, cartPage, checkoutPage, loginPage}) => {
        await homePage.addToCartByName('Skinsheen Bronzer Stick')
        await cartPage.assertCartItemQuantityBubble(1)
        await homePage.addToCartByName('Brunette expressions Conditioner')
        await cartPage.assertCartItemQuantityBubble(2)
        await homePage.clickCart()
        await cartPage.assertTotalPerItem('Skinsheen Bronzer Stick')
        await cartPage.assertTotalPerItem('Brunette expressions Conditioner')
        await cartPage.selectShipmentCountry('Indonesia')
        await cartPage.selectShipmentRegion('Yogyakarta')
        await cartPage.inputPostCode(faker.helpers.replaceSymbols(('*****')))
        await cartPage.clickEstimateShipmentRate()
        await cartPage.selectShipmentRate('Flat Shipping Rate - $2.00')
        await cartPage.assertGrandTotal()
        await cartPage.clickCheckout()
        await loginPage.inputLoginName(process.env.LOGIN_NAME!)
        await loginPage.inputPassword(process.env.PASSWORD!)
        await loginPage.clickLogin()
        await checkoutPage.clickConfirmOrder()
        await checkoutPage.assertOrderSuccess()
        await checkoutPage.clickContinueSuccessOrder()
        await expect(page.getByRole('link', { name: 'Home' })).toHaveCSS('background-color', 'rgb(0, 161, 203)')
    });
})