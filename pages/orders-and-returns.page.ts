import { Page } from "@playwright/test";

export default class OrdersAndReturnsPage {

    readonly locators = {
        orderIdField: "#oar-order-id",
        billingLastNameField:"oar-billing-lastname",
        findOrderBySelect: "quick-search-type-id",
        emailField: "oar_email",
        billingZipCodeField: "oar_zip",
        continueButton: "#oar-widget-orders-and-returns-form  button"
    }

    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async fillFormUsingEmail(orderId: string, lastName: string, email: string): Promise<void> {
        await this.page.locator(this.locators.orderIdField).fill(orderId);
        await this.page.locator(this.locators.billingLastNameField).fill(lastName);
        await this.page.locator(this.locators.findOrderBySelect).selectOption("email");
        await this.page.locator(this.locators.emailField).fill(email);
    }

    async fillFormUsingZipcode(orderId: string, lastName: string, zipcode: string): Promise<void> {
        await this.page.locator(this.locators.orderIdField).fill(orderId);
        await this.page.locator(this.locators.billingLastNameField).fill(lastName);
        await this.page.locator(this.locators.findOrderBySelect).selectOption("zip");
        await this.page.locator(this.locators.billingZipCodeField).fill(zipcode);
    }

    async submit(): Promise<void>{
        await this.page.locator(this.locators.continueButton).click();
        await this.page.waitForLoadState("domcontentloaded");
    }
}