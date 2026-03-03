import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL; 

test("correct login API", async ({ request }) => {

  const response = await request.post(
    `${BASE_URL}/api/auth/login`,
    {
      data: {
        email: process.env.PLAYWRIGHT_USERNAME,
        password: process.env.PLAYWRIGHT_USERPASSWORD,
      },
    }
  );

  // проверяем что логин успешный
  expect(response.ok()).toBeTruthy();
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body).toBeTruthy(); 
});

test("incorrect login API", async ({ request }) => {

  const response = await request.post(
    `${BASE_URL}/api/auth/login`,
    {
      data: {
        email: process.env.PLAYWRIGHT_USERNAME + "abc",
        password: process.env.PLAYWRIGHT_USERPASSWORD + "321",
      },
    }
  );

  // проверяем что логин НЕ успешный
  expect(response.ok()).toBeFalsy();
  expect(response.status()).toBeGreaterThanOrEqual(400);
});