const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    accessToken: `Bearer 369694ec7d9c2df519285fb4cf06662ec1c1c713d0e890295d975583aeb6968d`,
  },

  e2e: {
    baseUrl: "https://gorest.co.in/public/v2",

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/Tests/{E2E,API,Integ}/**/*.{js,jsx,ts,tsx,feature}",
  },
});
