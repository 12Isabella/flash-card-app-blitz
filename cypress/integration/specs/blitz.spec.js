/// <reference types="cypress" />

describe("flash-card-app-blitz", () => {
  beforeEach(() => {
    cy.intercept("GET", "/v1/data/query/**", {
      statusCode: 200,
      body: {
        ms: 46,
        query:
          '*[_type == "flashcard"]{\n      front,\n      back,\n      image{\n        asset-\u003e{\n          url\n        },\n      },\n     \n    }',
        result: [
          { back: "hhhhhhhhhhh", front: "Ukraine" },
          { back: "Madrid", front: "Spain" },
          { back: "Mexico City", front: "Mexico" },
          { back: "London", front: "Great Britain" },
          { back: "Berlin", front: "Germany" },
          { back: "Rome", front: "Italy" },
          { back: "Vilnius", front: "Lithuania" },
          {
            back: "Oslo",
            front: "Norway",
            image: {
              asset: {
                url: "https://cdn.sanity.io/images/xbd6yo4d/production/e0ee7f11c289cb6607793863a240cfa1683d4041-1856x2784.jpg",
              },
            },
          },
          { back: "Riga", front: "Latvia " },
          { back: "Wellington", front: "New Zealand" },
          { back: "Tallinn", front: "Estonia" },
          { back: "Canberra", front: "Australia" },
          { back: "Helsinki", front: "Finland" },
          { back: "Port Moresby", front: "Papua New Guinea " },
          { back: "Tirana", front: "Albania" },
          {
            back: "Paris",
            front: "France",
            image: {
              asset: {
                url: "https://cdn.sanity.io/images/xbd6yo4d/production/6236207cd83f0aef41d649708322395baba60ab9-3024x4032.jpg",
              },
            },
          },
          { back: "Dublin", front: "Ireland" },
        ],
      },
    });

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
