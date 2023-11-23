describe('Summary page', function () {
    beforeEach(() => cy.visit('/yhteenveto/1'))

    it('title is correct', function () {
        cy.title().should('eq', 'Ilmastorooli - Tulokset')
    })

    Cypress.env('viewports').forEach((viewport) => {
        describe(
            `on ${viewport[0]}x${viewport[1]} viewport`,
            {
                viewportWidth: viewport[0],
                viewportHeight: viewport[1],
            },
            () => {
                it('contains heading', function () {
                    cy.contains('Ilmastoroolisi')
                })
            }
        )
    })
})
