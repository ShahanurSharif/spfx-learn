// cypress/e2e/sharepoint-webpart.cy.ts

describe('SharePoint Web Part Tests', () => {
    beforeEach(() => {
        cy.spLogin();
        cy.visit('/SitePages/Home.aspx'); // Adjust to your page with the web part
    });

    it('should load the web part correctly', () => {
        // Wait for SPFx to initialize
        cy.get('.SPCanvas').should('exist');

        // Using our custom command
        cy.getWebPart('your-webpart-id').should('be.visible');
        cy.getWebPart('your-webpart-id').find('.title').should('contain.text', 'Expected Title');
    });

    it('should interact with web part controls', () => {
        cy.getWebPart('your-webpart-id').find('button').click();
        cy.getWebPart('your-webpart-id').find('.result').should('contain.text', 'Success');
    });

    it('should handle SharePoint list data', () => {
        // Mock the SharePoint REST API
        cy.intercept('GET', '**/api/web/lists/getbytitle*/items*', {
            body: {
                value: [
                    { Title: 'Test Item 1', Id: 1 },
                    { Title: 'Test Item 2', Id: 2 }
                ]
            }
        }).as('listData');

        // Test list rendering
        cy.getWebPart('list-webpart-id').find('[data-automation-id="list-item"]')
            .should('have.length', 2);
    });
});