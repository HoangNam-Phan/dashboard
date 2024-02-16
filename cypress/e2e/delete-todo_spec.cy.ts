describe('Delete Todo', () => {
  it('deletes a todo on the /dashboard page', () => {
    cy.login('admin', 'admin');
    cy.addTodo(Cypress.env('todo_text'), Cypress.env('todo_dueDate'));
    cy.deleteTodo(Cypress.env('todo_text'), Cypress.env('todo_dueDate'));
  });
});
