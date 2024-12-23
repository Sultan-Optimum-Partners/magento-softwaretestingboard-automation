import { test, expect } from "@playwright/test";
import HomePage from "../pages/Home/HomePage";

test.describe("Test Scenario 8", () => {

    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToWebsite();
    });

    test("Verify that the product is added to the cart “checkout/cart/” — assert for product name", async ({ page }) => {
        



    });

});
