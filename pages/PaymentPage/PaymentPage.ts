import { Page } from "@playwright/test";
import BasePage from "../BasePage";
import { locators } from "./PaymentPageLocator";

export default class PaymentPage {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async placeOrder(): Promise<void>{
        await this.page.locator(locators.placeOrderButton).click();
        await this.page.waitForNavigation({ waitUntil: "domcontentloaded" });
    }

    async getTotalPrice(): Promise<string>{
        const totalPrice = await this.page.locator(locators.totalPrice).textContent();
        return totalPrice!;
    }


}