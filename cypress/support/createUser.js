import Chance from "chance";
const chance = new Chance();

const user = {
  email: chance.email(),
  name: chance.name(),
  status: "active",
  gender: "female",
};

export function createUser() {
  return cy.request({
    method: "POST",
    url: "/users",
    headers: { Authorization: Cypress.env("accessToken") },
    body: user,
  });
}

export { user };
