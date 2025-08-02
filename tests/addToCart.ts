import { expect} from '@playwright/test';
import { test } from '../pages/fixture';
import { qase } from 'playwright-qase-reporter';

test.describe('Add to cart account logout', () => {
    test.beforeEach(async ({page})=> {
        await page.context().clearCookies();
        await page.goto('/');
    });

    test(qase (14, 'Add single item to cart from homepage'), async ({page, homePage, cartPage}) => {
        await homePage.addToCartByName('Skinsheen Bronzer Stick')
        await cartPage.assertCartItemQuantityBubble(1)
        await homePage.clickCart()
        await expect(page.getByText('Shopping Cart', { exact: true })).toBeVisible();
        await expect(page.locator('#cart')).toContainText('Skinsheen Bronzer Stick');
        await cartPage.assertCartTable('cart-table-single')
    });

    test(qase (15, 'Add multiple item to cart from homepage'), async ({page, homePage, cartPage}) => {
        await homePage.addToCartByName('Skinsheen Bronzer Stick')
        await cartPage.assertCartItemQuantityBubble(1)
        await homePage.addToCartByName('Absolue Eye Precious Cells')
        await cartPage.assertCartItemQuantityBubble(2)
        await homePage.addToCartByName('Acqua Di Gio Pour Homme')
        await homePage.selectDropdownOption('Fragrance Size', '6.7 oz $45.00')
        await homePage.clickAddtoCart()
        await cartPage.assertCartItemQuantityBubble(3)
        await cartPage.clickHomeLink()
        await homePage.addToCartByName('New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals')
        await homePage.selectRadioOption('6 UK')
        await homePage.clickAddtoCart()
        await cartPage.assertCartItemQuantityBubble(4)
        await expect(page.getByText('Shopping Cart', { exact: true })).toBeVisible();
        await expect(page.locator('#cart')).toContainText('Skinsheen Bronzer Stick');
        await expect(page.locator('#cart')).toContainText('Absolue Eye Precious Cells');
        await expect(page.locator('#cart')).toContainText('Acqua Di Gio Pour Homme');
        await expect(page.locator('#cart')).toContainText('New Ladies High Wedge Heel Toe Thong Diamante Flip Flop Sandals');
        await cartPage.assertCartTable('cart-table-multiple')
    });

    test(qase (16,'Update and remove items in cart'), async ({homePage, cartPage}) => {
        await homePage.addToCartByName('Skinsheen Bronzer Stick')
        await cartPage.assertCartItemQuantityBubble(1)
        await homePage.addToCartByName('Absolue Eye Precious Cells')
        await cartPage.assertCartItemQuantityBubble(2)
        await homePage.clickCart()
        await cartPage.assertTotalPerItem('Skinsheen Bronzer Stick')
        await cartPage.assertTotalPerItem('Absolue Eye Precious Cells')
        await cartPage.updateQuanitity('Skinsheen Bronzer Stick', 2)
        await cartPage.clickUpdate()
        await cartPage.assertTotalPerItem('Skinsheen Bronzer Stick')
        await cartPage.assertSubTotal()
        await cartPage.clickRemoveItem('Absolue Eye Precious Cells')
        await cartPage.assertSubTotal()
    });
})