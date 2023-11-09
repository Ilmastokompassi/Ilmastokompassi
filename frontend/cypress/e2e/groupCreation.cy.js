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
            cy.createGroupWithToken('GROUP')
        })

        it('Creating group with empty inputfield fails', function () {
            //THIS TEST DOES NOT WORK pls fix. change the "Luo" button 
            // in groupCreation to disabled from the start. 
            // Might require other changes to the tests aswell. 
            cy.createGroupWithToken('', 'Luo uusi ryhmä')
        })

        it('Creating group with too long token fails', function () {
            cy.createGroupWithToken('12345678901', 'Tarkista ryhmätunnus.')
        })

        it('Creating group with special character fails', function () {
            cy.createGroupWithToken('MORO!!', 'Tarkista ryhmätunnus.')
        })
    })
})
