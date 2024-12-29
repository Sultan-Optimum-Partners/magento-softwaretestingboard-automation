import { expect, Page } from "@playwright/test";
import BasePage from "../BasePage";
import { locators } from "./CartLocators";

export default class Cart {

    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async getCartItemNames(): Promise<Array<String>>{
        return await this.page.locator(locators.cartItemsLinks).allTextContents();
    }

    async checkout(): Promise<void>{
        await this.page.locator(locators.cartCheckoutButton).click();
    }

    async isCartVisible(): Promise<boolean> {
        return this.page.locator(locators.cartDiv).isVisible();
    }

    async emptyCart(): Promise<void> {
        expect(this.isCartVisible).toBeTruthy();
        const deleteButtons = await this.page.locator(locators.cartItemsDeleteButtons).all()
        for(let deleteButton of deleteButtons) {
            await deleteButton.click();
            await this.page.locator(locators.confirmDeleteButton).click();
        }

        const emptySubtitle = await this.page.locator(locators.cartEmptySubtitleDiv).textContent();
        expect(emptySubtitle).toEqual("You have no items in your shopping cart.");


    }
}