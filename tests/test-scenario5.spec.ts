import { test, expect } from "../fixtures/shared.fixture";

    test("Can navigate to a product page, verify that the correct page is opened", async ({ page, homePage, productPage }) => {
        const productName = await homePage.navigateToRandomProduct();
        const pageTitle = await productPage.getProductName();
        expect(productName).toEqual(pageTitle);

    });
