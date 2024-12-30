import { Locator, Page } from "@playwright/test";
import { locators } from "./header.locators";

export default class Header{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async navigateToSignIn(): Promise<void>{
        await this.page.locator(locators.signInButton).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async navigateToCreateAnAccount(): Promise<void>{
        await this.page.locator(locators.createAccountbutton).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async navigateToMyAccount(): Promise<void> {
        await this.page.locator(locators.profileDropDownButton).click();
        await this.page.locator(locators.myAccountButton).click();
        await this.page.waitForLoadState("domcontentloaded");
    } 

}