import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login-page";

test("correct login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    process.env.PLAYWRIGHT_USERNAME,
    process.env.PLAYWRIGHT_USERPASSWORD,
  );

  const title = await loginPage.getHeader();
  expect(title).toEqual("Каталог товаров");

})

test("incorrect login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();
  await loginPage.login(
    process.env.PLAYWRIGHT_USERNAME + "abc",
    process.env.PLAYWRIGHT_USERPASSWORD + 321,
  );

  const errorMessage = await loginPage.getErrorMessage();

  // проверка что ошибка появилась
  await expect(errorMessage).toBeVisible();

  // проверка текста ошибки
  await expect(errorMessage).toContainText("Неверный email или пароль");
});