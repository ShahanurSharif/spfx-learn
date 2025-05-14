// cypress/types/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
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