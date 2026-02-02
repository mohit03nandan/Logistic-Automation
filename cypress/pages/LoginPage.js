const envMap = require('../fixtures/env/envMap.json');
class LoginPage {
  elements = {
  emailInput: () => cy.xpath("//input[@id='email']"),
  passwordInput: () => cy.xpath("//input[@placeholder='Password']"),
  SignUp: () => cy.xpath("//button[normalize-space()='Continue with Email']"),
  loginBtn: () => cy.xpath("//button[@type='submit' and normalize-space()='Login' or normalize-space()='Sign In' or normalize-space()='Submit']")
}

  visit() {
    const url = envMap.stagingweb;
    cy.visit(url + 'sign-in', { failOnStatusCode: false });
  }

  login(email, password) {
    this.elements.emailInput().type(email)
    this.elements.SignUp().click()
    this.elements.passwordInput().type(password)
    this.elements.loginBtn().click()
  }
}

export default new LoginPage()