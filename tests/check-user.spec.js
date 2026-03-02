/*import { LoginPage } from "../pages/login-page";
import { RegistrationPage } from "../pages/registration";
import { test, expect } from "@playwright/test";

const useremail = "akucevicvoktoria" + Math.random() + "@gmail.com";
const username = "Vika" + Math.random();
const password = "Vika789!";

const name = "Victoryia";
const lastname = "Yakutsevich";
const phoneNumber = "+987654321";

test.beforeEach(async ({ page }) => {
  const regisstrationPage = new RegistrationPage(page);
  await regisstrationPage.open();
  await regisstrationPage.registration(
    name,
    lastname,
    useremail,
    username,
    phoneNumber,
    password,
  );
  await page.waitForURL("http://localhost:5173/login");
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(useremail, password);
  const title = await loginPage.getHeaddertext();
  expect(title).toEqual("Каталог товаров");
});
test("registrstion", async ({ page }) => {
  await page.goto("http://localhost:5173/profile");

  await expect(page.getByLabel("Email")).toHaveValue(useremail);
  await expect(page.getByLabel("Имя")).toHaveValue(name);
  await expect(page.getByLabel("Фамилия")).toHaveValue(lastname);
  await expect(page.getByLabel("Username")).toHaveValue(username);
  await expect(page.getByLabel("Телефон")).toHaveValue(phoneNumber);
});

test("update", async ({ page }) => {
  await page.goto("http://localhost:5173/profile");

  await expect(page.getByLabel("Email")).toHaveValue(useremail);
  await expect(page.getByLabel("Имя")).toHaveValue(name);
  await expect(page.getByLabel("Фамилия")).toHaveValue(lastname);
  await expect(page.getByLabel("Username")).toHaveValue(username);
  await expect(page.getByLabel("Телефон")).toHaveValue(phoneNumber);

  await page.getByLabel("Email").fill(useremail + "1");
  await page.getByLabel("Имя").fill(name + "1");
  await page.getByLabel("Фамилия").fill(lastname + "1");
  await page.getByLabel("Username").fill(username + "1");
  await page.getByLabel("Телефон").fill(phoneNumber + "1");

  await page.getByRole("button", { name: "Сохранить изменения" }).click();
});*/

import { LoginPage } from "../pages/login-page";
import { RegistrationPage } from "../pages/registration";
import { test, expect } from "@playwright/test";

const useremail = "akucevicvoktoria" + Math.random() + "@gmail.com";
const username = "Vika" + Math.random();
const password = "Vika789!";

const name = "Victoryia";
const lastname = "Yakutsevich";
const phoneNumber = "+987654321";
//сoздание пользователя через API
test.beforeAll(async ({request}) => {
  await request.post(
    "http://localhost:5173/api/auth/register",
    {
      data: {
        firstname: name,
        lastname: lastname,
        phoneNumber: phoneNumber,
        email: useremail,
        username: username,
        password: password,
        role: "USER",
      },
    },
  );
});

test.beforeEach(async ({page}) => {
 // логин через UI
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    useremail,
    password,
  );
  const title = await loginPage.getHeader();
  expect(title).toEqual("Каталог товаров");
})

test("registrstion", async ({ request, page }) => {
  await page.goto("http://localhost:5173/profile");

  await expect(page.getByLabel("Email")).toHaveValue(useremail);
  await expect(page.getByLabel("Имя")).toHaveValue(name);
  await expect(page.getByLabel("Фамилия")).toHaveValue(lastname);
  await expect(page.getByLabel("Username")).toHaveValue(username);
  await expect(page.getByLabel("Телефон")).toHaveValue(phoneNumber);
});

test("update", async ({ page }) => {
  await page.goto("http://localhost:5173/profile");

  await expect(page.getByLabel("Email")).toHaveValue(useremail);
  await expect(page.getByLabel("Имя")).toHaveValue(name);
  await expect(page.getByLabel("Фамилия")).toHaveValue(lastname);
  await expect(page.getByLabel("Username")).toHaveValue(username);
  await expect(page.getByLabel("Телефон")).toHaveValue(phoneNumber);

  await page.getByLabel("Email").fill(useremail + "1");
  await page.getByLabel("Имя").fill(name + "1");
  await page.getByLabel("Фамилия").fill(lastname + "1");
  await page.getByLabel("Username").fill(username + "1");
  await page.getByLabel("Телефон").fill(phoneNumber + "1");

  await page.getByRole("button", { name: "Сохранить изменения" }).click();
});
