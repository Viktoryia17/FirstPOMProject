

import { LoginPage } from "../../pages/login-page";
import { test, expect } from "@playwright/test";
import { registeruser } from "../../utils/data.mjs";

let useremail;
let username;
let password;

const name = "Victoryia";
const lastname = "Yakutsevich";
const phoneNumber = "+987654321";

const profileUpdates = [
  { suffix: "1" },
  { suffix: "2" },
  { suffix: "QA" },
];

test.beforeAll(async ({ request }) => {
  console.log("Preparing test data before running tests");

  useremail = `akucevicvoktoria${Math.random()}@gmail.com`;
  username = `Vika${Math.random()}`;
  password = "Vika789!";

  console.log("Creating user via API");
  console.log("Email:", useremail);
  console.log("Username:", username);

  await registeruser({
    request,
    name,
    lastname,
    phoneNumber,
    useremail,
    username,
    password,
  });

  console.log("User successfully created");
});

test.beforeEach(async ({ page }) => {
  console.log("Test setup: user login");

  const loginPage = new LoginPage(page);

  console.log("Opening login page");
  await loginPage.open();

  console.log("Logging in with created user");
  await loginPage.login(useremail, password);

  const title = await loginPage.getHeader();
  console.log("Page header after login:", title);

  expect(title).toEqual("Каталог товаров");

  console.log("User successfully logged in");
});

test("Profile data is displayed correctly", async ({ page }) => {
  console.log("Test: profile data is displayed correctly");

  console.log("Navigating to profile page");
  await page.goto("http://localhost:5173/profile");

  console.log("Verifying profile data");

  await expect(page.getByLabel("Email")).toHaveValue(useremail);
  await expect(page.getByLabel("Имя")).toHaveValue(name);
  await expect(page.getByLabel("Фамилия")).toHaveValue(lastname);
  await expect(page.getByLabel("Username")).toHaveValue(username);
  await expect(page.getByLabel("Телефон")).toHaveValue(phoneNumber);

  console.log("Profile data is displayed correctly");
});


profileUpdates.forEach((data) => {
  test(`User can update profile with suffix ${data.suffix}`, async ({ page }) => {

    console.log(`Test: user updates profile with suffix ${data.suffix}`);

    console.log("Navigating to profile page");
    await page.goto("http://localhost:5173/profile");

    console.log("Updating profile data");

    await page.getByLabel("Email").fill(useremail + data.suffix);
    await page.getByLabel("Имя").fill(name + data.suffix);
    await page.getByLabel("Фамилия").fill(lastname + data.suffix);
    await page.getByLabel("Username").fill(username + data.suffix);
    await page.getByLabel("Телефон").fill(phoneNumber + data.suffix);

    console.log("Saving profile changes");
    await page.getByRole("button", { name: "Сохранить изменения" }).click();

    console.log("Verifying updated profile data");

    await expect(page.getByLabel("Email")).toHaveValue(useremail + data.suffix);
    await expect(page.getByLabel("Имя")).toHaveValue(name + data.suffix);
    await expect(page.getByLabel("Фамилия")).toHaveValue(lastname + data.suffix);
    await expect(page.getByLabel("Username")).toHaveValue(username + data.suffix);
    await expect(page.getByLabel("Телефон")).toHaveValue(phoneNumber + data.suffix);

    console.log(`Profile data updated successfully with suffix ${data.suffix}`);

  });
});