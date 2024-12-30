import { Locator, Page } from "@playwright/test";
import BasePage from "./base.page";

export default class ProductPage extends BasePage {

    readonly locators = {
        pageTitleLocator: "span[data-ui-id='page-title-wrapper']",
        firstSizeOption: ".size .swatch-option",
        firstColorOption: ".color .swatch-option",
        successMessageLocator: "div[data-ui-id='message-success']",
        errorMessageLocator: "div[data-ui-id='message-error']",
        addToCartButton: "#product-addtocart-button",
        cartButton: ".minicart-wrapper .showcart"
    }

    constructor(page: Page){
        super(page);
    }

    async getProductName(): Promise<string>{
        const productNameLocator = this.page.locator(this.locators.pageTitleLocator);
        await productNameLocator.waitFor({state: "visible"});
        const productName = await productNameLocator.textContent();
        if (!productName) {
            throw new Error("Product name not found or empty.");
        }
        return productName.trim();
    }

    async selectSizeAndColorIfExist(){
        const firstSizeOption  = this.page.locator(this.locators.firstSizeOption).nth(0);
        const firstColorOption = this.page.locator(this.locators.firstColorOption).nth(0);
        await this.page.waitForLoadState("load");
    
        if (await firstColorOption.isVisible()) {
            await firstColorOption.click();
            await firstSizeOption.click();
        } else {
            console.error("Color option is not visible.");
        }

    }

    async addToCartButton(): Promise<void>{
        await this.page.locator(this.locators.addToCartButton).click();
        await this.page.waitForLoadState("networkidle");
    }

    private async getDisplayedMessageLocator(): Promise<Locator>{
        const successMessageLocator = this.page.locator(this.locators.successMessageLocator);
        const errorMessageLocator = this.page.locator(this.locators.errorMessageLocator);


        return await successMessageLocator.isVisible() ? successMessageLocator : errorMessageLocator;

    }

    async getDisplayedMessageTextContent(): Promise<string>{
        const displayedMessageLocator = await this.getDisplayedMessageLocator();
        await displayedMessageLocator.scrollIntoViewIfNeeded();

        return await displayedMessageLocator.textContent() as string;
    }

    async openCart(): Promise<void> {
        const cartButton =  this.page.locator(this.locators.cartButton);
        await cartButton.click();         

    }
}