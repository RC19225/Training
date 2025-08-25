import { test, expect } from '../page-objects/fixtures';



test('should login using pom', async ({ page, loginPage }) => {
    await page.goto('https://binaryville.com/account/');
    await loginPage.login("test@example.com",'pass123');
    // await loginPage.emailLocator.fill('test@example.com');
    // await loginPage.passwordLocator.fill('pass123');
    // await loginPage.signInButtonLocator.click();
    expect(page.url()).toContain('pass123');
});

test('Get /products',async ({ request }) => {
    const apiURL= "https://api.practicesoftwaretesting.com"
  const response = await request.get(apiURL+'/products');
  expect(response.status()).toBe(200);
});
