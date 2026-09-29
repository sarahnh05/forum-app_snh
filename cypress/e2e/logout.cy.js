/**
 * - Logout spec
 *   - should logout successfully
 */

describe('Logout spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[placeholder*="Email"]').type('dicodingsnh@dicodingmail.com');
    cy.get('input[placeholder*="Password" i]').type('dicoding');
    cy.get('button').contains(/^Login$/).click();

    cy.url().should('eq', 'http://localhost:3000/');
  });

  it('should logout successfully', () => {
    cy.get('button').contains('dicodingsnh').click();

    cy.get('nav').contains('Login', { timeout: 10000 }).should('be.visible');
  });
});