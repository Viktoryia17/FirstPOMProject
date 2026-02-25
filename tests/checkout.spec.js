import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/login-page";

test("add and remove", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    process.env.PLAYWRIGHT_USERNAME,
    process.env.PLAYWRIGHT_USERPASSWORD,
  );
  const title = await loginPage.getHeaddertext();
  expect(title).toEqual("Каталог товаров");

  await page
    .getByRole("link", { name: "iPhone 15 Pro iPhone 15 Pro" })
    .getByRole("button")
    .click();
  await page.getByRole("link", { name: "Корзина" }).click();
  await expect(
    page.getByRole("heading", { name: "iPhone 15 Pro" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "Оформить заказ" }).click();
  const title1 = await loginPage.getHeaddertext();
  expect(title1).toEqual("Каталог товаров");

  await expect(page.getByText("Заказ успешно создан!")).toBeVisible();
});
