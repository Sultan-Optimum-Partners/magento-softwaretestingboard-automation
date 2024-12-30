import { Page } from "@playwright/test";

export default class AccountPage {

    readonly page: Page;
    readonly locators = {
        ordersIds: "#my-orders-table td.id",
        ordersPrices: "#my-orders-table .price",
        myOrderstab: "#block-collapsible-nav  li:nth-child(2) :first-child"
    }

    constructor(page: Page){
        this.page = page;
    }

    async switchToMyOrdersTab(): Promise<void> {
        await this.page.locator(this.locators.myOrderstab).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async isOrderRegistered(orderId: string, totalPrice: string): Promise<boolean> {
        const ordersIds = await this.page.locator(this.locators.ordersIds).allTextContents();
        const ordersPrices = await this.page.locator(this.locators.ordersPrices).allTextContents();
        const orderIndex = ordersIds.indexOf(orderId);
        if(orderIndex !== -1 && ordersPrices[orderIndex] === totalPrice){
            return true;
        }
        return false;
    }

}