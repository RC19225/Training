import {page} from '../browserSetup.js';
import { LoginPage } from '../page-objects/login-page.pom.js';
import { expect } from '@playwright/test';
import {Given , When, Then} from '@cucumber/cucumber';

let loginPage : LoginPage;

Given("the user is on the login page", async () => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    // await page.goto("http://binaryville.com/account");
});

When("the user enter valid credentials", async () => {
    await loginPage.emailLocator.fill("test@example.com");
    await loginPage.passwordLocator.fill("pass123");

});

Then("the user should see their email and password in the URL", async () => {
    await loginPage.signInButtonLocator.click();
    await expect(page).toHaveURL(/test%40example.com/);
    await expect(page).toHaveURL(/pass123/);
});
