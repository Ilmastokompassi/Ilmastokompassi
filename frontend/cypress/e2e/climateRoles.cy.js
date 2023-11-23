describe('Climate roles page', function () {
    beforeEach(() => cy.visit('/ilmastoroolit'))

    it('has correct title', function () {
        cy.title().should('eq', 'Ilmastoroolit')
    })

    Cypress.env('viewports').forEach((viewport) => {
        describe(
            `on ${viewport[0]}x${viewport[1]} viewport`,
            {
                viewportWidth: viewport[0],
                viewportHeight: viewport[1],
            },
            () => {
                it('contains all four roles', function () {
                    cy.contains('Ilmastoasiantuntija')
                    cy.contains('Mielipidevaikuttaja')
                    cy.contains('Kestävän elämäntavan etsijä')
                    cy.contains('Eettinen kuluttaja')
                })
            }
        )
    })
})
