import { test, expect } from "@playwright/test";
import HomePage from "../pages/Home/HomePage";

test.describe("Test Scenario 5", () => {

    let homePage: HomePage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        await homePage.goToWebsite();
    });

    test("Can navigate to a product page, verify that the correct page is opened", async ({ page }) => {
        const randomProduct = await homePage.getRandomProduct();
        const randomProductLink = randomProduct.locator('.product-item-details .product-item-name a');
        const productName = (await randomProductLink.textContent())!.trim();
        await randomProductLink.click();
        const pageTitle = await page.locator("span[data-ui-id='page-title-wrapper']").textContent();
        expect(productName).toEqual(pageTitle);

    });

})