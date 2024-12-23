import { expect, Locator, Page } from "@playwright/test";
import BasePage from "../BasePage";
import { locators } from "./HomePageLocators";

export default class HomePage extends BasePage {

    constructor(page: Page){
        super(page)
    }

    async isProductsVisible(): Promise<boolean>{
        await this.page.locator(locators.productsDiv).scrollIntoViewIfNeeded();
        return await this.page.locator(locators.productsDiv).isVisible();
    }

    async searchForProduct(searchTerm: string){
        await this.page.locator(locators.searchField).fill(searchTerm);
        await this.page.locator(locators.searchButton).click();
        expect(this.page.url()).toBe("https://magento.softwaretestingboard.com/catalogsearch/result/?q="+searchTerm);
    }

    async searchSpecificProduct(searchTerm: string){
        await this.searchForProduct(searchTerm);
        const firstProductTitleLocator = this.page.locator(".product-item:nth-child(1) .product-item-link");
        await firstProductTitleLocator.scrollIntoViewIfNeeded();
        const firstProductTitle = await firstProductTitleLocator.textContent();

        console.log(firstProductTitle);
        console.log(searchTerm);
        expect(firstProductTitle!.toLowerCase()).toContain(searchTerm);
    }

    async getRandomProduct(): Promise<Locator> {
        const productLocators = await this.page.locator(".product-items .product-item").all();
        // const productLocators = await this.page.locator(".product-item .product-item-details .product-item-name a").all();
        const randomIndex = Math.floor(Math.random() * productLocators.length);
        return productLocators[randomIndex];
    }

    
}