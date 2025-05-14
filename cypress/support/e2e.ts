// cypress/support/e2e.ts

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Configure Cypress behavior
Cypress.on('uncaught:exception', (err, runnable) => {
    // SharePoint often has uncaught exceptions that shouldn't fail tests
    // Return false to prevent Cypress from failing the test
    return false;
});