import { test, expect } from "@playwright/test";
import HomePage from "../pages/Home/HomePage";

test.describe("Test Scenario 6", () => {

    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToWebsite();
    });

    test("User can add a product to Cart", async ({ page }) => {
        const randomProduct = await homePage.getRandomProduct();
        await randomProduct.scrollIntoViewIfNeeded();
        const randomProductLink = randomProduct.locator('.product-item-details .product-item-name a');
        await randomProductLink.click();
        const pageTitle = await page.locator("span[data-ui-id='page-title-wrapper']").textContent();
        
        const options = await page.locator("#product-options-wrapper .swatch-attribute div:first-child").all();

        for(let option of options){
            await option.click();
        }        

        await page.getByRole('button', { name: 'Add to Cart' }).click();

        const successMessageLocator = page.locator("div[data-ui-id='message-success']");
        const errorMessageLocator = page.locator("div[data-ui-id='message-error']");
        
        if (await successMessageLocator.isVisible()) {
            const successMessage = await successMessageLocator.textContent();
            expect(successMessage?.trim()).toContain(`You added ${pageTitle} to your shopping cart.`);
        } else if (await errorMessageLocator.isVisible()) {
            const errorMessage = await errorMessageLocator.textContent();
            expect(errorMessage?.trim()).toContain("The requested qty is not available");
        }

    });

});
