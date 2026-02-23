import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { USERNAME, USERPASSWORD } from '../config/config';

test('log-out', async ({ page }) => {
 

  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(process.env.PLAYWRIGHT_USERNAME, process.env.PLAYWRIGHT_USERPASSWORD);
  const title = await loginPage.getHeaddertext();
  expect(title).toEqual('Каталог товаров');

    await page.getByRole('button', { name: 'U user1' }).click();
 await page.getByRole('menuitem', { name: 'Выйти' }).click();
await page.waitForURL('http://localhost:5173/login');
});

