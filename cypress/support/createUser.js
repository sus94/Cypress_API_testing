import Chance from "chance";
const chance = new Chance();

const user = {
  email: chance.email(),
  name: chance.name(),
  status: "active",
  gender: "female",
};

export { user };
