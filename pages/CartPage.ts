import { type Page, expect, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartTable: Locator;
    readonly update: Locator;
    readonly checkout: Locator;
    readonly continueShopping: Locator
    readonly returnHome
    

    constructor(page: Page) {
        this.page = page;
        this.cartTable = page.locator('table.table-bordered').first()
        this.update = page.getByRole('button', { name: 'Update' });
        this.checkout = page.getByRole('link', { name: 'Checkout' });
        this.continueShopping = page.getByRole('link', { name: 'Continue Shopping' })
        this.returnHome = page.getByRole('link', { name: 'Home' }).last()
    }

    async assertCartItemQuantityBubble (items: number){
      await expect(this.page.getByRole('link', {name: /.*Items\s*-\s*\$.*/})).toContainText(`${items}`)
    }

    // async assertPrice () {
    //   const productCard = this.page.locator('.col-md-3.col-sm-6.col-xs-12', {
    //     has: this.page.locator('a.prdocutname', { hasText: productName })
    // }).first();

    // const price
    // }

    async assertCartTable(file: string) {
      await expect(this.cartTable).toMatchAriaSnapshot({name: file})
    }
    
    async clickUpdate() {
        await this.update.click();
    }

    async clickCheckout() {
        await this.checkout.click()
    }

    async clickContinueShopping() {
      await this.continueShopping.click()
    }

    async clickHomeLink() {
      await this.returnHome.click()
    }

    async getRowItemName(name: string) {
    return this.page.locator('table.table tbody tr').filter({
        has: this.page.locator('td').locator('a', { hasText: name })
      })
    }

    async clickRemoveItem(name: string) {
      const row = await this.getRowItemName(name)
      row.locator('a.btn >> .fa-trash-o').click() 
      await expect(row).toHaveCount(0);
    }

    async updateQuanitity(name: string, quantity: number) {
      const row = await this.getRowItemName(name)
      row.locator('input[type="text"]').fill(`${quantity}`)
    }

    async assertTotalPerItem(name: string) {
      const row = await this.getRowItemName(name)

      const quantityText = await row.locator('input[type="text"]').inputValue()
      const quantity = parseInt(quantityText)
      console.log(`quantity:${quantity}`)
      const priceText = await row.locator('td.align_right').first().innerText()
      const price = parseFloat(priceText.replace('$', ''))
      console.log(`price:${price}`)

      const expectTotal = price*quantity
      const totalText = await row.locator('td.align_right').last().innerText()
      const total = parseFloat(totalText.replace('$', ''))
      console.log(`total:${total} ; expectedTotal:${expectTotal}`)

      expect(total).toBe(expectTotal)
    }

    async assertSubTotal() {
      const rowLocator = this.page.locator('table.table').first().locator('tbody tr');
      const rowCount = await rowLocator.count()
      console.log(`row: ${rowCount}`)

      let calculatedSum = 0;

      for (let i = 1; i < rowCount; i++) {
        const row = rowLocator.nth(i)

        const totalText = await row.locator('td.align_right').last().innerText();
        const cleaned = totalText.replace('$', '');
        console.log(`Row ${i} cleaned value: ${cleaned}`);

        const total = parseFloat(cleaned);

        calculatedSum += total
        console.log("total = " + calculatedSum)
      }

      const subTotalRow = this.page
        .locator('#totals_table tr')
        .filter({
          has: this.page.locator('span.extra.bold', { hasText: 'Sub-Total:' }),
        });

      await expect(subTotalRow).toBeVisible();

      const subTotalText = await subTotalRow.getByText(/^\$\s?\d+(\.\d{2})?$/)

      await expect(subTotalText).toBeVisible()

      const subTotalClean =  await subTotalText.innerText()
      

      const displayedSubTotal = parseFloat(subTotalClean.replace('$', ''));
      console.log(`subtotal = ${displayedSubTotal}`)
      expect(calculatedSum).toBe(displayedSubTotal);
    }



}