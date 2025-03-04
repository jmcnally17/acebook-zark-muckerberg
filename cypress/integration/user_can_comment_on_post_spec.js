describe("Comment", () => {
  it("can be added onto a post", () => {
    cy.visit("/users/new");
    cy.get("#email").type("someone25@example.com");
    cy.get("#password").type("password5");
    cy.get("#first_name").type("Bob");
    cy.get("#last_name").type("Smith");
    cy.get("#dob").type("2022-05-16");
    cy.get("#submit").click();
    cy.get(".timelinepage").click();
    
    cy.get(".new-field").type("This goes on comment test!");
    cy.get(".post-button").click();
    
    cy.get(".new-comment").first().type("Comment post test");
    cy.get(".post-comment").first().click();


    cy.get(".comments").first().should("contain", "Comment post test");
    // cy.get(".comment").should("contain", "This is a comment");
  });
});