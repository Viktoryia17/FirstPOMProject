import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { USERNAME, USERPASSWORD } from '../config/config';
test('first try', async ({ page }) => {
 

    const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(USERNAME, USERPASSWORD);
  const title = await loginPage.getHeaddertext();
  expect(title).toEqual('Каталог товаров');
});