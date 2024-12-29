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

    async searchSpecificProduct(searchTerm: string){
        await this.page.locator(locators.searchField).fill(searchTerm);
        await this.page.locator(locators.searchButton).click();
        await this.page.waitForLoadState("domcontentloaded");
        expect(this.page.url()).toBe("https://magento.softwaretestingboard.com/catalogsearch/result/?q=" + searchTerm);
    }

    async getRandomProduct(): Promise<Locator> {
        const productLocators = await this.page.locator(".product-items .product-item").all();
        const randomIndex = Math.floor(Math.random() * productLocators.length);
        return productLocators[randomIndex];
    }
    async navigateToRandomProduct(): Promise<string> {
        const randomProduct = await this.getRandomProduct();
        // const randomProduct = this.page.locator("#maincontent > div.columns > div > div.widget.block.block-static-block > div.block.widget.block-products-list.grid > div > div > ol > li:nth-child(1)");
        await randomProduct.waitFor({state: "visible"});
        await randomProduct.scrollIntoViewIfNeeded();

        const randomProductLink = randomProduct.locator('.product-item-details .product-item-name a');
        const productName = await randomProductLink.textContent();
        await randomProductLink.waitFor({state: "visible"});
        await randomProductLink.click();
        await this.page.waitForLoadState("domcontentloaded");

        return productName!.trim();
    }

    async navigateToOrderAndReturnsPage(): Promise<void>{
        await this.page.locator(locators.OrderAndReturnsButton).click();
        await this.page.waitForNavigation({ waitUntil: "domcontentloaded" });

    }

}