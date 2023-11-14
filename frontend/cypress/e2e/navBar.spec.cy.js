describe('From front page ', function () {
    beforeEach(function () {
        cy.visit('')
    })

    it('front page can be opened', function () {
        cy.title().should('eq', 'Ilmastokompassi')
    })

    it('navbar sends to survey page', function () {
        cy.viewport(900, 1000)
        cy.get('#survey').click()
        cy.title().should('eq', 'Kyselyt')
    })

    it('small page navbar sends to survey page', function () {
        cy.viewport(899, 1000)
        cy.get('#hamburger').click()
        cy.get('#survey-hamburger').click()
        cy.title().should('eq', 'Kyselyt')
    })
})

describe('From survey page ', function () {
    beforeEach(function () {
        cy.visit('/kyselyt')
    })

    it('navbar sends to landing page', function () {
        cy.viewport(900, 1000)
        cy.get('#navbar-brand-large').click()
        cy.title().should('eq', 'Ilmastokompassi')
    })

    it('navbar sends to landing page', function () {
        cy.viewport(899, 1000)
        cy.get('#navbar-brand-small').click()
        cy.title().should('eq', 'Ilmastokompassi')
    })

    // Tests are waiting for proper test setup, Paulus is working on it

    // it('navbar sends to group summary page', function () {
    //     cy.viewport(900, 1000)
    //     cy.createGroupWithToken('GROUPSUM')
    //     cy.joinGroupWithToken('GROUPSUM')
    //     cy.get('#btn-show-group-info').click()
    //     cy.get('#btn-group-summary').click()
    //     cy.title().should('eq', 'Ilmastoprofiili - Tulokset')
    // })
})
