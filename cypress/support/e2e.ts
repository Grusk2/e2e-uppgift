
import './commands';

beforeEach(() => {

  cy.request('POST', 'http://localhost:3000/api/test/reset');
});

export {};
