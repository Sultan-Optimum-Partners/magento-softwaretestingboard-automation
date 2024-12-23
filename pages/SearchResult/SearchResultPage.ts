import { expect, Page } from "@playwright/test";
import BasePage from "../BasePage";
import { locators } from "./SearchResultPageLocators";

export default class SearchResultPage extends BasePage {

    constructor(page: Page){
        super(page)
    }

    async verifyAllSearchResultContains(searchTerm: string){
        const productsLink = await this.page.locator(".product-item .product-item-link").all();
        for(let productLink of productsLink){
            const productTitle = await productLink.textContent();
            
            if (productTitle?.toLowerCase().includes(searchTerm.toLowerCase())) {
                continue;
            }

            await productLink.click();
            const paragraphElements = await this.page.locator("#description .value p").all();
            const listElements = await this.page.locator("#description .value li").all();
            const descriptionElements = paragraphElements.concat(listElements);
            
            let found = false;
            for (const element of descriptionElements) {
                const elementText = await element.textContent();
                if(elementText!.toLowerCase().includes(searchTerm.toLowerCase())){
                    found = true;
                    break;
                }
            }
            expect(found).toBeTruthy();

            await this.page.goBack();
        }
    }

}