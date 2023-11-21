describe('Joining group from frontpage', function () {
    beforeEach(() => cy.visit('/'))

    Cypress.env('viewports').forEach((size) => {
        context(`on ${size[0]}x${size[1]} viewport`, () => {
            beforeEach(() => {
                cy.viewport(size[0], size[1])

                cy.findByTestId('group-token-input').as('groupTokenInput')
                cy.findByTestId('join-group').as('joinGroup')

                cy.exec('../bin/db-reset')
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

                cy.get('@groupTokenInput').get('input').type(tooLongGroupToken)
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
                cy.findByTestId('appbar-group-menu')
                    .should('be.visible')
                    .within(() => {
                        cy.findByTestId('current-group-token').contains(
                            groupToken
                        )
                        cy.findByTestId('leave-group').click()
                    })

                cy.findByTestId('show-group-menu').click()
                cy.findByTestId('appbar-group-menu')
                    .should('be.visible')
                    .within(() => {
                        cy.findByTestId('current-group-token').contains(
                            'Et ole ryhmässä'
                        )
                    })
            })
        })
    })
})
