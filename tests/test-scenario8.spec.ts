import { test, expect } from "../fixtures/shared.fixture";
import HomePage from "../pages/HomePage/HomePage";
import ProductPage from "../pages/ProductPage/ProductPage";
import Cart from "../pages/Cart/Cart";


    test("Can empty the cart", 
        async ({ 
            page,
            homePage,
            productPage,
            cart
        }) => {
        
        await homePage.navigateToRandomProduct();
        
        await productPage.selectSizeAndColorIfExist();
        
        await productPage.addToCartButton();

        // await page.goBack();

        // await homePage.navigateToRandomProduct();
        
        // await productPage.selectSizeAndColorIfExist();
        
        // await productPage.addToCartButton();

        await productPage.openCart();

        await cart.emptyCart();

    });

