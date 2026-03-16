

import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";

test.beforeEach(async ({ page }) => {
  console.log("🔹 Test setup: login user");

  const loginPage = new LoginPage(page);

  console.log("Opening login page");
  await loginPage.open();

  console.log("Logging in with environment credentials");
  await loginPage.login(
    process.env.PLAYWRIGHT_USERNAME,
    process.env.PLAYWRIGHT_USERPASSWORD,
  );

  console.log("Verifying page header after login");

  const title = await loginPage.getHeader();
  console.log("Page header:", title);

  expect(title).toEqual("Каталог товаров");

  console.log("User successfully logged in");
});

test("Add product to cart and remove it", async ({ page }) => {
  console.log("Test started: Add product to cart and remove it");

  console.log("Adding product to cart");
  await page
    .getByRole("link", { name: "iPhone 15 Pro iPhone 15 Pro" })
    .getByRole("button")
    .click();

  console.log("Opening cart page");
  await page.getByRole("link", { name: "Корзина" }).click();

  console.log("Verifying product in cart");
  await expect(
    page.getByRole("heading", { name: "iPhone 15 Pro" }),
  ).toBeVisible();

  console.log("Removing product from cart");
  await page.getByRole("button", { name: "Удалить" }).click();

  console.log("Verifying cart is empty");
  await expect(page.getByText("Ваша корзина пуста")).toBeVisible();

  console.log("Test finished: product added and removed successfully");
});
