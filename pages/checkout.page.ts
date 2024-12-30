import { Page } from "@playwright/test";
import BasePage from "./base.page";

export default class CheckoutPage extends BasePage{

    readonly locators = {
        checkoutMessage : "span[data-ui-id='page-title-wrapper']",    
        orderMessage : ".checkout-success > p:nth-child(1)",
        orderNumber : ".order-number :first-child",
        continueShoppingButton: ".checkout-success  .actions-toolbar a.continue"
    }

    constructor(page: Page){
        super(page)
    }

    async getCheckoutMessage(): Promise<string>{
        return (await this.page.locator(this.locators.checkoutMessage).textContent()) ?? "";
    }

    async getOrderMessage(): Promise<string> {
        return (await this.page.locator(this.locators.orderMessage).textContent()) ?? "";
    }
    async getOrderNumber(): Promise<string> {
        return (await this.page.locator(this.locators.orderNumber).textContent()) ?? "";
    }

    async backToHome(): Promise<void>{
        await this.page.locator(this.locators.continueShoppingButton).click();
        await this.page.waitForLoadState("domcontentloaded")
    }

    async quickNavigateToOrder(): Promise<void>{
        await this.page.locator(this.locators.orderNumber).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

}