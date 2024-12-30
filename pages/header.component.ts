import { Locator, Page } from "@playwright/test";

export default class Header{

    private page: Page;
    readonly locators = {
        signInButton: "//div[contains(@class, 'panel')]//a[normalize-space()='Sign In']",
        createAccountbutton: "//div[contains(@class, 'panel')]//a[normalize-space()='Create an Account']",
        profileDropDownButton: "header  button[data-action='customer-menu-toggle']",
        myAccountButton: "//header//a[text()='My Account']",
    }

    constructor(page: Page){
        this.page = page;
    }

    async navigateToSignIn(): Promise<void>{
        await this.page.locator(this.locators.signInButton).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async navigateToCreateAnAccount(): Promise<void>{
        await this.page.locator(this.locators.createAccountbutton).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async navigateToMyAccount(): Promise<void> {
        await this.page.locator(this.locators.profileDropDownButton).click();
        await this.page.locator(this.locators.myAccountButton).click();
        await this.page.waitForLoadState("domcontentloaded");
    } 

}