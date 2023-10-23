describe('From survey page large ', function () {
    beforeEach(function () {
        cy.visit('/survey')
        cy.viewport(900, 1000)
    })

    it('Access first question alone', function () {
        cy.title().should('eq', 'Kysely')
        cy.get('#btn-survey-alone').click()
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 1.')
    })
})
