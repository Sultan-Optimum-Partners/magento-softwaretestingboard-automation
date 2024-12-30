import { expect, Page } from "@playwright/test";

export default class Cart {

    protected page: Page;
    readonly locators = {
        cartItemsLinks: "#mini-cart .product-item-name a",
        cartCheckoutButton: "#top-cart-btn-checkout",
        cartDiv: ".showcart",
        cartItemsDeleteButtons: "#mini-cart .delete",
        confirmDeleteButton: ".modal-inner-wrap .action-accept",
        cartEmptySubtitleDiv: "#minicart-content-wrapper .subtitle.empty"
    }

    constructor(page: Page){
        this.page = page;
    }

    async getCartItemNames(): Promise<Array<String>>{
        return await this.page.locator(this.locators.cartItemsLinks).allTextContents();
    }

    async checkout(): Promise<void>{
        await this.page.locator(this.locators.cartCheckoutButton).click();
    }

    async isCartVisible(): Promise<boolean> {
        return this.page.locator(this.locators.cartDiv).isVisible();
    }

    async emptyCart(): Promise<void> {
        expect(this.isCartVisible).toBeTruthy();
        const deleteButtons = await this.page.locator(this.locators.cartItemsDeleteButtons).all()
        for(let deleteButton of deleteButtons) {
            await deleteButton.click();
            await this.page.locator(this.locators.confirmDeleteButton).click();
        }

        const emptySubtitle = await this.page.locator(this.locators.cartEmptySubtitleDiv).textContent();
        expect(emptySubtitle).toEqual("You have no items in your shopping cart.");


    }
}