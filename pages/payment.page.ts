import { Page } from "@playwright/test";

export default class PaymentPage {
    
    page: Page;
    readonly locators = {
        placeOrderButton: "//button[@title='Place Order']",
        totalPrice: ".grand .price"
    }

    constructor(page: Page){
        this.page = page;
    }

    async placeOrder(): Promise<void>{
        await this.page.locator(this.locators.placeOrderButton).click();
        await this.page.waitForNavigation({ waitUntil: "domcontentloaded" });
    }

    async getTotalPrice(): Promise<string>{
        const totalPrice = await this.page.locator(this.locators.totalPrice).textContent();
        return totalPrice!;
    }


}