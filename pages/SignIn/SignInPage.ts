import { Page } from "@playwright/test";
import BasePage from "../BasePage";
import { locators } from "./SignInPageLocators";

export default class SignInPage extends BasePage{
    constructor(page: Page){
        super(page)
    }

    async validSignIn(email: string, password: string){
        await this.page.locator(locators.email).fill(email);
        await this.page.locator(locators.password).fill(password);
        await this.page.locator(locators.signInButton).click();
        await this.page.locator('.panel .logged-in').waitFor({ state: 'visible' });

        // TODO: expect 
    }
    
}