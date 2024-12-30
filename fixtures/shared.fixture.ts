import { test as base } from "@playwright/test";
import AccountPage from "../pages/account.page";
import Cart from "../pages/cart.component";
import CheckoutPage from "../pages/checkout.page";
import CreateAccountPage from "../pages/create-account.page";
import Header from "../pages/header.component";
import HomePage from "../pages/home.page";
import OrdersAndReturnsPage from "../pages/orders-and-returns.page";
import PaymentPage from "../pages/payment.page";
import ProductPage from "../pages/product.page";
import SearchResultPage from "../pages/search-result.page";
import ShippingPage from "../pages/shipping.page";
import SignInPage from "../pages/signin.page";

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
    page: async({page}, use) => {
        await page.goto("/", { waitUntil: "domcontentloaded" });
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