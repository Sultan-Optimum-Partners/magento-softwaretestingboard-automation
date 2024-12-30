import { Page } from "@playwright/test";
import BasePage from "../base.page";
import { locators } from "./shipping.locators";

export default class ShippingPage extends BasePage {
    constructor(page: Page) {
        super(page);
    }

    async fillShippingForm(
        email: string,
        firstname: string,
        lastname: string,
        country: string,
        street1: string,
        city: string,
        state: string,
        zipcode: string,
        phonenumber: string,
        company?: string,
        street2?: string,
        street3?: string,
    ): Promise<{ email: string; lastname: string; zipcode: string }> {

        await this.page.locator(locators.emailTextField).fill(email);
        await this.page.locator(locators.firstNameTextField).fill(firstname);
        await this.page.locator(locators.lastNameTextField).fill(lastname);
        if(company) await this.page.locator(locators.companyTextField).fill(company);
        await this.page.locator(locators.countrySelect).selectOption({label: country});
        await this.page.waitForEvent("requestfinished");
        await this.page.locator(locators.street1TextField).fill(street1);
        if(street2) await this.page.locator(locators.street2TextField).fill(street2);
        if(street3) await this.page.locator(locators.street3TextField).fill(street3);
        await this.page.locator(locators.cityTextField).fill(city);
        await this.page.locator(locators.stateTextField).fill(state);
        await this.page.locator(locators.postcodeTextField).fill(zipcode);
        await this.page.locator(locators.phoneTextField).fill(phonenumber);
        // await this.page.locator(locators.shippingFixedRadio).check();

        return {
            email: email,
            lastname: lastname,
            zipcode: zipcode,
        }
    }

    async selectShippingMethod(shippingMethod: "tableRate" | "fixed"): Promise<void>{
        if(shippingMethod === "fixed"){
            await this.page.locator(locators.shippingFixedRadio).check();
        } else {
            await this.page.locator(locators.shippingTableRateRadio).check();

        }
    }

    async clickNext(): Promise<void>{
        await this.page.locator(locators.nextButton).click();
        await this.page.waitForNavigation({ waitUntil: "domcontentloaded" });
    }

    async isAddressAlreadyRegistered(): Promise<boolean> {
        return this.page.locator(locators.registeredShippingAddress).isVisible();
    }
}