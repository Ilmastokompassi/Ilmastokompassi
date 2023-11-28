describe('Open group creation dialog', function () {
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
                    cy.findByTestId('open-create-group-dialog').click()
                    cy.findByTestId('create-group-dialog')
                        .as('groupDialog')
                        .should('be.visible')

                    cy.get('@groupDialog')
                        .findByTestId('group-token')
                        .as('tokenInput')
                    cy.get('@groupDialog')
                        .findByTestId('create-group')
                        .as('createGroup')
                        .should('be.visible')
                })

                it('and press cancel button to exit', function () {
                    cy.get('@groupDialog')
                        .findByTestId('cancel')
                        .should('be.visible')
                        .click()

                    cy.get('@groupDialog').should('not.exist')
                })

                it('and press esc to exit', function () {
                    cy.get('@groupDialog').type('{esc}')

                    cy.get('@groupDialog').should('not.exist')
                })

                describe('and create group', function () {
                    it('with token FOOBAR', function () {
                        cy.exec('../bin/db-reset')

                        const validGroupToken = 'FOOBAR'

                        cy.get('@groupDialog').within(() => {
                            cy.get('@tokenInput').type(validGroupToken)
                            cy.get('@tokenInput')
                                .get('input')
                                .should('have.value', validGroupToken)

                            cy.findByTestId('create-group')
                                .should('be.visible')
                                .click()
                        })

                        cy.get('@groupDialog').contains(
                            `Ryhmä ${validGroupToken} luotu onnistuneesti!`
                        )
                    })

                    it('with empty token fails', function () {
                        cy.get('@groupDialog').within(() => {
                            cy.get('@createGroup').click()
                        })

                        cy.get('@groupDialog').contains(
                            'Ryhmätunnus ei voi olla tyhjä.'
                        )
                    })

                    it('with too long token fails', function () {
                        const tooLongGroupToken = 'A'.repeat(20)

                        cy.get('@groupDialog').within(() => {
                            cy.get('@tokenInput').type(tooLongGroupToken)

                            cy.get('@tokenInput')
                                .get('input')
                                .should('have.value', tooLongGroupToken)
                            cy.get('@createGroup').should('be.disabled')
                        })

                        cy.get('@groupDialog').contains('Tarkista ryhmätunnus')
                    })

                    it('with special characters in token fails', function () {
                        const specialChars = '!!!?&'

                        cy.get('@groupDialog').within(() => {
                            cy.get('@tokenInput').type(specialChars)

                            cy.get('@tokenInput')
                                .get('input')
                                .should('have.value', specialChars)
                            cy.get('@createGroup').should('be.disabled')
                        })

                        cy.get('@groupDialog').contains('Tarkista ryhmätunnus')
                    })
                })
            }
        )
    })
})
