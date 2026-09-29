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
  });

  it('should logout successfully', () => {
    cy.contains('dicodingsnh', { timeout: 10000 }).click();

    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');
  });
});