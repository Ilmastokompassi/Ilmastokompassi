Cypress.env('screen_sizes').forEach((size) => {
    describe(`Group joining ${size[2]}`, function () {
        beforeEach(function () {
            cy.visit('/')
            cy.viewport(size[0], size[1])
        })
        it('title should be Kyselyt', function () {
            cy.title().should('eq', 'Ilmastokompassi')
        })

        it('Open join-group dialog and joining with nonexistent group token fails', function () {
            cy.joinGroupWithToken('TOKENI', 'Ryhmään liittyminen epäonnistui!')
        })

        it('Open join-group dialog and joining with empty inputfield fails', function () {
            cy.joinGroupWithToken('', 'Ryhmään liittyminen epäonnistui!')
        })

        it('Open join-group dialog and joining with too long token fails', function () {
            cy.joinGroupWithToken(
                'LIIANPITKATUNNUS',
                'Ryhmään liittyminen epäonnistui!'
            )
        })

        it('Open join-group dialog and joining with special character fails', function () {
            cy.joinGroupWithToken('MOI!!!', 'Ryhmään liittyminen epäonnistui!')
        })
        // Tests are waiting for proper test setup, Paulus is working on it

        // it('Open join-group dialog and join with correct token succeeds', function () {
        //     cy.createGroupWithToken('TOKEN')
        //     cy.joinGroupWithToken('TOKEN')
        //     cy.get('#btn-show-group-info').click()
        //     cy.contains('TOKEN')
        // })
        // it('Open join-group dialog and join with correct token, exit group', function () {
        //     cy.createGroupWithToken('TOKEN')
        //     cy.joinGroupWithToken('TOKEN')
        //     cy.get('#btn-show-group-info').click()
        //     cy.contains('TOKEN')
        //     cy.get('#btn-leave-group').click()
        //     cy.get('#btn-show-group-info').click()
        //     cy.contains('Et ole ryhmässä')
        // })
        // it('Join group and start survey solo succeeds', function () {
        //     cy.createGroupWithToken('TOKEN')
        //     cy.joinGroupWithToken('TOKEN')
        //     cy.visit('/kyselyt')
        //     cy.get('#btn-show-group-info').click()
        //     cy.contains('TOKEN')
        //     cy.get('#group-token').click()
        //     cy.get('#btn-survey-alone').click()
        //     cy.get('#btn-show-group-info').click()
        //     cy.contains('Et ole ryhmässä')
        // })
    })
})
