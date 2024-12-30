import { Page } from "@playwright/test";
import { locators } from "./signin.locators";
import BasePage from "../base.page";

export default class SignInPage extends BasePage{

    constructor(page: Page){
        super(page)
    }

    async validSignIn(email: string, password: string): Promise<void>{
        await this.page.locator(locators.email).fill(email);
        await this.page.locator(locators.password).fill(password);
        const signinButton = this.page.locator(locators.signInButton);
        await signinButton.click();
    }
    
}