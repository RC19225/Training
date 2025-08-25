import { expect, test  } from "@playwright/test"

test('sign in button available', async ({page})=>{

    await page.goto('https://binaryville.com/account');
    const signInButton = page.getByRole('button', { name: 'Sign In' });
    await expect(signInButton).toBeVisible();
})