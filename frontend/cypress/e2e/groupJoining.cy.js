Cypress.env('screen_sizes').forEach((size) => {
    describe(`Group joining ${size[2]}`, function () {
        beforeEach(function () {
            cy.visit('/kyselyt')
            cy.viewport(size[0], size[1])
        })
        it('title should be Kyselyt', function () {
            cy.title().should('eq', 'Kyselyt')
        })

        it('Open join-group dialog and press cancel', function () {
            cy.get('#btn-join-group-dialog').click()
            cy.get('#dialog-join-group')
            cy.get('#btn-cancel-group-joining').click()
            cy.get('#dialog-join-group').should('not.exist')
        })

        it('Open join-group dialog and press esc-key', function () {
            cy.get('#btn-join-group-dialog').click()
            cy.get('#dialog-join-group')
            cy.get('#dialog-join-group').type('{esc}')
            cy.get('#dialog-join-group').should('not.exist')
        })

        it('Open join-group dialog and joining with nonexistent group token fails', function () {
            cy.joinGroupWithToken('TOKENI', 'Ryhmätunnusta ei löytynyt.')
        })

        it('Open join-group dialog and joining with empty inputfield fails', function () {
            cy.joinGroupWithToken('', 'Syötä ryhmätunnus.')
        })

        it('Open join-group dialog and joining with too long token fails', function () {
            cy.joinGroupWithToken(
                'LIIANPITKATUNNUS',
                'Ryhmätunnus ei voi olla yli 10 merkkiä pitkä.'
            )
        })

        it('Open join-group dialog and joining with special character fails', function () {
            cy.joinGroupWithToken(
                'MOI!!!',
                'Ryhmätunnus voi sisältää vain isoja kirjaimia ja numeroita.'
            )
        })
        it('Open join-group dialog and join with correct token succeeds', function () {
            cy.createGroupWithToken('TOKEN', 'Ryhmä luotu onnistuneesti!')
            cy.joinGroupWithToken('TOKEN')
            cy.get('#btn-show-group-info').click()
            cy.contains('TOKEN')
        })
        it('Open join-group dialog and join with correct token, exit group', function () {
            cy.createGroupWithToken('TOKEN', 'Ryhmä luotu onnistuneesti!')
            cy.joinGroupWithToken('TOKEN')
            cy.get('#btn-show-group-info').click()
            cy.contains('TOKEN')
            cy.get('#btn-leave-group').click()
            cy.get('#btn-show-group-info').click()
            cy.contains('Et ole ryhmässä')
        })
        it('Join group and start survey solo succeeds', function () {
            cy.createGroupWithToken('TOKEN', 'Ryhmä luotu onnistuneesti!')
            cy.joinGroupWithToken('TOKEN')
            cy.visit('/kyselyt')
            cy.get('#btn-show-group-info').click()
            cy.contains('TOKEN')
            cy.get('#group-token').click()
            cy.get('#btn-survey-alone').click()
            cy.get('#btn-show-group-info').click()
            cy.contains('Et ole ryhmässä')
        })
    })
})
