describe('From summary page large', function () {
    beforeEach(function () {
        cy.visit('/yhteenveto/1')
        cy.viewport(1920, 1080)
    })

    it('title is correct', function () {
        cy.title().should('eq', 'Ilmastoprofiili - Tulokset')
    })

    it('contains "Oma ilmastoprofiilisi"', function () {
        cy.contains('Oma ilmastoprofiilisi')
    })
})
