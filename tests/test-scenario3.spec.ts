import { test, expect } from "@playwright/test";
import HomePage from "../pages/Home/HomePage";

test.describe("Test Scenario 3", () => {

    let homePage: HomePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.goToWebsite()
    });

    test("User can search on a specific product", async ({ page }) => {
        await homePage.searchSpecificProduct("bag");
    });

})