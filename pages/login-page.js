export class LoginPage {
  #emailRole = "Email";
  #paswordRole = "Пароль";
  #loginButtonRole = "Войти"
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto(process.env.BASE_URL + "/login");
  }

  async login(username, password) {
    await this.page.getByRole('textbox', { name: this.#emailRole }).fill(username);
    await this.page.getByRole('textbox', { name: this.#paswordRole}).fill(password);
    await this.page.getByRole('button', { name: this.#loginButtonRole }).click();
  }
  async getHeader(){
    return await page.getByRole('heading', { name: 'Каталог товаров' }).innerText();
  } 

  async getErrorMessage() {
    return await this. page.getByText('Неверный email или пароль');

  }
  
}