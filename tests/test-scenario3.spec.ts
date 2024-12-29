import { test, expect } from "../fixtures/shared.fixture";


    test("User can search on a specific product", async ({ page, homePage }) => {
        await homePage.searchSpecificProduct("bag");
    });

