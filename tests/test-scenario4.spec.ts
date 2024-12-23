import { test, expect } from "@playwright/test";
import HomePage from "../pages/Home/HomePage";
import SearchResultPage from "../pages/SearchResult/SearchResultPage";

test.describe("Test Scenario 4", () => {

    let homePage: HomePage;
    let searchResultPage: SearchResultPage;

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page);
        searchResultPage = new SearchResultPage(page); 
        await homePage.goToWebsite();
    });

    test("Verify all search result should contain the search term - (search for “backpack”)", async ({ page }) => {
        await homePage.searchForProduct("backpack");
        await searchResultPage.verifyAllSearchResultContains("backpack")
    });

})