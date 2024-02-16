describe('Update Todo', () => {
  it('updates a todo on the /dashboard page', () => {
    cy.login('admin', 'admin');
    cy.addTodo(Cypress.env('todo_text'), Cypress.env('todo_dueDate'));
    cy.get(
      '[data-testid="todoList"] [data-testid="todoListItem"] [data-testid="editTodoButton"]'
    )
      .last()
      .click();
    cy.get('input[name="text"]').clear().type(Cypress.env('updated_todo_text'));
    cy.get('input[name="deadline"]')
      .clear()
      .type(Cypress.env('updated_todo_dueDate'));
    cy.get('form').submit();
    cy.get('[data-testid="todoList"] [data-testid="todoListItem"]')
      .last()
      .should(
        'have.text',
        `${Cypress.env('updated_todo_text')}Due to: ${Cypress.env(
          'updated_todo_dueDate'
        )}`
      );
    cy.deleteTodo(
      Cypress.env('updated_todo_text'),
      Cypress.env('updated_todo_dueDate')
    );
  });
});
