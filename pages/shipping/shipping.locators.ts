export const locators = {
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
    nextButton: "#shipping-method-buttons-container > div > button",
    registeredShippingAddress: "shipping-address-items"
}