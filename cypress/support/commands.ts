// cypress/support/commands.ts

// Example custom command
Cypress.Commands.add('resetDb', () => {
    cy.request('POST', 'http://localhost:3000/api/test/reset');
  });
  
  // Extend Cypress types (optional, good for TS autocomplete)
  declare global {
    namespace Cypress {
      interface Chainable {
        resetDb(): Chainable<void>;
      }
    }
  }
  
  export {};
  