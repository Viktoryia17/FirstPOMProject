
import { LoginPage } from '../pages/login-page';
import { RegistrationPage } from '../pages/registration';
import { test, expect } from '@playwright/test';

test('registrstion', async ({ page }) => {
const useremail = 'akucevicvoktoria' + Math.random() + '@gmail.com';   
const username = 'Vika' + Math.random();
const password = 'Vika789!'
const regisstrationPage = new RegistrationPage(page);
const name = 'Victoryia';
const lastname = 'Yakutsevich';
const phoneNumber = '+987654321';

await regisstrationPage.open();
await regisstrationPage.registration(name , lastname , useremail, username, phoneNumber , password);
await page.waitForURL('http://localhost:5173/login');
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(useremail, password);
  const title = await loginPage.getHeaddertext();
  expect(title).toEqual('Каталог товаров');

  await page.goto("http://localhost:5173/profile");

  await expect(page.getByLabel("Email"))
  .toHaveValue(useremail);
   await expect(page.getByLabel("Имя"))
  .toHaveValue(name);
  await expect(page.getByLabel("Фамилия"))
  .toHaveValue(lastname );
  await expect(page.getByLabel("Username"))
  .toHaveValue(username);
   await expect(page.getByLabel("Телефон"))
  .toHaveValue(phoneNumber);
});

test('update', async ({ page }) => {
const useremail = 'akucevicvoktoria' + Math.random() + '@gmail.com';   
const username = 'Vika' + Math.random();
const password = 'Vika789!'
const regisstrationPage = new RegistrationPage(page);
const name = 'Victoryia';
const lastname = 'Yakutsevich';
const phoneNumber = '+987654321';

await regisstrationPage.open();
await regisstrationPage.registration(name , lastname , useremail, username, phoneNumber , password);
await page.waitForURL('http://localhost:5173/login');
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(useremail, password);
  const title = await loginPage.getHeaddertext();
  expect(title).toEqual('Каталог товаров');

  await page.goto("http://localhost:5173/profile");

  await expect(page.getByLabel("Email"))
  .toHaveValue(useremail);
   await expect(page.getByLabel("Имя"))
  .toHaveValue(name);
  await expect(page.getByLabel("Фамилия"))
  .toHaveValue(lastname );
  await expect(page.getByLabel("Username"))
  .toHaveValue(username);
   await expect(page.getByLabel("Телефон"))
  .toHaveValue(phoneNumber);

   await page.getByLabel("Email").fill(useremail + '1');
    await page.getByLabel("Имя").fill(name + '1');
    await page.getByLabel("Фамилия").fill(lastname + '1');
    await page.getByLabel("Username").fill(username+ '1');
    await page.getByLabel("Телефон").fill(phoneNumber+ '1');

 await page.getByRole('button', { name: 'Сохранить изменения' }).click();
});



 


