import { Page } from "@playwright/test";
import BasePage from "./base.page";

export default class SignInPage extends BasePage{

    readonly locators = {
        email: "#email",
        password: "#pass[name='login[password]']",
        signInButton: "#send2.primary",
        forgotPasswordButton: "fieldset a"
    } 

    constructor(page: Page){
        super(page);
    }

    async validSignIn(email: string, password: string): Promise<void>{
        await this.page.locator(this.locators.email).fill(email);
        await this.page.locator(this.locators.password).fill(password);
        await this.page.locator(this.locators.signInButton).click();
        // await this.page.waitForLoadState("load");

        await this.page.waitForTimeout(5000);
    }
    
}