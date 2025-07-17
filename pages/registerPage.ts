import {type Page, Locator, } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
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
    readonly agreeCheckbox: Locator
    readonly continue: Locator
   
    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#AccountFrm_firstname')
        this.lastName = page.locator('#AccountFrm_lastname')
        this.email = page.locator('#AccountFrm_email')
        this.telephone = page.locator('#AccountFrm_telephone')
        this.fax = page.locator('#AccountFrm_fax')
        this.company = page.locator('#AccountFrm_company')
        this.address1 = page.locator('#AccountFrm_address_1')
        this.address2 = page.locator('#AccountFrm_address_2')
        this.city = page.locator('#AccountFrm_city')
        this.region = page.locator('#AccountFrm_zone_id')
        this.zipcode = page.locator('#AccountFrm_postcode')
        this.country = page.locator('#AccountFrm_country_id')
        this.loginName = page.locator('#AccountFrm_loginname')
        this.password = page.locator('#AccountFrm_password')
        this.passwordConfirm = page.locator('#AccountFrm_confirm')
        this.agreeCheckbox = page.locator('#AccountFrm_agree')
        this.continue = page.getByRole('button', {name: 'Continue'})
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
        city,
        region,
        zipcode,
        country,
        loginName,
        password,
        passwordConfirm
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
        loginName: string,
        password: string,
        passwordConfirm: string,
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
        await this.loginName.fill(loginName)
        await this.password.fill(password)
        await this.passwordConfirm.fill(passwordConfirm)
    }

    async subscribeNewsletter(answer: 'Yes' | 'No'){
        const value = answer === 'Yes' ? '1' : '0';
        await this.page.locator(`input[name="newsletter"][value="${value}"]`).check()
    }

    async agreePrivacyPolicy(checked: boolean) {
        await this.agreeCheckbox.setChecked(checked)
    }

    async buttonContinue() {
        await this.continue.click()
    }
}