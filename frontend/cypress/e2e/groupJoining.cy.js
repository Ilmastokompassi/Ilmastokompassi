describe('Joining group', function () {
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
                    cy.findByTestId('group-token-input').as('groupTokenInput')
                    cy.findByTestId('join-group-accordion').as(
                        'joinGroupAccordion'
                    )
                    cy.findByTestId('join-group').as('joinGroup')

                    cy.exec('../bin/db-reset')

                    cy.get('@joinGroupAccordion').click()
                })

                it('with empty token fails', function () {
                    cy.get('@joinGroup').click()

                    cy.get('@groupTokenInput').contains(
                        'Ryhmään liittyminen epäonnistui.'
                    )
                })

                it('with nonexistent token fails', function () {
                    cy.get('@groupTokenInput').get('input').type('DOESNOTEXIST')
                    cy.get('@joinGroup').click()

                    cy.get('@groupTokenInput').contains(
                        'Ryhmään liittyminen epäonnistui.'
                    )
                })

                it('with too long group token fails', function () {
                    const tooLongGroupToken = 'A'.repeat(20)

                    cy.get('@groupTokenInput')
                        .get('input')
                        .type(tooLongGroupToken)
                    cy.get('@joinGroup').click()

                    cy.get('@groupTokenInput').contains(
                        'Ryhmään liittyminen epäonnistui.'
                    )
                })

                it('with special character in token fails', function () {
                    const specialChars = '!!!?&'

                    cy.get('@groupTokenInput').get('input').type(specialChars)
                    cy.get('@joinGroup').click()

                    cy.get('@groupTokenInput').contains(
                        'Ryhmään liittyminen epäonnistui.'
                    )
                })

                it('with existing token and exit group', function () {
                    const groupToken = 'FOOBAR'

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
                            cy.findByTestId('leave-group').click()
                        })

                    cy.findByTestId('show-group-menu').click()
                    cy.findByTestId('group-menu')
                        .should('be.visible')
                        .within(() => {
                            cy.findByTestId('current-group-token').contains(
                                'Liity ryhmään'
                            )
                        })
                })
            }
        )
    })
})
