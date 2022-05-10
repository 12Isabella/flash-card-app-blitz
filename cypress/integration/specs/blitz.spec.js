/// <reference types="cypress" />

describe("flash-card-app-blitz", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has two card elements", () => {
    cy.get(".card").should("have.length", 2);
  });

  it("can flip card", () => {
    const newItem = "Feed the cat";
    cy.get(".card:visible").should("have.text", "Norway");
    cy.get(".card:visible").click();
    cy.get(".card:visible").should("have.text", "Oslo");
  });
});
