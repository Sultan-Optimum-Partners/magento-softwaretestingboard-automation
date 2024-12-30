import { Page } from "@playwright/test";

export default class BasePage {
    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }
    
    async isLoggedIn(): Promise<boolean>{
        return this.page.locator(".panel .logged-in").isVisible();
    } 

    async goBack(): Promise<void>{
        await this.page.goBack({waitUntil: "domcontentloaded"});
    }

    async navigateToHome(): Promise<void> {
        await this.page.locator(".header> .logo").click();
    }
}