import { Locator, Page } from "@playwright/test";
import { locators } from "./create-account.locators";
import BasePage from "../base.page";

export default class CreateAccountPage extends BasePage{
    constructor(page: Page){
        super(page)
    }

    async fillPersonalInformation(firstName: string, lastName: string){
        await this.page.locator(locators.firstName).fill(firstName);
        await this.page.locator(locators.lastname).fill(lastName);
    }

    async fillSignInInformation(email: string, password: string, confirmPassword: string) {
        await this.page.locator(locators.email).fill(email);
        await this.page.locator(locators.password).fill(password);
        await this.page.locator(locators.confirmPassword).fill(confirmPassword);
    } 

    async clickCreateAnAccount(){
        await this.page.locator(locators.createAccountButton).click();
    }
}
