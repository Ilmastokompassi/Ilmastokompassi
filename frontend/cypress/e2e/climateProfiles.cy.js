describe('Climate profiles page', function () {
    beforeEach(function () {
        cy.visit('/profiilit')
        cy.viewport(900, 1000)
    })

    it('title', function () {
        cy.title().should('eq', 'Ilmastoprofiilit')
    })

    it('ilmastoasiantuntija', function () {
        cy.contains('Ilmastoasiantuntija')
    })

    it('Mielipidevaikuttaja', function () {
        cy.contains('Mielipidevaikuttaja')
    })

    it('Kestävän elämäntavan etsijä', function () {
        cy.contains('Kestävän elämäntavan etsijä')
    })

    it('Eettinen kuluttaja', function () {
        cy.contains('Eettinen kuluttaja')
    })

    it('small screen ilmastoasiantuntija', function () {
        cy.viewport(899, 1000)
        cy.contains('Ilmastoasiantuntija')
    })

    it('small screen Mielipidevaikuttaja', function () {
        cy.viewport(899, 1000)
        cy.contains('Mielipidevaikuttaja')
    })

    it('small screen Kestävän elämäntavan etsijä', function () {
        cy.viewport(899, 1000)
        cy.contains('Kestävän elämäntavan etsijä')
    })

    it('small screen Eettinen kuluttaja', function () {
        cy.viewport(899, 1000)
        cy.contains('Eettinen kuluttaja')
    })
})
