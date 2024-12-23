import { Page } from "@playwright/test";

export default class BasePage {
    protected page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async goToWebsite(){
        await this.page.goto(process.env.BASE_URL!.toString());
        await this.page.waitForLoadState();
    }
    
    async isLoggedIn(): Promise<boolean>{
        return this.page.locator(".panel .logged-in").isVisible();
    } 
}