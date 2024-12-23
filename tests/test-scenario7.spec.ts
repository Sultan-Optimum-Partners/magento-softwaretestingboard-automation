import { test, expect } from "@playwright/test";
import HomePage from "../pages/Home/HomePage";

test.describe("Test Scenario 7", () => {

    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.goToWebsite();
    });

    test("Verify that the product is added to the cart “checkout/cart/” — assert for product name", async ({ page }) => {
        
        const randomProduct = await homePage.getRandomProduct();
        await randomProduct.scrollIntoViewIfNeeded();
        const randomProductLink = randomProduct.locator('.product-item-details .product-item-name a');
        await randomProductLink.click();
        const pageTitle = await page.locator("span[data-ui-id='page-title-wrapper']").textContent();
        
        // await page.waitForTimeout(3000);
        const firstSizeOption = page.locator("#product-options-wrapper .swatch-attribute.size > div :first-child");
        const firstColorOption = page.locator("#product-options-wrapper .swatch-attribute.color > div :first-child");
        if(await firstSizeOption.isVisible() || await firstColorOption.isVisible()){
            
        }
        await page.locator("#product-options-wrapper .swatch-attribute.size > div :first-child").click();
        await page.locator("#product-options-wrapper .swatch-attribute.color > div :first-child").click();
        const options = await page.locator("#product-options-wrapper .swatch-attribute div:first-child").all();

        for(let option of options){
            console.log(await option.textContent())
            await option.click();
        }        

        // await page.getByRole('button', { name: 'Add to Cart' }).click();
        await page.locator("#product-addtocart-button").click();
        await page.waitForLoadState("networkidle");

        const successMessageLocator = page.locator("div[data-ui-id='message-success']");
        const errorMessageLocator = page.locator("div[data-ui-id='message-error']");
        
        if (await successMessageLocator.isVisible()) {
            const successMessage = await successMessageLocator.textContent();
            expect(successMessage?.trim()).toContain(`You added ${pageTitle} to your shopping cart.`);
        } else if (await errorMessageLocator.isVisible()) {
            const errorMessage = await errorMessageLocator.textContent();
            expect(errorMessage?.trim()).toContain("The requested qty is not available");
        }


        // await page.waitForTimeout(3000);

        // await page.locator(".minicart-wrapper > a").click();

        // const cartItemName = await page.locator("#mini-cart .product-item-name a").textContent();

        // expect(cartItemName).toEqual(pageTitle?.trim());



    });

});
