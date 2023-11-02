describe('From survey page large ', function () {
    beforeEach(function () {
        cy.visit('/kyselyt')
        cy.viewport(900, 1000)
    })

    it('Move from survey page through questions to summary page', function () {
        cy.title().should('eq', 'Kyselyt')
        cy.get('#btn-survey-alone').click()
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 1.')

        for (let i = 0; i < 33; i++) {
            // eslint-disable-next-line
            cy.wait(500)
            cy.contains('Täysin samaa mieltä').click()
        }
        cy.contains('Lopeta kysely').click()

        cy.title().should('eq', 'Ilmastoprofiili - Tulokset')
        cy.contains('33/33')
        cy.contains('Sinä haet kompromisseja eettisen kuluttajan tiellä.')
    })
})
