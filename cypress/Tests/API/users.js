/// <reference types="cypress" />
import Chance from "chance";
const chance = new Chance();

let createdUser;
let userBody;

describe("Gorestco API testing", () => {
  //create a test user and implement the tests on that user
  // so that we are sure we don't destruct the DB
  before(() => {
    cy.fixture("user.json")
      .then((user) => {
        user.name = chance.name();
        user.email = chance.email();
        userBody = user;
      })
      .then(() => {
        cy.request({
          method: "POST",
          url: "/users",
          headers: { Authorization: Cypress.env("accessToken") },
          body: userBody,
        }).then((response) => {
          createdUser = response.body;
          expect(response.status).to.eq(201);
          expect(response.body.name).to.eq(userBody.name);
          expect(response.body.email).to.eq(userBody.email);
          expect(response.body.gender).to.eq(userBody.gender);
          expect(response.body.status).to.eq(userBody.status);
          expect(response.body).to.have.all.keys(
            "email",
            "name",
            "gender",
            "status",
            "id"
          );
        });
      });
  });

  it("POST /user - existing user", () => {
    cy.request({
      method: "POST",
      url: "/users",
      headers: { Authorization: Cypress.env("accessToken") },
      body: userBody,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body[0].message).to.eq("has already been taken");
    });
  });

  it("POST /users without required fileds", () => {
    cy.request({
      method: "POST",
      url: "/users",
      headers: { Authorization: Cypress.env("accessToken") },
      body: {},
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(422);
    });
  });

  it("GET /users", () => {
    cy.request({
      method: "GET",
      url: "/users",
      headers: { Authorization: Cypress.env("accessToken") },
    }).then((response) => {
      expect(response.status).to.eql(200);
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  it("Get /users/:id", () => {
    cy.request({
      method: "GET",
      url: `/users/${createdUser.id}`,
      headers: { Authorization: Cypress.env("accessToken") },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.id).to.eql(createdUser.id);
    });
  });

  it("Put /users/:id", () => {
    const updatedName = chance.name();

    cy.request({
      method: "PUT",
      url: `/users/${createdUser.id}`,
      headers: { Authorization: Cypress.env("accessToken") },
      body: {
        name: updatedName,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updatedName);
    });
  });

  it("Delete /users/:id", () => {
    cy.request({
      method: "DELETE",
      url: `/users/${createdUser.id}`,
      headers: { Authorization: Cypress.env("accessToken") },
    })
      .then((response) => {
        expect(response.status).to.eq(204);
      })
      .then(() => {
        cy.request({
          method: "GET",
          url: `/users/${createdUser.id}`,
          headers: { Authorization: Cypress.env("accessToken") },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.eq(404);
          expect(response.body.message).to.eq("Resource not found");
        });
      });
  });
});
