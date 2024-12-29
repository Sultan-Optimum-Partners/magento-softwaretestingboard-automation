import { Page } from "@playwright/test";
import { locators } from "./AccountPageLocators";

export default class AccountPage {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async switchToMyOrdersTab(): Promise<void> {
        await this.page.locator(locators.myOrderstab).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async isOrderRegistered(orderId: string, totalPrice: string): Promise<boolean> {
        const ordersIds = await this.page.locator(locators.ordersIds).allTextContents();
        const ordersPrices = await this.page.locator(locators.ordersPrices).allTextContents();
        const orderIndex = ordersIds.indexOf(orderId);
        if(orderIndex !== -1 && ordersPrices[orderIndex] === totalPrice){
            return true;
        }
        return false;
    }

}