import { Page } from "@playwright/test";
import BasePage from "./base.page";

export default class ShippingPage extends BasePage {

    readonly locators = {
        emailTextField: "#customer-email-fieldset #customer-email",
        firstNameTextField: "#shipping-new-address-form div[name='shippingAddress.firstname'] input",
        lastNameTextField: "#shipping-new-address-form div[name='shippingAddress.lastname'] input",
        companyTextField: "#shipping-new-address-form div[name='shippingAddress.company'] input",
        street1TextField: "#shipping-new-address-form div[name='shippingAddress.street.0'] input",
        street2TextField: "#shipping-new-address-form div[name='shippingAddress.street.1'] input",
        street3TextField: "#shipping-new-address-form div[name='shippingAddress.street.2'] input",
        cityTextField: "#shipping-new-address-form div[name='shippingAddress.city'] input",
        stateSelect: "#shipping-new-address-form div[name='shippingAddress.region_id'] select",
        stateTextField: "#shipping-new-address-form div[name='shippingAddress.region'] input",
        postcodeTextField: "#shipping-new-address-form div[name='shippingAddress.postcode'] input",
        countrySelect: "#shipping-new-address-form div[name='shippingAddress.country_id'] select",
        phoneTextField: "#shipping-new-address-form div[name='shippingAddress.telephone'] input",
        shippingFixedRadio: "#checkout-shipping-method-load tr:nth-child(1) input",
        shippingTableRateRadio: "#checkout-shipping-method-load tr:nth-child(2) input",
        nextButton: "#shipping-method-buttons-container button",
        registeredShippingAddress: "shipping-address-items"
    }

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

        await this.page.locator(this.locators.emailTextField).fill(email);
        await this.page.locator(this.locators.firstNameTextField).fill(firstname);
        await this.page.locator(this.locators.lastNameTextField).fill(lastname);
        if(company) await this.page.locator(this.locators.companyTextField).fill(company);
        await this.page.locator(this.locators.countrySelect).selectOption({label: country});
        await this.page.waitForEvent("requestfinished");
        await this.page.locator(this.locators.street1TextField).fill(street1);
        if(street2) await this.page.locator(this.locators.street2TextField).fill(street2);
        if(street3) await this.page.locator(this.locators.street3TextField).fill(street3);
        await this.page.locator(this.locators.cityTextField).fill(city);
        await this.page.locator(this.locators.stateTextField).fill(state);
        await this.page.locator(this.locators.postcodeTextField).fill(zipcode);
        await this.page.locator(this.locators.phoneTextField).fill(phonenumber);

        return {
            email: email,
            lastname: lastname,
            zipcode: zipcode,
        }
    }

    async selectShippingMethod(shippingMethod: "tableRate" | "fixed"): Promise<void>{
        if(shippingMethod === "fixed"){
            await this.page.locator(this.locators.shippingFixedRadio).check();
        } else {
            await this.page.locator(this.locators.shippingTableRateRadio).check();

        }
    }

    async clickNext(): Promise<void>{
        await this.page.locator(this.locators.nextButton).click();
        await this.page.waitForNavigation({ waitUntil: "domcontentloaded" });
    }

    async isAddressAlreadyRegistered(): Promise<boolean> {
        return this.page.locator(this.locators.registeredShippingAddress).isVisible();
    }
}