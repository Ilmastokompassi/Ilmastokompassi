describe('From survey page large ', function () {
    beforeEach(function () {
        cy.visit('http://localhost:5173/survey')
        cy.viewport(900, 1000)
    })

    it('Access first question alone', function () {
        cy.title().should('eq', 'Kysely')
        cy.get('#btn-survey-alone').click()
        cy.title().should('eq', 'Kysymykset')
    })
})
