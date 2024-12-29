import { Page } from "@playwright/test";
import { locators } from "./SignInPageLocators";
import BasePage from "../BasePage";

export default class SignInPage extends BasePage{

    constructor(page: Page){
        super(page)
    }

    async validSignIn(email: string, password: string){
        await this.page.locator(locators.email).fill(email);
        await this.page.locator(locators.password).fill(password);
        const signinButton = this.page.locator(locators.signInButton);
        await signinButton.scrollIntoViewIfNeeded();
        await signinButton.click({ timeout: 5000 }); // Increase the timeout to 5000ms

        await this.page.waitForTimeout(2000)
    }
    
}