import {test as base, expect} from "@playwright/test";
import { LoginPage } from "./login-page.pom";

const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    }
});

export {expect,test}