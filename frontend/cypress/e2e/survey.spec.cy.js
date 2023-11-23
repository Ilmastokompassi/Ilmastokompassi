describe('Role survey page', function () {
    beforeEach(() => cy.visit('/ilmastoroolikysely'))

    Cypress.env('viewports').forEach((viewport) => {
        describe(
            `on ${viewport[2]} viewport`,
            {
                viewportWidth: viewport[0],
                viewportHeight: viewport[1],
            },
            () => {
                beforeEach(() => {
                    cy.exec('../bin/db-reset')
                })

                it('Move from survey page through questions to summary page', function () {
                    cy.findByTestId('start-survey').click()
                    cy.title().should('eq', 'Ilmastorooli - Kysymys 1.')

                    for (let i = 0; i < 33; i++) {
                        // eslint-disable-next-line
                        cy.wait(200)
                        cy.contains('Täysin samaa mieltä').click()
                    }
                    cy.contains('Lopeta kysely').click()

                    cy.title().should('eq', 'Ilmastorooli - Tulokset')
                    cy.contains('33/33')
                    cy.contains(
                        'Maailma muuttuu ja sinussa on ainesta johtamaan tätä muutosta.'
                    )
                })

                it('Move from survey page, answer four questions "Täysin samaa mieltä" and then move to summary page', function () {
                    cy.findByTestId('start-survey').click()
                    cy.title().should('eq', 'Ilmastorooli - Kysymys 1.')
                    for (let i = 0; i < 4; i++) {
                        // eslint-disable-next-line
                        cy.wait(200)
                        cy.contains('Täysin samaa mieltä').click()
                    }
                    cy.visit('/kysymys/33')
                    cy.contains('Lopeta kysely').click()
                    cy.title().should('eq', 'Ilmastorooli - Tulokset')
                    cy.contains('4/33')
                    cy.contains('Ilmastoasiantuntija')
                    cy.contains('Mielipidevaikuttaja')
                    cy.contains('Kestävän elämäntavan etsijä')
                    cy.contains('Eettinen kuluttaja')
                })

                it('Make survey 5 times in a group and check that the results are correct', function () {
                    cy.createGroupWithApi('SURVEYTEST')
                    cy.joinGroup('SURVEYTEST')

                    for (let i = 0; i < 4; i++) {
                        cy.findByTestId('start-survey').click()
                        cy.title().should('eq', 'Ilmastorooli - Kysymys 1.')
                        cy.contains('Täysin samaa mieltä').click()
                        // eslint-disable-next-line
                        cy.wait(200)
                        cy.visit('/kysymys/33')
                        cy.contains('Lopeta kysely').click()
                        cy.title().should('eq', 'Ilmastorooli - Tulokset')
                        cy.visit('/ilmastoroolikysely')
                    }
                    cy.findByTestId('start-survey').click()
                    cy.title().should('eq', 'Ilmastorooli - Kysymys 1.')
                    cy.contains('Jokseenkin samaa mieltä').click()
                    cy.visit('/kysymys/33')
                    cy.contains('Lopeta kysely').click()
                    cy.title().should('eq', 'Ilmastorooli - Tulokset')
                    cy.contains('1/33')
                    cy.contains('Ryhmän SURVEYTEST jakauma')
                })

                it('Make survey once, answer 2 questions "Täysin eri mieltä" and then move to summary page', function () {
                    cy.findByTestId('start-survey').click()
                    cy.title().should('eq', 'Ilmastorooli - Kysymys 1.')
                    for (let i = 0; i < 2; i++) {
                        // eslint-disable-next-line
                        cy.wait(500)
                        cy.contains('Täysin eri mieltä').click()
                    }
                    cy.visit('/kysymys/33')
                    cy.contains('Lopeta kysely').click()
                    cy.title().should('eq', 'Ilmastorooli - Tulokset')
                    cy.contains('Ei tarpeeksi dataa tulosten näyttämiseen')
                })
            }
        )
    })
})
