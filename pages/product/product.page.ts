import { Locator, Page } from "@playwright/test";
import BasePage from "../base.page";
import { locators } from "./product.locators";

export default class ProductPage extends BasePage {
    constructor(page: Page){
        super(page);
    }

    async getProductName(): Promise<string>{
        const productNameLocator = this.page.locator(locators.pageTitleLocator);
        await productNameLocator.waitFor({state: "visible"});
        const productName = await productNameLocator.textContent();
        if (!productName) {
            throw new Error("Product name not found or empty.");
        }
        return productName.trim();
    }

    async selectSizeAndColorIfExist(){
        const firstSizeOption  = this.page.locator(locators.firstSizeOption);
        const firstColorOption = this.page.locator(locators.firstColorOption);
        await this.page.waitForLoadState("load");
    
        if (await firstColorOption.isVisible()) {
            await firstColorOption.click();
            await firstSizeOption.click();
        } else {
            console.error("Color option is not visible.");
        }

    }

    async addToCartButton(): Promise<void>{
        await this.page.locator(locators.addToCartButton).click();
        await this.page.waitForLoadState("networkidle");
    }

    private async getDisplayedMessageLocator(): Promise<Locator>{
        const successMessageLocator = this.page.locator(locators.successMessageLocator);
        const errorMessageLocator = this.page.locator(locators.errorMessageLocator);


        return await successMessageLocator.isVisible() ? successMessageLocator : errorMessageLocator;

    }

    async getDisplayedMessageTextContent(): Promise<string>{
        const displayedMessageLocator = await this.getDisplayedMessageLocator();
        await displayedMessageLocator.scrollIntoViewIfNeeded();

        return await displayedMessageLocator.textContent() as string;
    }

    async openCart(): Promise<void> {
        const cartButton =  this.page.locator(locators.cartButton);
        await cartButton.click();         

    }
}