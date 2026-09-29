/**
 * - Logout spec
 *   - should logout successfully
 */

describe('Logout spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[placeholder*="Email"]').type('dicodingsnh@dicodingmail.com');
    cy.get('input[placeholder*="Password"]').type('dicoding');
    cy.get('button').contains(/^Login$/).click();

    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
    cy.screenshot('after-login');
    cy.get('.button-logout', { timeout: 10000 }).should('be.visible');
  });

  it('should logout successfully', () => {
    cy.get('.button-logout', { timeout: 10000 }).should('be.visible');

    cy.get('nav').contains('Login', { timeout: 10000 }).should('be.visible');
  });
});