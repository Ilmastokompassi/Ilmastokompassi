Cypress.env('screen_sizes').forEach((size) => {
    describe(`Group creation ${size[2]}`, function () {
        beforeEach(function () {
            cy.visit('/kyselyt')
            cy.viewport(size[0], size[1])
        })

        it('title should be Kyselyt', function () {
            cy.title().should('eq', 'Kyselyt')
        })

        it('Open create-group dialog and press cancel', function () {
            cy.get('#btn-create-group-dialog').click()
            cy.get('#dialog-create-group')
            cy.get('#btn-cancel-group-creation').click()
            cy.get('#dialog-create-group').should('not.exist')
        })

        it('Open create-group dialog and press esc-key', function () {
            cy.get('#btn-create-group-dialog').click()
            cy.get('#dialog-create-group')
            cy.get('#dialog-create-group').type('{esc}')
            cy.get('#dialog-create-group').should('not.exist')
        })

        it('Open create-group dialog and create token', function () {
            cy.createGroupWithToken('GROUP', 'Ryhmä luotu onnistuneesti!')
        })

        it('Creating group with empty inputfield fails', function () {
            cy.createGroupWithToken(
                '',
                'Ryhmätunnus ei voi olla tyhjä merkkijono.'
            )
        })

        it('Creating group with too long token fails', function () {
            cy.createGroupWithToken(
                '12345678901',
                'Ryhmätunnus ei voi olla yli 10 merkkiä pitkä.'
            )
        })

        it('Creating group with special character fails', function () {
            cy.createGroupWithToken(
                'MORO!!',
                'Ryhmätunnus voi sisältää vain isoja kirjaimia ja numeroita.'
            )
        })
    })
})
