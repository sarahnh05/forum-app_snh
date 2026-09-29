/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email already exist
 *   - should register homepage when successfuly registered
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display register page correctly', () => {
    cy.get('input[placeholder="Name"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
 
  });

  it('should display alert when name is empty', () => {
    cy.get('button').contains(/^Register$/).click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.get('input[placeholder="Name"]').type('Dicoding');

    cy.get('button').contains(/^Register$/).click();
 
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    cy.get('input[placeholder="Name"]').type('Dicoding');
    cy.get('input[placeholder="Email"]').type('dicodingsnh@dicodingmail.com');

    cy.get('button').contains(/^Register$/).click();
 
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email already exist', () => {
    cy.get('input[placeholder="Name"]').type('Dicoding');
    cy.get('input[placeholder="Email"]').type('dicodingsnh@dicodingmail.com');
    cy.get('input[placeholder="Password"]').type('dicoding');

    cy.get('button').contains(/^Register$/).click();
 
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should register homepage when successfuly registered', () => {
    cy.get('input[placeholder="Name"]').type('Dicoding');
    cy.get('input[placeholder="Email"]').type(`dicoding_${Date.now()}@gmail.com`);
    cy.get('input[placeholder="Password"]').type('dicoding');

    cy.get('button').contains(/^Register$/).click();
 
    cy.get('nav').contains('Login').should('be.visible');
  });
});