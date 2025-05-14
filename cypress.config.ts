// cypress.config.ts
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://yourtenant.sharepoint.com/sites/yoursite',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    experimentalSessionAndOrigin: true, // For handling authentication across origins
    defaultCommandTimeout: 10000, // SharePoint can be slow sometimes
    viewportWidth: 1280,
    viewportHeight: 800,
    supportFile: 'cypress/support/e2e.ts'
  },
});