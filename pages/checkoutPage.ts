import {type Page, expect, Locator, } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly continue: Locator;
    readonly continueLink: Locator
    readonly firstName: Locator
    readonly lastName: Locator
    readonly email: Locator
    readonly telephone: Locator
    readonly fax: Locator
    readonly company: Locator
    readonly address1: Locator
    readonly address2: Locator
    readonly city: Locator
    readonly region: Locator
    readonly zipcode: Locator
    readonly country: Locator
    readonly loginName: Locator
    readonly password: Locator
    readonly passwordConfirm: Locator
    readonly checkboxSeperateShippingAddress: Locator
    readonly back: Locator
    readonly confirmOrder: Locator

    constructor(page: Page) {
        this.page = page;
        this.continue = page.getByRole('button', { name: 'Continue' });
        this.firstName = page.locator('#guestFrm_firstname')
        this.lastName = page.locator('#guestFrm_lastname')
        this.email = page.locator('#guestFrm_email')
        this.telephone = page.locator('#guestFrm_telephone')
        this.fax = page.locator('#guestFrm_fax')
        this.company = page.locator('#guestFrm_company')
        this.address1 = page.locator('#guestFrm_address_1')
        this.address2 = page.locator('#guestFrm_address_2')
        this.city = page.locator('#guestFrm_city')
        this.region = page.locator('#guestFrm_zone_id')
        this.zipcode = page.locator('#guestFrm_postcode')
        this.country = page.locator('#guestFrm_country_id')
        this.loginName = page.locator('#guestFrm_loginname')
        this.password = page.locator('#guestFrm_password')
        this.passwordConfirm = page.locator('#guestFrm_confirm')
        this.checkboxSeperateShippingAddress = page.locator('#guestFrm_agree')
        this.back = page.getByRole('link', {name: 'Back'})
        this.confirmOrder = page.getByRole('button', {name: 'Confirm Order'})
        this.continueLink = page.getByRole('link', { name: 'Continue' });
    }

    async clickContinueCheckout() {
        await this.continue.click()
    }

    async clickContinueSuccessOrder() {
        await this.continueLink.click()
    }

    async clickBackChecout() {
        await this.back.click()
    }

    async inputForm({
        firstName,
        lastName,
        email,
        telephone,
        fax,
        company,
        address1,
        address2,
        country,
        city,
        region,
        zipcode
    }:{
        firstName: string,
        lastName: string,
        email: string,
        telephone: string, 
        fax: string,
        company:  string,
        address1: string,
        address2: string,
        country: string
        city: string,
        region: string,
        zipcode: string,
    }) 
     {
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.telephone.fill(telephone)
        await this.fax.fill(fax)
        await this.company.fill(company)
        await this.address1.fill(address1)
        await this.address2.fill(address2)
        if (country !== "United Kingdom") {
            await this.country.selectOption({label: country})
        }
        await this.region.selectOption({label: region})
        await this.zipcode.fill(zipcode)
        await this.city.fill(city)
    }

    async checkSeperateShippingAddress(checked: boolean) {
        await this.checkboxSeperateShippingAddress.setChecked(checked)
    }

    async inputShippingAddress({
        firstName,
        lastName,
        email,
        telephone,
        fax,
        company,
        address1,
        address2,
        city,
        region,
        zipcode,
        country
    }:{
        firstName: string,
        lastName: string,
        email: string,
        telephone: string, 
        fax: string,
        company:  string,
        address1: string,
        address2: string,
        city: string,
        region: string,
        zipcode: string,
        country: string,
    }){
        await this.firstName.fill(firstName)
        await this.lastName.fill(lastName)
        await this.email.fill(email)
        await this.telephone.fill(telephone)
        await this.fax.fill(fax)
        await this.company.fill(company)
        await this.address1.fill(address1)
        await this.address2.fill(address2)
        if (country !== "United Kingdom") {
            await this.country.selectOption({label: country})
        }
        await this.region.selectOption({label: region})
        await this.zipcode.fill(zipcode)
        await this.city.fill(city)
    }

    async clickConfirmOrder(){
        await expect(this.page.getByRole('heading', {level: 1})).toBeVisible()
        await this.confirmOrder.click()
    }

    async assertOrderSuccess() {
        await expect(this.page.getByRole('heading', {level: 1})).toBeVisible()
        await expect(this.page.getByRole('heading', {level: 1})).toHaveText('Your Order Has Been Processed!')
        await expect(this.page.locator('#maincontainer')).toMatchAriaSnapshot({name: 'order-success'})
    }


}