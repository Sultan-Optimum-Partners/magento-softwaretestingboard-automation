import { test, expect } from "../fixtures/shared.fixture";

    test("Verify all search result should contain the search term - (search for “backpack”)", async ({ page, homePage, searchResult }) => {
        await homePage.searchSpecificProduct("backpack");
        await searchResult.verifyAllSearchResultContains("backpack")
    });

