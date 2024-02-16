describe('Login Page', () => {
  it('logs the user in and redirects to /dashboard', () => {
    cy.login('admin', 'admin');
    cy.url().should('include', '/dashboard');
  });
});
