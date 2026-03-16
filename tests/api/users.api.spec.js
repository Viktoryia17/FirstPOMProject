

import { test, expect } from "@playwright/test";
import { registeruser } from "../../utils/data.mjs";

test("User can be created with API", async ({ request }) => {
  console.log("Test started: user can be created with API");

  const useremail = `akucevicvoktoria${Math.random()}@gmail.com`;
  const username = `Vika${Math.random()}`;
  const password = "Vika789!";

  const name = "Victoryia";
  const lastname = "Yakutsevich";
  const phoneNumber = "+987654321";

  console.log("Generated test data:");
  console.log("Email:", useremail);
  console.log("Username:", username);

  console.log("Sending request to create user...");

  const response = await registeruser({
    request,
    name,
    lastname,
    phoneNumber,
    useremail,
    username,
    password,
  });

  console.log("Response received");
  console.log("Status:", response.status());
  console.log("Status text:", response.statusText());

  const body = await response.text();
  console.log("Response body:", body);

  console.log(" Checking response...");

  expect(response.ok()).toBeTruthy();

  console.log("Test finished successfully");
});