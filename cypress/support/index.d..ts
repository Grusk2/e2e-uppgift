/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
      waitUntil(
        checkFunction: () => Chainable<boolean>,
        options?: {
          errorMsg?: string;
          timeout?: number;
          interval?: number;
        }
      ): Chainable;
    }
  }
  