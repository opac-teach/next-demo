describe("redirect-login", () => {
  it("should redirect to login", () => {
    cy.visit("http://localhost:3000/prisma/coins");

    cy.get("h1").contains('Login');
  });
});

describe("login", () => {
  it("should login", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name='email']").type("olivier@test.com");
    cy.get("input[name='password']").type("password");
    cy.get("form > button").click();
    cy.wait(1000);
    cy.url().should("include", "/prisma/coins");
  })
});

describe("logout", () => {
    it("should logout", () => {
        cy.visit("http://localhost:3000/login");
        cy.get("input[name='email']").type("olivier@test.com");
        cy.get("input[name='password']").type("password");
        cy.get("form > button").click();
        cy.wait(1000);
        cy.url().should("include", "/prisma/coins");
        cy.get("header > div> nav > div > ul > li:last-child > a").then(($a) => {
            const href = $a.attr("href");
            cy.wrap($a).click({ multiple: true });
            cy.url().should("include", href);
        });
        cy.wait(1000);
        cy.get("button[data-slot='button']").click();
        cy.wait(1000);
        cy.url().should("include", "/login");
    })
});



describe("memecoin", () => {
    it("should create memecoin", () => {
        cy.visit("http://localhost:3000/login");
        cy.get("input[name='email']").type("olivier@test.com");
        cy.get("input[name='password']").type("password");
        cy.get("form > button").click();
        cy.wait(1000);
        cy.url().should("include", "/prisma/coins");
        cy.get("a[data-test='create-memecoin']").click();
        cy.wait(1000);
        cy.get("input[name='name']").type("Test Coin");
        cy.get("input[name='symbol']").type("TST");
        cy.get("textarea[name='description']").type("Test Coin Description");
        cy.get("input[name='logoUrl']").type("https://example.com/test-coin.png");
        cy.get("form > button").click();
        cy.wait(1000);
        cy.get("div[data-test='memecoins-list'] > a:last-child > div[data-test='memecoin'] > div[data-test='memecoin-name']").contains("Test Coin");
        cy.get("div[data-test='memecoins-list'] > a:last-child > div[data-test='memecoin'] > div[data-test='memecoin-symbol']").contains("TST");
        cy.get("div[data-test='memecoins-list'] > a:last-child > span[data-test='memecoin-author']").contains("olivier");
        cy.get("div[data-test='memecoins-list'] > a:last-child").then(($a) => {
        const href = $a.attr("href");
        cy.wrap($a).click({ multiple: true });
        cy.url().should("include", href);
        });
        cy.get("span").contains("Test Coin");
        cy.get("span > span").contains("TST");
    });
});

/*describe("posts", () => {
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
});*/
