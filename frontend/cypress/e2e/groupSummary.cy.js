describe('Group summary page', function () {
    const groupToken = 'FOOBAR'

    beforeEach(() => cy.visit('/ilmastoroolikysely'))

    Cypress.env('viewports').forEach((viewport) => {
        describe(
            `on ${viewport[0]}x${viewport[1]} viewport`,
            {
                viewportWidth: viewport[0],
                viewportHeight: viewport[1],
            },
            () => {
                beforeEach(() => {
                    cy.contains('Vastaa ryhmässä').click()
                    cy.findByTestId('group-token-input').as('groupTokenInput')
                    cy.findByTestId('join-group').as('joinGroup')

                    cy.exec('../bin/db-reset')
                })

                it('Create and join group, visit group summary through URL, 0 answers', function () {
                    cy.createGroupWithApi(groupToken)
                    cy.get('@groupTokenInput').get('input').type(groupToken)
                    cy.get('@joinGroup').click()

                    cy.visit('/yhteenveto/ryhma/' + groupToken)
                    cy.contains('Ryhmän FOOBAR ilmastorooli')
                    cy.contains(
                        'Näet tässä ryhmän FOOBAR tulokset, kun vähintään viisi henkilöä on vastannut kyselyyn. Nyt kyselyyn on vastannut 0 henkilöä.'
                    )
                })

                it('Create and join group, visit group summary through hamburger menu, 0 answer', function () {
                    cy.createGroupWithApi(groupToken)
                    cy.get('@groupTokenInput').get('input').type(groupToken)
                    cy.get('@joinGroup').click()

                    cy.findByTestId('show-group-menu').click()
                    cy.findByTestId('group-menu')
                        .should('be.visible')
                        .within(() => {
                            cy.findByTestId('current-group-token').contains(
                                groupToken
                            )
                            cy.findByTestId('open-group-summary').click()
                        })
                    cy.contains('Ryhmän FOOBAR ilmastorooli')
                    cy.contains(
                        'Näet tässä ryhmän FOOBAR tulokset, kun vähintään viisi henkilöä on vastannut kyselyyn. Nyt kyselyyn on vastannut 0 henkilöä.'
                    )
                })

                it('Show summary for group with five answers and all profiles', function () {
                    cy.createGroupWithApi(groupToken)
                    cy.joinGroup(groupToken)

                    for (var i = 0; i < 5; i++) {
                        cy.answerRoleSurveyWithApi(groupToken, {
                            1: 5,
                            2: 5,
                            3: 5,
                            4: 5,
                        })
                    }
                    cy.visit('/yhteenveto/ryhma/' + groupToken)

                    cy.contains('Ryhmän FOOBAR ilmastorooli')
                    cy.contains('Ryhmän FOOBAR jakauma')
                    cy.contains('Kyselyyn on vastannut 5 henkilöä')
                    cy.contains('Ilmastoasiantuntija')
                    cy.contains('Mielipidevaikuttaja')
                    cy.contains('Kestävän elämäntavan etsijä')
                    cy.contains('Eettinen kuluttaja')
                })

                it('Show summary for group with five answers and one profile', function () {
                    cy.createGroupWithApi(groupToken)
                    cy.joinGroup(groupToken)

                    for (var i = 0; i < 5; i++) {
                        cy.answerRoleSurveyWithApi(groupToken, {
                            1: 5,
                            2: 5,
                            3: 5,
                            4: 5,
                            5: 5,
                        })
                    }
                    cy.visit('/yhteenveto/ryhma/' + groupToken)

                    cy.contains('Ryhmän FOOBAR ilmastorooli')
                    cy.contains('Ryhmän FOOBAR jakauma')
                    cy.contains('Kyselyyn on vastannut 5 henkilöä')
                    cy.contains('Ilmastoasiantuntija')
                })
            }
        )
    })
})
