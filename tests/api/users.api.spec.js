import { test, expect } from "@playwright/test";
import { registeruser } from "../../utils/data.mjs";

test("user can be created with API", async ({ request }) => {
  const useremail = `akucevicvoktoria${Math.random()}@gmail.com`;
  const username = `Vika${Math.random()}`;
  const password = "Vika789!";

  const name = "Victoryia";
  const lastname = "Yakutsevich";
  const phoneNumber = "+987654321";

  const response = await registeruser({
    request,
    name,
    lastname,
    phoneNumber,
    useremail,
    username,
    password,
  });

  expect(response.ok()).toBeTruthy();
});