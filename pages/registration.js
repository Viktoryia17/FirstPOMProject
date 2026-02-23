export class RegistrationPage {
 #firstnameSelector = "[name='firstname']";
  #lastnameSelector = "[name='lastname']";
  #emailSelector = "[name='email']";
   #usernameSelector = "[name='username']";
    #phonenumberSelector = "[name='phoneNumber']";
  #paswordSelector = "[name='password']";
  #registrationButtonSelector = "[type='submit']"
  
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("http://localhost:5173/register");
  }

  async registration(firstname, lastname, email,username, phonnumber, password) {
    await this.page.locator( this.#firstnameSelector ).fill(firstname);
    await this.page.locator( this.#lastnameSelector ).fill(lastname);
    await this.page.locator( this.#emailSelector ).fill(email);
     await this.page.locator( this.#usernameSelector ).fill(username);
      await this.page.locator( this.#phonenumberSelector ).fill(phonnumber);
      await this.page.locator( this.#paswordSelector).fill(password);
    await this.page.locator(this.#registrationButtonSelector).click();
  }

  } 

 

  
  
