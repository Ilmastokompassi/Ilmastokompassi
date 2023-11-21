describe('Climate roles page', function () {
    beforeEach(function () {
        cy.visit('/ilmastoroolit')
    })

    it('has correct title', function () {
        cy.title().should('eq', 'Ilmastoroolit')
    })

    context('on 1440p screen', () => {
        beforeEach(() => cy.viewport(1366, 768))

        it('contains all four roles', function () {
            cy.contains('Ilmastoasiantuntija')
            cy.contains('Mielipidevaikuttaja')
            cy.contains('Kestävän elämäntavan etsijä')
            cy.contains('Eettinen kuluttaja')
        })
    })

    context('on iPhone SE 2', () => {
        beforeEach(() => cy.viewport('iphone-se2'))

        it('contains all four roles', function () {
            cy.contains('Ilmastoasiantuntija')
            cy.contains('Mielipidevaikuttaja')
            cy.contains('Kestävän elämäntavan etsijä')
            cy.contains('Eettinen kuluttaja')
        })
    })
})
