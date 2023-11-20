describe('From survey page large ', function () {
    beforeEach(function () {
        cy.visit('/ilmastoroolikysely')
        cy.viewport(900, 1000)
    })

    it('Move from survey page through questions to summary page', function () {
        cy.title().should('eq', 'Ilmastoroolikysely')
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
        cy.contains(
            'Maailma muuttuu ja sinussa on ainesta johtamaan tätä muutosta.'
        )
    })

    it('Move from survey page, answer four questions "Täysin samaa mieltä" and then move to summary page', function () {
        cy.title().should('eq', 'Ilmastoroolikysely')
        cy.get('#btn-survey-alone').click()
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 1.')
        for (let i = 0; i < 4; i++) {
            // eslint-disable-next-line
            cy.wait(500)
            cy.contains('Täysin samaa mieltä').click()
        }
        cy.visit('/kysymys/33')
        cy.contains('Lopeta kysely').click()
        cy.title().should('eq', 'Ilmastoprofiili - Tulokset')
        cy.contains('4/33')
        cy.contains('Ilmastoasiantuntija')
        cy.contains('Mielipidevaikuttaja')
        cy.contains('Kestävän elämäntavan etsijä')
        cy.contains('Eettinen kuluttaja')
    })

    // Remember to reste database before running this test

    it('Make survey 5 times in a group and check that the results are correct', function () {
        cy.title().should('eq', 'Ilmastoroolikysely')
        cy.createGroupWithToken('SURVEYTEST')
        cy.joinGroupWithToken('SURVEYTEST')
        for (let i = 0; i < 4; i++) {
            cy.get('#btn-survey-alone').click()
            cy.title().should('eq', 'Ilmastoprofiili - Kysymys 1.')
            cy.contains('Täysin samaa mieltä').click()
            // eslint-disable-next-line
            cy.wait(500)
            cy.visit('/kysymys/33')
            cy.contains('Lopeta kysely').click()
            cy.title().should('eq', 'Ilmastoprofiili - Tulokset')
            cy.visit('/ilmastoroolikysely')
        }
        cy.get('#btn-survey-alone').click()
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 1.')
        cy.contains('Jokseenkin samaa mieltä').click()
        cy.visit('/kysymys/33')
        cy.contains('Lopeta kysely').click()
        cy.title().should('eq', 'Ilmastoprofiili - Tulokset')
        cy.contains('1/33')
        cy.contains('Ryhmäsi SURVEYTEST jakauma')
    })
})
