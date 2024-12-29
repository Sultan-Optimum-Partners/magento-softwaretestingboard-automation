import { Page } from "@playwright/test";
import BasePage from "../BasePage";
import { locators } from "./CheckoutPageLocators";
import HomePage from "../HomePage/HomePage";

export default class extends BasePage{

    constructor(page: Page){
        super(page)
    }

    async getCheckoutMessage(): Promise<string>{
        return (await this.page.locator(locators.checkoutMessage).textContent()) ?? "";
    }

    async getOrderMessage(): Promise<string> {
        return (await this.page.locator(locators.orderMessage).textContent()) ?? "";
    }
    async getOrderNumber(): Promise<string> {
        return (await this.page.locator(locators.orderNumber).textContent()) ?? "";
    }

    async backToHome(): Promise<void>{
        await this.page.locator(locators.continueShoppingButton).click();
        await this.page.waitForLoadState("domcontentloaded")
    }

    async quickNavigateToOrder(): Promise<void>{
        await this.page.locator(locators.orderNumber).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

}