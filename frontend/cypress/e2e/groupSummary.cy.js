describe('Group summary page', function () {
    const groupToken = 'FOOBAR'

    beforeEach(() => cy.visit('/'))

    Cypress.env('viewports').forEach((viewport) => {
        describe(
            `on ${viewport[0]}x${viewport[1]} viewport`,
            {
                viewportWidth: viewport[0],
                viewportHeight: viewport[1],
            },
            () => {
                beforeEach(() => {
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

                it('Show summary for group with 5 answers', function () {
                    cy.createGroupWithApi(groupToken)
                    cy.joinGroup(groupToken)

                    for (var i = 0; i < 5; i++) {
                        cy.answerRoleSurveyWithApi(groupToken, {
                            1: 1,
                            2: 1,
                            3: 1,
                            4: 1,
                            5: 1,
                        })
                    }
                    cy.visit('/yhteenveto/ryhma/' + groupToken)
                    cy.contains('Ryhmän FOOBAR ilmastorooli')
                    cy.contains(
                        'Ryhmän FOOBAR jakauma. Kyselyyn on vastannut 5 henkilöä.'
                    )
                })
            }
        )
    })
})