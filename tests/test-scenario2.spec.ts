import { test, expect } from "../fixtures/shared.fixture";

    test("User is able to sign in successfully", async ({ page, header, signInPage, createAccount }) => {
        // await header.navigateToCreateAnAccount();
        // await createAccountPage.fillPersonalInformation("Sultan", "Duwaik");
        // await createAccountPage.fillSignInInformation("sultan.raed88@gmail.com", "Pass@123", "Pass@123");
        // await createAccountPage.clickCreateAnAccount();
        // await page.waitForLoadState("domcontentloaded");


        await header.navigateToSignIn();
        
        await signInPage.validSignIn("sultan.raed88@gmail.com", "Pass@123");
        const isLoggedIn = await signInPage.isLoggedIn();
        expect(isLoggedIn).toBeTruthy();
    });
