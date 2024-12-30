import { test, expect } from "../fixtures/shared.fixture";

test("User is able to navigate to homepage and view products without authentication", async ({ page, homePage }) => {
    const isLoggedIn = await homePage.isLoggedIn();
    const isProductsVisible = await homePage.isProductsVisible();
    expect(isLoggedIn).toBeFalsy();
    expect(isProductsVisible).toBeTruthy();
})

test("User is able to sign in successfully", async ({ page, header, signInPage }) => {
    // (SignUp)
    // await header.navigateToCreateAnAccount();
    // await createAccountPage.fillPersonalInformation("Sultan", "Duwaik");
    // await createAccountPage.fillSignInInformation("sultan.raed88@gmail.com", "Pass@123", "Pass@123");
    // await createAccountPage.clickCreateAnAccount();
    // (End Signup)
    await header.navigateToSignIn();
    await signInPage.validSignIn("sultan.raed88@gmail.com", "Pass@123");
    const isLoggedIn = await signInPage.isLoggedIn();
    expect(isLoggedIn).toBeTruthy();
});

test("User can search on a specific product", async ({ page, homePage }) => {
    await homePage.searchSpecificProduct("bag");
});

test("Verify all search result should contain the search term", async ({ page, homePage, searchResultPage }) => {
    await homePage.searchSpecificProduct("backpack");
    await searchResultPage.verifyAllSearchResultContains("backpack")
});

test("Can navigate to a product page, verify that the correct page is opened", async ({ page, homePage, productPage }) => {
    const productName = await homePage.navigateToRandomProduct();
    const pageTitle = await productPage.getProductName();
    expect(productName).toEqual(pageTitle);
});

/*
    - User can add a product to Cart, 
    - Verify that the product is added to the cart, 
    - Finish checkout and place order,
    - Verify that the order is visible in orders history page with order number and price “sales/order/history/
*/

test("product can be added to cart, checkout and place order, verify that the order is visible in orders history page", 
    async ({  page, homePage, productPage, cart, shippingPage, paymentPage, checkoutPage, header, signInPage, accountPage }) => {

    await header.navigateToSignIn();
    await signInPage.validSignIn("sultan.raed88@gmail.com", "Pass@123");
    expect(await signInPage.isLoggedIn()).toBeTruthy();

    await signInPage.navigateToHome();

    await homePage.navigateToRandomProduct();
    let pageTitle = await productPage.getProductName();
    
    await productPage.selectSizeAndColorIfExist();
    
    await productPage.addToCartButton();

    let displayedMessage = await productPage.getDisplayedMessageTextContent();

    expect(displayedMessage?.trim()).toContain(`You added ${pageTitle} to your shopping cart.`);

    // await productPage.openCart();

    // let cartItemsNames = await cart.getCartItemNames();
    // expect(cartItemsNames).toContain(pageTitle?.trim());

    // await page.goBack({waitUntil: "domcontentloaded"});
    
    // await homePage.navigateToRandomProduct();
    // pageTitle = await productPage.getProductName();
    
    // await productPage.selectSizeAndColorIfExist();
    
    // await productPage.addToCartButton();

    // displayedMessage = await productPage.getDisplayedMessageTextContent();

    // expect(displayedMessage?.trim()).toContain(`You added ${pageTitle} to your shopping cart.`);
   
    await productPage.openCart();

    // cartItemsNames = await cart.getCartItemNames();
    // expect(cartItemsNames).toContain(pageTitle?.trim());

    await cart.checkout();

    if(await shippingPage.isAddressAlreadyRegistered()){
        await shippingPage.fillShippingForm("sultan@gmail.com", "sultan", "dwaik", "Jordan", "big street", "amman", "amman", "123432", "0791916219");
    }

    await shippingPage.selectShippingMethod("fixed"); 

    await shippingPage.clickNext();
    const totalPrice = await paymentPage.getTotalPrice();
    await paymentPage.placeOrder();

    const message = await checkoutPage.getCheckoutMessage();
    
    const orderMessage = await checkoutPage.getOrderMessage();
    const orderNumber = await checkoutPage.getOrderNumber();

    expect(message?.trim()).toEqual("Thank you for your purchase!");
    expect(orderMessage?.trim()).toEqual(`Your order number is: ${orderNumber}.`);

    await checkoutPage.backToHome();

    await header.navigateToMyAccount();

    await accountPage.switchToMyOrdersTab()

    const doesOrderExist = await accountPage.isOrderRegistered(orderNumber, totalPrice);

    expect(doesOrderExist).toBeTruthy();

});

test("Can empty the cart", async ({  page, homePage, productPage, cart }) => {
    
    await homePage.navigateToRandomProduct();
    
    await productPage.selectSizeAndColorIfExist();

    let pageTitle = await productPage.getProductName();

    await productPage.addToCartButton();

    let displayedMessage = await productPage.getDisplayedMessageTextContent();

    expect(displayedMessage?.trim()).toContain(`You added ${pageTitle} to your shopping cart.`);

    await productPage.openCart();

    await cart.emptyCart();

});



