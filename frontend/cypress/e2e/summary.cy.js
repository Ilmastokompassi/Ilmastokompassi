describe('From summary page large', function () {
    beforeEach(function () {
        cy.visit('/summary/1')
        cy.viewport(900, 1000)
    })

    it('title', function () {
        cy.title().should('eq', 'Ilmastoprofiili - Tulokset')
    })

    it('Oma ilmastoprofiilisi', function () {
        cy.contains('Oma ilmastoprofiilisi')
    })
})
