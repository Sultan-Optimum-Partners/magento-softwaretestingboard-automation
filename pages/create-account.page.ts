import { Locator, Page } from "@playwright/test";
import BasePage from "./base.page";

export default class CreateAccountPage extends BasePage{

    readonly locators = {
        firstName: "#firstname",
        lastname: "#lastname",
        email: "#email_address",
        password: "#password",
        confirmPassword: "#password-confirmation",
        createAccountButton: "#form-validate  button[title='Create an Account']"
    }

    constructor(page: Page){
        super(page)
    }

    async fillPersonalInformation(firstName: string, lastName: string){
        await this.page.locator(this.locators.firstName).fill(firstName);
        await this.page.locator(this.locators.lastname).fill(lastName);
    }

    async fillSignInInformation(email: string, password: string, confirmPassword: string) {
        await this.page.locator(this.locators.email).fill(email);
        await this.page.locator(this.locators.password).fill(password);
        await this.page.locator(this.locators.confirmPassword).fill(confirmPassword);
    } 

    async clickCreateAnAccount(){
        await this.page.locator(this.locators.createAccountButton).click();
    }
}
