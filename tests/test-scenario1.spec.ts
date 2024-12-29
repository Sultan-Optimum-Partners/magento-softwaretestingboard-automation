import { test, expect } from "../fixtures/shared.fixture";
import HomePage from "../pages/HomePage/HomePage";



    test("User is able to navigate to homepage and view products without authentication", async ({ page, homePage }) => {
        const isLoggedIn = await homePage.isLoggedIn();
        const isProductsVisible = await homePage.isProductsVisible();
        expect(isLoggedIn).toBeFalsy();
        expect(isProductsVisible).toBeTruthy();
    })
