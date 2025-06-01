describe("State", () => {
  it("should increment counter", () => {
    cy.visit("http://localhost:3000/demos");

    cy.get("span[data-test='count']").contains(0);
    cy.get("button[data-test='inc']").click();
    cy.get("span[data-test='count']").contains(1);
  });
});

describe("posts", () => {
  it("should create post", () => {
    cy.visit("http://localhost:3000/posts");
    cy.get("input[name='title']").type("Test Post");
    cy.get("input[name='content']").type("Test Content");
    cy.get("form > button").click();

    cy.get("[data-test='posts'] > li:last-child").contains("Test Post");
    cy.get("[data-test='posts'] > li:last-child > a").then(($a) => {
      const href = $a.attr("href");
      cy.wrap($a).click();
      cy.url().should("include", href);
    });
    cy.get("main h1").contains("Test Post");
    cy.get("main p").contains("Test Content");
  });
});
