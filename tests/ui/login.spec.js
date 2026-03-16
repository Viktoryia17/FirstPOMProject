

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";

test("correct login", async ({ page }) => {
  console.log("Test started: correct login");

  const loginPage = new LoginPage(page);

  console.log("Opening login page");
  await loginPage.open();

  console.log("Logging in with valid credentials");
  await loginPage.login(
    process.env.PLAYWRIGHT_USERNAME,
    process.env.PLAYWRIGHT_USERPASSWORD,
  );

  console.log("Verifying successful login");

  const title = await loginPage.getHeader();
  console.log("Page header:", title);

  expect(title).toEqual("Каталог товаров");

  console.log("Login successful, correct page loaded");
});

test("incorrect login", async ({ page }) => {
  console.log("Test started: incorrect login");

  const loginPage = new LoginPage(page);

  console.log("Opening login page");
  await loginPage.open();

  console.log("Attempting login with invalid credentials");

  await loginPage.login(
    process.env.PLAYWRIGHT_USERNAME + "abc",
    process.env.PLAYWRIGHT_USERPASSWORD + 321,
  );

  console.log("Checking error message");

  const errorMessage = await loginPage.getErrorMessage();

  console.log("Verifying that error message is visible");
  await expect(errorMessage).toBeVisible();

  console.log("Verifying error message text");
  await expect(errorMessage).toContainText("Неверный email или пароль");

  console.log("Error message displayed correctly for invalid login");
});