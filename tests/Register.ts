import { expect} from '@playwright/test';
import { test } from '../pages/fixture';
import { faker } from '@faker-js/faker';
import { qase } from 'playwright-qase-reporter';

test.describe('Register', () => {
  const firstName = faker.person.firstName()
  
  test.beforeEach(async ({page, homePage, loginPage}) => {
    await page.context().clearCookies();
    await page.goto('/');
    await homePage.clickRegisterLogin()
    await loginPage.clickContinue()
  });

  test(qase(1,'Register with already reagistered account'), async({page, registerPage}) => {
    await registerPage.inputForm({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: `${process.env.EMAIL}`,
      telephone: faker.helpers.replaceSymbols('08##########'),
      fax: faker.helpers.replaceSymbols(('*****')),
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.streetAddress(),
      country: 'Indonesia',
      city: faker.location.city(),
      region: 'Jakarta Raya',
      zipcode: faker.helpers.replaceSymbols(('*****')),
      loginName: `${process.env.LOGIN_NAME}`,
      password: `${process.env.PASSWORD}`,
      passwordConfirm: `${process.env.PASSWORD}` 
    })
    await registerPage.subscribeNewsletter('Yes')
    await registerPage.agreePrivacyPolicy(true)
    await registerPage.buttonContinue()
    await expect(page.locator('.alert-error')).toContainText('Error: E-Mail Address is already registered!')
  })

  test(qase(2,'Register with all field empty'), async ({page, registerPage})=> {
    await registerPage.buttonContinue()
    await expect(page.getByText('First Name must be between 1 and 32 characters!')).toBeVisible()
    await expect(page.getByText('Last Name must be between 1 and 32 characters!')).toBeVisible()
    await expect(page.getByText('Email Address does not appear to be valid!')).toBeVisible()
    await expect(page.getByText('Address 1 must be between 3 and 128 characters!')).toBeVisible()
    await expect(page.getByText('City must be between 3 and 128 characters!')).toBeVisible()
    await expect(page.getByText('Zip/postal code must be between 3 and 10 characters!')).toBeVisible()
    await expect(page.getByText('Login name must be alphanumeric only and between 5 and 64 characters!')).toBeVisible()
    await expect(page.getByText('Login name must be alphanumeric only and between 5 and 64 characters!')).toBeVisible()
    await expect(page.getByText('Password must be between 4 and 20 characters!')).toBeVisible()
    await expect(page.getByText('Error: You must agree to the Privacy Policy!')).toBeVisible()    
  });

  test(qase(3,'Register with already used login name'), async({page, registerPage}) => {
    await registerPage.inputForm({
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
      zipcode: faker.helpers.replaceSymbols(('*****')),
      loginName: `${process.env.LOGIN_NAME}`,
      password: `${process.env.PASSWORD}`,
      passwordConfirm: `${process.env.PASSWORD}` 
    })
    await registerPage.subscribeNewsletter('Yes')
    await registerPage.agreePrivacyPolicy(true)
    await registerPage.buttonContinue()
    await expect(page.locator('.alert-error')).toContainText('This login name is not available. Try different login name!')
  })

  test(qase(4,'Register with not matching password'), async({page, registerPage}) => {
    await registerPage.inputForm({
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
      zipcode: faker.helpers.replaceSymbols(('*****')),
      loginName: faker.internet.username(),
      password: `${process.env.PASSWORD}`,
      passwordConfirm: '1234asdfs' 
    })
    await registerPage.subscribeNewsletter('No')
    await registerPage.agreePrivacyPolicy(true)
    await registerPage.buttonContinue()
    await expect(page.locator('.alert-error')).toContainText('Password confirmation does not match password!')
  })

  test(qase(5,'Register with input required fields only'), async({page, registerPage, accountPage}) => {
    await registerPage.inputForm({
      firstName: firstName,
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      telephone: '',
      fax: '',
      company: '',
      address1: faker.location.streetAddress(),
      address2: '',
      country: 'Indonesia',
      city: faker.location.city(),
      region: 'Jakarta Raya',
      zipcode: faker.helpers.replaceSymbols(('*****')),
      loginName: faker.internet.username(),
      password: `${process.env.PASSWORD}`,
      passwordConfirm: `${process.env.PASSWORD}` 
    })
    await registerPage.agreePrivacyPolicy(true)
    await registerPage.buttonContinue()
    await expect(page.getByText('Your Account Has Been Created!')).toBeVisible();
    await accountPage.clickContinueToAccount()
    await expect(page.locator('h1').getByText('My Account')).toBeVisible();
    await expect(page.getByText(firstName, { exact: true })).toBeVisible();
  })

  test(qase(6,'Register with input all fields'), async({page, registerPage, accountPage}) => {
    await registerPage.inputForm({
      firstName: firstName,
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
    await registerPage.subscribeNewsletter('Yes')
    await registerPage.agreePrivacyPolicy(true)
    await registerPage.buttonContinue()
    await expect(page.getByText('Your Account Has Been Created!')).toBeVisible();
    await accountPage.clickContinueToAccount()
    await expect(page.locator('h1').getByText('My Account')).toBeVisible();
    await expect(page.getByText(firstName, { exact: true })).toBeVisible();
  })

});