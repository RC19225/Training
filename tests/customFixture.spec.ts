import { test as base, expect } from "@playwright/test";

// Minimal - just declare fixture names, let TypeScript infer the actual types
const test = base.extend<{
    testData: any;
    authenticatedUser: any;
}>({
    testData: async ({ }, use) => {
        const data = { email: 'test@example.com', password: 'pass123' };
        await use(data);
    },
    authenticatedUser: [async ({page, testData }, use) => {
        await page.goto('https://binaryville.com/account');

        const emailInput = page.getByRole('textbox', { name: /email/i });
        await emailInput.fill(testData.email);

        const passwordInput = page.getByRole('textbox', { name: /password/i });
        await passwordInput.fill(testData.password);
        
        const signInButton = page.getByRole('button', { name: 'Sign in' });
        await signInButton.click();

        await use(page);
    },{ auto: true }]
});

test("Should log in with test data", async ({ page, testData }) => {
    
    await expect(page.url()).toContain(testData.password);
});