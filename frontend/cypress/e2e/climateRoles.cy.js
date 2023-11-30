Cypress.env('viewports').forEach((viewport) => {
    describe(
        `Climateprofiles in SurveyPage on ${viewport[2]} viewport`,
        {
            viewportWidth: viewport[0],
            viewportHeight: viewport[1],
        },
        () => {
            beforeEach(() => cy.visit('/ilmastoroolikysely'))

            it('has correct title', function () {
                cy.title().should('eq', 'Ilmastoroolikysely')
            })

            it('contains all four roles', function () {
                cy.contains('Ilmastoasiantuntija')
                cy.contains('Mielipidevaikuttaja')
                cy.contains('Kestävän elämäntavan etsijä')
                cy.contains('Eettinen kuluttaja')
            })

            it('Ilmastoasiantuntija accordion has correct content', function () {
                cy.contains('Ilmastoasiantuntija').click()
                cy.contains('Ilmastoasiantuntija on kiinnostunut ilmastonmuutoksen tieteellisestä puolesta')
            })
        }
    )
})
