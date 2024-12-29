import { Page } from "@playwright/test";
import { locators } from "./OrdersAndReturnPageLocators";

export default class OrdersAndReturnsPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async fillFormUsingEmail(orderId: string, lastName: string, email: string): Promise<void> {
        await this.page.locator(locators.orderIdField).fill(orderId);
        await this.page.locator(locators.billingLastNameField).fill(lastName);
        await this.page.locator(locators.findOrderBySelect).selectOption("email");
        await this.page.locator(locators.emailField).fill(email);
    }

    async fillFormUsingZipcode(orderId: string, lastName: string, zipcode: string): Promise<void> {
        await this.page.locator(locators.orderIdField).fill(orderId);
        await this.page.locator(locators.billingLastNameField).fill(lastName);
        await this.page.locator(locators.findOrderBySelect).selectOption("zip");
        await this.page.locator(locators.billingZipCodeField).fill(zipcode);
    }

    async submit(): Promise<void>{
        await this.page.locator(locators.continueButton).click();
        await this.page.waitForLoadState("domcontentloaded");
    }
}