import { test, expect } from "@playwright/test";
import SignInPage from "../pages/SignIn/SignInPage";
import Header from "../pages/Header/Header";
import CreateAccountPage from "../pages/CreateAccount/CreateAccountPage";

test.describe("Test Scenario 2", () => {

    let header: Header;
    let signInPage: SignInPage;
    let createAccountPage: CreateAccountPage;

    test.beforeEach(async ({page}) => {
        signInPage = new SignInPage(page);
        createAccountPage = new CreateAccountPage(page);
        header = new Header(page);
        await signInPage.goToWebsite()
    });

    test("User is able to sign in successfully", async ({ page }) => {
        // await header.navigateToCreateAnAccount();
        // await createAccountPage.fillPersonalInformation("Sultan", "Duwaik");
        // await createAccountPage.fillSignInInformation("sultan.raed88@gmail.com", "Pass@123", "Pass@123");
        // await createAccountPage.clickCreateAnAccount();
        await header.navigateToSignIn();
        await signInPage.validSignIn("sultan.raed88@gmail.com", "Pass@123");
        const isLoggedIn = await signInPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    });

})