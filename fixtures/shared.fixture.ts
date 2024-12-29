import { test as base } from "@playwright/test";
import AccountPage from "../pages/AccountPage/AccountPage";
import Cart from "../pages/Cart/Cart";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import CreateAccount from "../pages/CreateAccountPage/CreateAccountPage";
import Header from "../pages/Header/Header";
import OrdersAndReturnsPage from "../pages/OrdersAndReturnsPage/OrdersAndReturnsPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import SearchResult from "../pages/SearchResultPage/SearchResultPage";
import ShippingPage from "../pages/ShippingPage/ShippingPage";
import SignIn from "../pages/SignInPage/SignInPage";
import HomePage from "../pages/HomePage/HomePage";

type testFixtures = {
    accountPage: AccountPage,
    cart: Cart,
    checkoutPage: CheckoutPage,
    createAccount: CreateAccount,
    header: Header,
    homePage: HomePage,
    ordersAndReturnsPage: OrdersAndReturnsPage,
    paymentPage: PaymentPage,
    productPage: ProductPage,
    searchResult: SearchResult,
    shippingPage: ShippingPage,
    signInPage: SignIn, 
 };

export const test = base.extend<testFixtures>({
    page: async({browser}, use) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://magento.softwaretestingboard.com/", { waitUntil: "domcontentloaded" });
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
    createAccount: async({page}, use) => {
        const createAccount = new CreateAccount(page);
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
    searchResult: async({page}, use) => {
        const searchResult = new SearchResult(page);
        await use(searchResult);
    },
    shippingPage: async({page}, use) => {
        const shippingPage = new ShippingPage(page);
        await use(shippingPage);
    },
    signInPage: async({page}, use) => {
        const signIn = new SignIn(page);
        await use(signIn);
    },
});


export { expect } from "@playwright/test"