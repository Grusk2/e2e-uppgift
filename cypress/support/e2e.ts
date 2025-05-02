// cypress/support/e2e.ts

// Import commands.js using ES2015 syntax:
import './commands';

// Runs before every test file
beforeEach(() => {
  // Optional: Reset the test DB if you have an endpoint for it
  cy.request('POST', 'http://localhost:3000/api/test/reset'); // you must implement this in your backend!
});

export {}; // Prevents TypeScript isolatedModules error
