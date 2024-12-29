import { test, expect } from "../fixtures/shared.fixture";
import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import Cart from "../pages/Cart/Cart";
import ShippingPage from "../pages/ShippingPage/ShippingPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import Header from "../pages/Header/Header";
import SignInPage from "../pages/SignInPage/SignInPage";
import AccountPage from "../pages/AccountPage/AccountPage";



    test("Verify that the product is added to the cart “checkout/cart/” — assert for product name", 
        async ({ 
            page,
            homePage,
            productPage,
            cart,
            shippingPage,
            paymentPage,
            checkoutPage,
            header,
            signInPage,
            accountPage,
         }) => {


        // sign in
        await header.navigateToSignIn();
        await signInPage.validSignIn("sultan.raed88@gmail.com", "Pass@123");
        expect(await signInPage.isLoggedIn()).toBeTruthy();
        // end sign in


        // get back to Home
        await signInPage.navigateToHome();
        // end get back to Home

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

