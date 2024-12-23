import { test, expect } from "@playwright/test";
import HomePage from "../pages/Home/HomePage";

test.describe("Test Scenario 1", () => {

    let homePage: HomePage;

    test.beforeEach(async({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToWebsite()
    })

    test("User is able to navigate to homepage and view products without authentication", async ({ page }) => {
        const isLoggedIn = await homePage.isLoggedIn();
        const isProductsVisible = await homePage.isProductsVisible();
        expect(isLoggedIn).toBeFalsy();
        expect(isProductsVisible).toBeTruthy();
    })
});