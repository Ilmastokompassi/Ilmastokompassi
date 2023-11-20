Cypress.env('viewports').forEach((viewport) => {
    describe(`From front page on ${viewport[2]}`, function () {
        beforeEach(function () {
            cy.visit('/')
        })

        it('navbar sends to survey page', function () {
            cy.viewport(900, 1000)
            cy.get('survey').click()
            cy.title().should('eq', 'Ilmastoroolikysely')
        })

        it('small page navbar sends to survey page', function () {
            cy.viewport(899, 1000)
            cy.findByTestId('hamburger').click()
            cy.get('#survey-menu').click()
            cy.title().should('eq', 'Ilmastoroolikysely')
        })
    })

    describe(`From survey page on ${viewport[2]}`, function () {
        beforeEach(function () {
            cy.visit('/ilmastoroolikysely')
        })

        it('navbar sends to landing page', function () {
            cy.get('#navbar-brand-large').click()
            cy.title().should('eq', 'Ilmastokompassi')
        })

        it('navbar sends to landing page', function () {
            cy.viewport(899, 1000)
            cy.get('#navbar-brand-small').click()
            cy.title().should('eq', 'Ilmastokompassi')
        })
    })
})
