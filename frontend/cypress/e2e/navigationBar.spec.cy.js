Cypress.env('viewports').forEach((viewport) => {
    describe(`From front page on ${viewport[2]}`, function () {
        beforeEach(() => cy.visit('/'))

        it('navigate to role survey page', function () {
            cy.navigateToPageWithNavBar('survey')

            cy.location('pathname').should('eq', '/ilmastoroolikysely')
            cy.title().should('eq', 'Ilmastoroolikysely')
        })

        it('navigate to roles page', function () {
            cy.navigateToPageWithNavBar('roles')

            cy.location('pathname').should('eq', '/ilmastoroolit')
            cy.title().should('eq', 'Ilmastoroolit')
        })

        it('navigate to faq page', function () {
            cy.navigateToPageWithNavBar('faq')

            cy.location('pathname').should('eq', '/faq')
            cy.title().should('eq', 'Usein kysytyt kysymykset')
        })
    })
})
