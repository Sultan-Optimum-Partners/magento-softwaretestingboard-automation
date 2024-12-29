import { expect, Page } from "@playwright/test";
import BasePage from "../BasePage";
import { locators } from "./SearchResultPageLocators";

export default class SearchResultPage extends BasePage {

    constructor(page: Page){
        super(page)
    }

    async verifyAllSearchResultContains(searchTerm: string) {

        const productsLink = await this.page.locator(".product-item .product-item-link").all();
        
        for (let productLink of productsLink) {

            if (await productLink.isHidden()) {
                continue;
            }
    
            const productTitle = (await productLink.textContent())!.trim().toLowerCase();
            
            if (productTitle.includes(searchTerm.toLowerCase())) {
                continue;
            }

            await productLink.click();
            await this.page.waitForLoadState("domcontentloaded");
    
            const descriptionElements = [
                ...(await this.page.locator("#description .value p").allTextContents()),
                ...(await this.page.locator("#description .value li").allTextContents())
            ];
    
            const found = descriptionElements.some(element =>
                element.toLowerCase().trim().includes(searchTerm.toLowerCase())
            );
    
            expect(found).toBeTruthy();
    
            await this.page.goBack();
        }
    }


    // async verifyAllSearchResultContains(searchTerm: string) {
    //     const productsLink = await this.page.locator(locators.productsTitleLinks).all();
        
    //     for (let productLink of productsLink) {

    //         if (await productLink.isHidden()) continue;
    
    //         const productTitle = (await productLink.textContent())!.trim().toLowerCase();
    
    //         if (!productTitle.includes(searchTerm.toLowerCase())) {

    //             await productLink.click();
    //             await this.page.waitForLoadState("domcontentloaded");
    
    //             const descriptionElements = [
    //                 ...(await this.page.locator("#description .value p").allTextContents()),
    //                 ...(await this.page.locator("#description .value li").allTextContents())
    //             ];
    
    //             const found = descriptionElements.some(element =>
    //                 element.toLowerCase().trim().includes(searchTerm.toLowerCase())
    //             );
    
    //             expect(found).toBeTruthy();
    
    //             await this.page.goBack();
    //         }
    //     }
    // }
    
    
}