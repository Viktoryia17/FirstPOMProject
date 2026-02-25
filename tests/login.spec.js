import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";
import { USERNAME, USERPASSWORD } from "../config/config";

test("correct login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    process.env.PLAYWRIGHT_USERNAME,
    process.env.PLAYWRIGHT_USERPASSWORD,
  );
  const title = await loginPage.getHeaddertext();
  expect(title).toEqual("Каталог товаров");
});

test("incorrect login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    process.env.PLAYWRIGHT_USERNAME + "abc",
    process.env.PLAYWRIGHT_USERPASSWORD + 321,
  );
  const ErrorText = await loginPage.getErrorText();
  expect(ErrorText).toBeVisible();
});
