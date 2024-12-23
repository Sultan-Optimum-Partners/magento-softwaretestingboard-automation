import { Locator, Page } from "@playwright/test";
import { locators } from "./HeaderLocators";

export default class Header{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    public async navigateToSignIn(): Promise<void>{
        await this.page.locator(locators.signInButton).click();
    }

    public async navigateToCreateAnAccount(): Promise<void>{
        await this.page.locator(locators.createAccountbutton).click();
    }
}