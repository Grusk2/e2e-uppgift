
Cypress.Commands.add('resetDb', () => {
    cy.request('POST', 'http://localhost:3000/api/test/reset');
  });

  declare global {
    namespace Cypress {
      interface Chainable {
        resetDb(): Chainable<void>;
      }
    }
  }
  
  export {};
  