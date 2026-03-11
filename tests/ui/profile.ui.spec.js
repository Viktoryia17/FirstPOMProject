import { LoginPage } from "../../pages/login-page";
import { test, expect } from "@playwright/test";
import { registeruser } from "../../utils/data.mjs";

let useremail: string;
let username: string;
let password: string;

const name = "Victoryia";
const lastname = "Yakutsevich";
const phoneNumber = "+987654321";

test.beforeAll(async ({ request }) => {
  useremail = `akucevicvoktoria${Math.random()}@gmail.com`;
  username = `Vika${Math.random()}`;
  password = "Vika789!";

  await registeruser({
    request,
    name,
    lastname,
    phoneNumber,
    useremail,
    username,
    password,
  });
});

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(useremail, password);

  const title = await loginPage.getHeader();
  expect(title).toEqual("Каталог товаров");
});

test("profile data is displayed correctly", async ({ page }) => {
  await page.goto("http://localhost:5173/profile");

  await expect(page.getByLabel("Email")).toHaveValue(useremail);
  await expect(page.getByLabel("Имя")).toHaveValue(name);
  await expect(page.getByLabel("Фамилия")).toHaveValue(lastname);
  await expect(page.getByLabel("Username")).toHaveValue(username);
  await expect(page.getByLabel("Телефон")).toHaveValue(phoneNumber);
});

test("user can update profile", async ({ page }) => {
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

  await expect(page.getByLabel("Email")).toHaveValue(useremail + "1");
  await expect(page.getByLabel("Имя")).toHaveValue(name + "1");
  await expect(page.getByLabel("Фамилия")).toHaveValue(lastname + "1");
  await expect(page.getByLabel("Username")).toHaveValue(username + "1");
  await expect(page.getByLabel("Телефон")).toHaveValue(phoneNumber + "1");
});