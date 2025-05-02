describe("Champion bubble interactions", () => {
  const waitForSaved = () =>
    cy.get('[data-cy="champion-bubble"]', { timeout: 8000 })
      .first()
      .should("have.attr", "data-saved", "true");

  const waitForNotSaved = () =>
    cy.get('[data-cy="champion-bubble"]', { timeout: 8000 })
      .first()
      .should("have.attr", "data-saved", "false");

  const waitForPopup = () => {
    cy.get('[data-cy="rating-popup"]', { timeout: 8000 }).should("exist");
    cy.get('[data-cy="rating-popup"]').should("be.visible");
  };

  beforeEach(() => {
    cy.request("POST", "/api/test/reset");
    cy.visit("/");
  });

  it("should display at least one champion bubble", () => {
    cy.get('[data-cy="champion-bubble"]').should("have.length.greaterThan", 0);
  });

  it("should allow user to favorite a champion", () => {
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForSaved();
    cy.get('[data-cy="star"]').should("exist");
  });

  it("should open the medal popup on second click", () => {
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForSaved();
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForPopup();
  });

  it("should allow user to select a gold medal", () => {
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForSaved();
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForPopup();
    cy.get('[data-cy="rate-3"]').click();
    cy.get('[data-cy="medal"]').should("contain", "🥇");
  });

  it("should allow user to remove a favorite", () => {
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForSaved();
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForPopup();
    cy.get('[data-cy="remove-button"]').click();
    waitForNotSaved();
    cy.get('[data-cy="star"]').should("not.exist");
    cy.get('[data-cy="medal"]').should("not.exist");
  });

  it("should only allow one champion to have each medal type", () => {
    cy.get('[data-cy="champion-bubble"]').eq(0).click();
    cy.get('[data-cy="champion-bubble"]').eq(0).should("have.attr", "data-saved", "true");
    cy.get('[data-cy="champion-bubble"]').eq(0).click();
    waitForPopup();
    cy.get('[data-cy="rate-3"]').click();

    cy.get('[data-cy="champion-bubble"]').eq(1).click();
    cy.get('[data-cy="champion-bubble"]').eq(1).should("have.attr", "data-saved", "true");
    cy.get('[data-cy="champion-bubble"]').eq(1).click();
    waitForPopup();
    cy.get('[data-cy="rate-3"]').click();

    cy.get('[data-cy="medal"]').contains("🥇").should("have.length", 1);
  });

  it("should close popup when clicking outside", () => {
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForSaved();
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForPopup();
    cy.get("body").click(0, 0);
    cy.get('[data-cy="rating-popup"]').should("not.exist");
  });

  it("should apply outline based on medal type or favorite status", () => {
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForSaved();
    cy.get('[data-cy="champion-bubble"]').first().click();
    waitForPopup();
    cy.get('[data-cy="rate-2"]').click();

    cy.get('[data-cy="champion-bubble"]')
      .first()
      .should("have.attr", "data-medal", "2");
  });
});
