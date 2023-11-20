Cypress.env('screen_sizes').forEach((size) => {
    describe(`Group creation ${size[2]}`, function () {
        beforeEach(function () {
            cy.visit('/')
            cy.viewport(size[0], size[1])
        })

        it('title should be Ilmastokompassi', function () {
            cy.title().should('eq', 'Ilmastokompassi')
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

        // Remember to reste database before running this test

        it('Open create-group dialog and create token', function () {
            if (size[2] === 'Large') {
                cy.createGroupWithToken('CREATETEST')
            } else {
                cy.createGroupWithToken('SMLSCRTEST')
            }
        })

        it('Creating group with empty inputfield fails', function () {
            cy.createGroupWithToken('', 'Ryhmätunnus ei voi olla tyhjä.')
        })

        it('Creating group with too long token fails', function () {
            cy.createGroupWithToken('12345678901', 'Tarkista ryhmätunnus')
        })

        it('Creating group with special character fails', function () {
            cy.createGroupWithToken('MORO!!', 'Tarkista ryhmätunnus')
        })
    })
})
