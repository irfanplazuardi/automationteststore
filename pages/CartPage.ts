import { type Page, expect, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartTable: Locator;
    readonly update: Locator;
    readonly checkout: Locator;
    readonly continueShopping: Locator
    readonly returnHome: Locator
    readonly shipmentCountry: Locator
    readonly shipmentRegion: Locator
    readonly shipmentPostCode: Locator
    readonly shipmentEstimation: Locator
    readonly shipmentRate: Locator
    readonly totalShipment: Locator
    readonly grandTotal: Locator

    constructor(page: Page) {
        this.page = page;
        this.cartTable = page.locator('table.table-bordered').first()
        this.update = page.getByRole('button', { name: 'Update' });
        this.checkout = page.getByRole('link', { name: 'Checkout' }).last();
        this.continueShopping = page.getByRole('link', { name: 'Continue Shopping' })
        this.returnHome = page.getByRole('link', { name: 'Home' }).last()
        this.shipmentCountry = page.locator('#estimate_country')
        this.shipmentRegion = page.locator('#estimate_country_zones')
        this.shipmentPostCode = page.locator('#estimate_postcode')
        this.shipmentEstimation = page.getByRole('button', { name: 'Estimate' })
        this.shipmentRate = page.locator('#shippings')
        this.totalShipment = page.locator('#totals_table tr').nth(1)
        this.grandTotal = page.locator('#totals_table tr').nth(2)
    }

    async assertCartItemQuantityBubble (items: number){
      await expect(this.page.getByRole('link', {name: /.*Items\s*-\s*\$.*/})).toContainText(`${items}`)
    }

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

    async selectShipmentCountry(country: string){
       if (country !== "United Kingdom") {
            await this.shipmentCountry.selectOption({label: country})
        }
    }

    async selectShipmentRegion(region: string){
      await this.shipmentRegion.selectOption({label: region})
    }

    async inputPostCode(code: string){
      await this.shipmentPostCode.fill(code)
    }

    async clickEstimateShipmentRate(){
      await this.shipmentEstimation.click()
      await expect(this.shipmentRate).toBeVisible()
    }

    async selectShipmentRate(rate: string){
      await this.shipmentRate.selectOption({label: rate})
      await expect(this.totalShipment.getByText(/\$\d+(\.\d{2})?/)).toBeVisible()
    }

    async assertGrandTotal(){
      const rowLocator = this.page.locator('#totals_table tr');
      
      const subTotalText = await rowLocator.nth(0).getByText(/\$\d+(\.\d{2})?/).innerText();
      const shippingText = await rowLocator.nth(1).getByText(/\$\d+(\.\d{2})?/).innerText();
      const grandTotalText = await rowLocator.nth(2).getByText(/\$\d+(\.\d{2})?/).innerText();

      const subTotal = parseFloat(subTotalText.replace('$', ''))
      const shipping = parseFloat(shippingText.replace('$', ''))
      const grandTotal = parseFloat(grandTotalText.replace('$', ''))

      const calculatedSum = subTotal + shipping
      expect(calculatedSum).toBe(grandTotal)
      console.log(`subTotal = ${subTotal} ; shipping = ${shipping} ; calulatedSum =${calculatedSum}; grandTotal = ${grandTotal}`)
    }
    



}