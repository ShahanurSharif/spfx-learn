// cypress/support/commands.js
Cypress.Commands.add('spLogin', () => {
  // Store the session if successful login
  cy.session('sharepoint-session', () => {
    cy.visit('/');
    
    // Handle the Microsoft login page
    cy.origin('https://login.microsoftonline.com', () => {
      cy.get('input[type="email"]').type(Cypress.env('SP_USERNAME'));
      cy.get('input[type="submit"]').click();
      cy.get('input[type="password"]').type(Cypress.env('SP_PASSWORD'), { log: false });
      cy.get('input[type="submit"]').click();
      
      // Handle "Stay signed in?" prompt if it appears
      cy.get('body').then(($body) => {
        if ($body.find('#idSIButton9').length > 0) {
          cy.get('#idSIButton9').click();
        }
      });
    });
    
    // Verify we're logged in
    cy.url().should('include', 'sharepoint.com');
  });
});