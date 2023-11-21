describe('Open group creation dialog', function () {
    beforeEach(() => cy.visit('/'))

    Cypress.env('viewports').forEach((size) => {
        context(`on ${size[0]}x${size[1]} viewport`, () => {
            beforeEach(() => {
                cy.viewport(size[0], size[1])

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

                    cy.get('@groupDialog').should(
                        'contain',
                        `Ryhmä ${validGroupToken} luotu onnistuneesti!`
                    )
                })

                it('with empty token fails', function () {
                    cy.get('@groupDialog').within(() => {
                        cy.get('@createGroup').click()
                    })

                    cy.get('@groupDialog').should(
                        'contain',
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

                    cy.get('@groupDialog').should(
                        'contain',
                        'Tarkista ryhmätunnus'
                    )
                })

                it('with with special characters fails', function () {
                    const specialChars = '!!!?&'

                    cy.get('@groupDialog').within(() => {
                        cy.get('@tokenInput').type(specialChars)

                        cy.get('@tokenInput')
                            .get('input')
                            .should('have.value', specialChars)
                        cy.get('@createGroup').should('be.disabled')
                    })

                    cy.get('@groupDialog').should(
                        'contain',
                        'Tarkista ryhmätunnus'
                    )
                })
            })
        })
    })
})
