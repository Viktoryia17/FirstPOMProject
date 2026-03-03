import { test} from '@playwright/test';


import { RegistrationPage } from '../pages/registration';


const user = {
    firstname: 'Victoryia', 
    lastname: 'Yakutsevich', 
    email: 'akucevicvoktoria' + Math.random() + '@gmail.com',
    username: 'Vika' + Math.random(), 
    phonnumber: '+987654321', 
    password: 'Vika789!'
}

test('registrstion', async ({ page }) => {
const regisstrationPage = new RegistrationPage(page);

await regisstrationPage.open();

await regisstrationPage.registerUser(user);
await page.waitForURL('http://localhost:5173/login');
});
