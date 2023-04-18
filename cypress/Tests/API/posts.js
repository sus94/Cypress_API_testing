/// <reference types="cypress" />

import { createPost, post } from "../../support/createPost";
import { createUser } from "../../support/createUser";

let user;
const expectedPost = post;

describe("Posts API tests", () => {
  before(() => {
    createUser().then((response) => {
      user = response.body;
    });
  });

  it("POST /users/:id/posts", () => {
    createPost(user.id)
      .then((response) => {
        expect(response.status).to.eql(201);
        expect(response.body.title).to.eql(expectedPost.title);
        expect(response.body.body).to.eql(expectedPost.body);
      })
      .then(() => {
        cy.request({
          method: "GET",
          url: `/users/${user.id}/posts`,
          headers: { Authorization: Cypress.env("accessToken") },
        }).then((response) => {
          expect(response.body.length).to.be.greaterThan(0);
        });
      });
  });
});
