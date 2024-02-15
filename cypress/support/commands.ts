/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
  }
}

Cypress.Commands.add('login', (username: string, password) => {
  cy.visit('http://localhost:3000/en/login');
  cy.get('input[name="userName"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('form').submit();
});
