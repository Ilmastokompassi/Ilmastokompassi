describe('Joining group', function () {
    beforeEach(() => cy.visit('/'))

    Cypress.env('viewports').forEach((viewport) => {
        beforeEach(() => cy.viewport(viewport[0], viewport[1]))

        it('with nonexistent group token fails', function () {})

        it('with empty inputfield fails', function () {
            cy.joinGroupWithToken('', 'Ryhmään liittyminen epäonnistui.')
        })

        it('with too long token fails', function () {
            cy.joinGroupWithToken(
                'LIIANPITKATUNNUS',
                'Ryhmään liittyminen epäonnistui.'
            )
        })

        it('with special character fails', function () {
            cy.joinGroupWithToken('!', 'Ryhmään liittyminen epäonnistui.')
        })
        // Remember to reste database before running this test

        it('with correct token succeeds', function () {
            cy.task('db:reset')

            cy.createGroup('TOKEN')
            cy.joinGroupWithToken('TOKEN', 'Ryhmään liittyminen onnistui!')
            cy.get('#btn-show-group-info').click()
            cy.contains('TOKEN')
        })
        it('with correct token and exit group', function () {
            cy.task('db:reset')

            cy.joinGroupWithToken('TOKEN', 'Ryhmään liittyminen onnistui!')
            cy.get('#btn-show-group-info').click()
            cy.contains('TOKEN')
            cy.get('#btn-leave-group').click()
            cy.get('#btn-show-group-info').click()
            cy.contains('Et ole ryhmässä')
        })
        it('wtih correct token and start survey', function () {
            cy.task('db:reset')

            cy.joinGroupWithToken('TOKEN', 'Ryhmään liittyminen onnistui!')
            cy.visit('/ilmastoroolikysely')
            cy.get('#btn-show-group-info').click()
            cy.contains('TOKEN')
            cy.get('#group-token').click()
            cy.get('#btn-survey-alone').click()
            cy.title().should('eq', 'Ilmastoprofiili - Kysymys 1.')
            cy.get('#btn-show-group-info').click()
            cy.contains('Ryhmätunnus: TOKEN')
        })
    })
})
