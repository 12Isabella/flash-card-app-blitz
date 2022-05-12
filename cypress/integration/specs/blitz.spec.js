/// <reference types="cypress" />

describe("flash-card-app-blitz", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has two card elements", () => {
    cy.get(".card").should("have.length", 2);
  });

  it("can flip card", () => {
    cy.get(".card:visible").invoke("text").as("front");
    cy.get("@front").then((front) => {
      cy.get(".card:visible").should("have.text", front);
      cy.get(".card:visible").click();
      cy.get(".card:visible").should("not.have.text", front);

      cy.log(`front is ${front}`);
    });
  });
});
