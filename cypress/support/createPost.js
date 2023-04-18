import Chance from "chance";
const chance = new Chance();

export const post = {
  title: chance.string({ length: 200 }),
  body: chance.sentence(),
};

export function createPost(userId) {
  return cy.request({
    method: "POST",
    url: `/users/${userId}/posts`,
    headers: { Authorization: Cypress.env("accessToken") },
    body: post,
  });
}
