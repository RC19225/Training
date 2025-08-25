import { Locator, Page } from "@playwright/test";

export class LoginPage {
    readonly page : Page;
    public readonly emailLocator: Locator;
    public readonly passwordLocator: Locator;
    public readonly signInButtonLocator: Locator;

    constructor(page: Page) {
        this.page= page;
        this.emailLocator = page.getByRole('textbox', { name: /email/i });
        this.passwordLocator = page.getByRole('textbox', { name: /password/i });
        this.signInButtonLocator = page.getByRole('button', { name: 'Sign in' });
    }
    async goto() {
        await this.page.goto("http://binaryville.com/account");
    }
    async login(email: string, password: string) {
        await this.emailLocator.fill(email);
        await this.passwordLocator.fill(password);
        await this.signInButtonLocator.click();
    }
}