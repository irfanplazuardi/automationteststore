import {type Page, Locator, } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly registerOrLogin: Locator;
    readonly welcome: Locator
    readonly logout: Locator
    readonly cart: Locator
    readonly addToCart: Locator

    constructor(page: Page) {
        this.page = page;
        this.registerOrLogin = page.getByRole('link', { name: 'Login or register' })
        this.welcome = page.locator('.menu_text')
        this.logout = page.getByRole('link', {name: `Not ${process.env.FIRST_NAME}? Logoff`})
        this.cart = page.locator('#main_menu_top').getByRole('listitem').filter({ hasText: 'Cart' })
        this.addToCart = page.getByRole('link', {name: 'Add to Cart'})
    }

    async clickRegisterLogin() {
        await this.registerOrLogin.click()
    }

    async hoverWelcomeMenu() {
        await this.welcome.getByText(`Welcome back ${process.env.FIRST_NAME}`).hover()
    }

    async clickLogout() {
        await this.logout.click()
    }

  async addToCartByName(productName: string) {
    const productCard = this.page.locator('.col-md-3.col-sm-6.col-xs-12', {
        has: this.page.locator('a.prdocutname', { hasText: productName })
    }).first();

    // const priceLocator = productCard.locator('.oneprice, .pricenew');
    // const price = await priceLocator.first().textContent();
    // console.log(`price: ${price}`);
    const addToCartButton = productCard.locator('a.productcart');
    await addToCartButton.click();
  }

    async clickCart() {
        await this.cart.click()
    }

    async selectRadioOption(option: string){
        await this.page.getByRole('radio', {name: option}).check()
    }

    async selectDropdownOption(title: string, option: string) {
        const dropdown = this.page.locator('.form-group', { hasText: title}).locator('select');
        await dropdown.selectOption({label: option})
    }

    async clickAddtoCart() {
        await this.addToCart.click()
    }
}