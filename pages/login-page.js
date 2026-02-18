export class LoginPage {
  #emailSelector = "[name='email']";
  #paswordSelector = "[name='password']";
  #loginButtonSelector = "[type='submit']"
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("http://localhost:5173/login");
  }

  async login(username, password) {
    await this.page.locator( this.#emailSelector ).fill(username);
    await this.page.locator( this.#paswordSelector).fill(password);
    await this.page.locator(this.#loginButtonSelector).click();
  }
  async getHeaddertext(){
    return await this.page.locator('h1.tracking-tight').innerText();
  } 

  async getErrorText() {
    return await this. page.getByText('Неверный email или пароль');

  }
  
}