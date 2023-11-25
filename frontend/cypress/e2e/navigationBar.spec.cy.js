Cypress.env('viewports').forEach((viewport) => {
    describe(
        `Front page on ${viewport[2]}`,
        {
            viewportWidth: viewport[0],
            viewportHeight: viewport[1],
        },
        () => {
            beforeEach(() => cy.visit('/'))

            it('navigate to role survey page', function () {
                cy.navigateToPageWithNavBar('survey')

                cy.location('pathname').should('eq', '/ilmastoroolikysely')
                cy.title().should('eq', 'Ilmastoroolikysely')
            })

            it('navigate to faq page', function () {
                cy.navigateToPageWithNavBar('faq')

                cy.location('pathname').should('eq', '/faq')
                cy.title().should('eq', 'Usein kysytyt kysymykset')
            })
        }
    )
})
