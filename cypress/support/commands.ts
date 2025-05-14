// cypress/support/commands.ts

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to authenticate with SharePoint Online
             * @example cy.spLogin()
             */
            spLogin(): Chainable<Element>;

            /**
             * Custom command to get a SharePoint web part by data-automation-id
             * @example cy.getWebPart('my-webpart-id')
             */
            getWebPart(id: string): Chainable<Element>;
        }
    }
}

// SharePoint login command
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

// SharePoint web part selector helper
Cypress.Commands.add('getWebPart', (id: string) => {
    return cy.get(`[data-automation-id="${id}"]`);
});

// Needed for TypeScript to recognize the custom commands
export {};

/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }