import { test} from '@playwright/test';


import { RegistrationPage } from '../pages/registration';

test('registrstion', async ({ page }) => {

const regisstrationPage = new RegistrationPage(page);

await regisstrationPage.open();
await regisstrationPage.registration('Victoryia', 'Yakutsevich', 'akucevicvoktoria' + Math.random() + '@gmail.com', 'Vika' + Math.random(), '+987654321', 'Vika789!');
await page.waitForURL('http://localhost:5173/login');


  
});
