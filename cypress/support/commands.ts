/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(username: string, password: string): Chainable<void>;
    addTodo(text: string, dueDate: string): Chainable<void>;
    deleteTodo(text: string, dueDate: string): Chainable<void>;
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('http://localhost:3000/en/login');
  cy.get('input[name="userName"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('form').submit();
});

Cypress.Commands.add('addTodo', (text: string, dueDate: string) => {
  cy.url().should('include', '/dashboard');
  cy.get('[data-testid="addTodoButton"]').click();
  cy.get('input[name="text"]').type(text);
  cy.get('input[name="deadline"]').type(dueDate);
  cy.get('form').submit();
  cy.get('[data-testid="todoList"] [data-testid="todoListItem"]')
    .last()
    .should('have.text', `${text}Due to: ${dueDate}`);
});

Cypress.Commands.add('deleteTodo', (text: string, dueDate: string) => {
  cy.get(
    '[data-testid="todoList"] [data-testid="todoListItem"] [data-testid="deleteTodoButton"]'
  )
    .last()
    .click();
  cy.get('form').submit();
  cy.get('[data-testid="todoList"] [data-testid="todoListItem"]')
    .last()
    .should('not.have.text', `${text}Due to: ${dueDate}`);
});
