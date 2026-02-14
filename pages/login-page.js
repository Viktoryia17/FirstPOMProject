export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("http://localhost:5173/login");
  }

  async login(username, password) {
    await this.page.locator("[name='email']").fill(username);
    await this.page.locator("[name='password']").fill(password);
    await this.page.locator("[type='submit']").click();
  }
  async getHeaddertext(){
    return await this.page.locator('h1.tracking-tight').innerText();
  } 
  
}