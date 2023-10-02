describe('Climate profiles page', function () {
    beforeEach(function () {
        cy.visit('http://localhost:5173/profiles')
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
})
