

import { test } from '@playwright/test';
import { RegistrationPage } from '../../pages/registration';

const user = {
  firstname: 'Victoryia',
  lastname: 'Yakutsevich',
  email: 'akucevicvoktoria' + Math.random() + '@gmail.com',
  username: 'Vika' + Math.random(),
  phonnumber: '+987654321',
  password: 'Vika789!'
};

test('registration', async ({ page }) => {
  console.log('Test started: user registration');

  const registrationPage = new RegistrationPage(page);

  console.log('Opening registration page');
  await registrationPage.open();

  console.log('Registering new user');
  console.log('First name:', user.firstname);
  console.log('Last name:', user.lastname);
  console.log('Email:', user.email);
  console.log('Username:', user.username);

  await registrationPage.registerUser(user);

  console.log('Waiting for redirect to login page');
  await page.waitForURL('http://localhost:5173/login');

  console.log('Registration completed successfully. User redirected to login page');
});
