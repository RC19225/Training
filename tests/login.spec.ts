import {test as setup,  expect} from "@playwright/test";
import loginData from '../data/loginData.json' with { type: 'json' };

loginData.forEach(({email,password}, index)=>{
  setup(`user can login with valid credentials - ${email}`, async ({page})=>{
    await page.goto('https://binaryville.com/account');

    await page.getByRole('textbox', { name: /email/i }).fill(email);
    await page.getByRole('textbox', { name: /password/i }).fill(password);
    await page.getByRole('button', { name: 'Sign in' }).click();

    await expect(page).toHaveURL(new RegExp(password));
  })

})

// setup('test', async ({ page }) => {
//   const baseURL= "https://practicesoftwaretesting.com/"
//   await page.goto(baseURL);
//   await page.locator('[data-test="nav-sign-in"]').click();
//   await page.locator('[data-test="email"]').click();
//   await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
//   await page.locator('[data-test="password"]').click();
//   await page.locator('[data-test="password"]').fill('welcome01');
//   await page.locator('[data-test="password"]').press('Enter');
//   await page.waitForURL(baseURL+"account");
// //   await page.locator('[data-test="login-submit"]').click();
// //   await page.locator('[data-test="nav-categories"]').click();
//   await page.locator('[data-test="nav-home"]').click();
//   await expect(page.getByText('Jane Doe')).toBeVisible();
//   await page.getByRole('button', { name: 'Page-2' }).click();
//   await page.getByText('ForgeFlex Tools').click();
//   await page.getByRole('heading', { name: 'Sort' }).click();
  
// });

