import { test as base } from "@playwright/test";
import AccountPage from "../pages/account/account.page";
import Cart from "../components/cart/cart.component";
import CheckoutPage from "../pages/checkout/checkout.page";
import CreateAccountPage from "../pages/create-account/create-account.page";
import Header from "../components/header/header.component";
import OrdersAndReturnsPage from "../pages/orders-and-returns/orders-and-returns.page";
import PaymentPage from "../pages/payment/payment.page";
import ProductPage from "../pages/product/product.page";
import SearchResultPage from "../pages/search-result/search-result.page";
import ShippingPage from "../pages/shipping/shipping.page";
import SignInPage from "../pages/signin/signin.page";
import HomePage from "../pages/home/home.page";

type testFixtures = {
    accountPage: AccountPage,
    cart: Cart,
    checkoutPage: CheckoutPage,
    createAccountPage: CreateAccountPage,
    header: Header,
    homePage: HomePage,
    ordersAndReturnsPage: OrdersAndReturnsPage,
    paymentPage: PaymentPage,
    productPage: ProductPage,
    searchResultPage: SearchResultPage,
    shippingPage: ShippingPage,
    signInPage: SignInPage, 
 };

export const test = base.extend<testFixtures>({
    page: async({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(process.env.BASE_URL!, { waitUntil: "domcontentloaded" });
        await use(page);
        },
    accountPage: async({page}, use) => {
        const accountPage = new AccountPage(page);
        await use(accountPage);
    },
    cart: async({page}, use) => {
        const cart = new Cart(page);
        await use(cart);
    },
    checkoutPage: async({page}, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    createAccountPage: async({page}, use) => {
        const createAccount = new CreateAccountPage(page);
        await use(createAccount);
    },
    header: async({page}, use) => {
        const header = new Header(page);
        await use(header);
    },
    homePage: async({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    ordersAndReturnsPage: async({page}, use) => {
        const ordersAndReturnsPage = new OrdersAndReturnsPage(page);
        await use(ordersAndReturnsPage);
    },
    paymentPage: async({page}, use) => {
        const paymentPage = new PaymentPage(page);
        await use(paymentPage);
    },
    productPage: async({page}, use) => {
        const productPage = new ProductPage(page);
        await use(productPage);
    },
    searchResultPage: async({page}, use) => {
        const searchResult = new SearchResultPage(page);
        await use(searchResult);
    },
    shippingPage: async({page}, use) => {
        const shippingPage = new ShippingPage(page);
        await use(shippingPage);
    },
    signInPage: async({page}, use) => {
        const signIn = new SignInPage(page);
        await use(signIn);
    },
});


export { expect } from "@playwright/test"