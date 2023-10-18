describe('From survey page large', function () {
    beforeEach(function () {
        cy.visit('/survey')
        cy.viewport(900, 1000)
    })

    it('title should be Kysely', function () {
        cy.title().should('eq', 'Kysely')
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
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#btn-create-group-dialog').click()
        cy.get('#dialog-create-group')
        cy.get('#input-create-group-token').type('GROUP')
        cy.get('#input-create-group-token').should('have.value', 'GROUP')

        cy.get('#btn-create-group-token').click()

        cy.waitUntil(() => stub.calledWith('Ryhmä luotu onnistuneesti!')).then(
            () => {
                expect(stub.getCall(0)).to.be.calledWith(
                    'Ryhmä luotu onnistuneesti!'
                )
            }
        )
    })

    it('Creating group with empty inputfield fails', function () {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#btn-create-group-dialog').click()
        cy.get('#dialog-create-group')
        cy.get('#input-create-group-token').should('have.value', '')
        cy.get('#btn-create-group-token').click()

        cy.waitUntil(() =>
            stub.calledWith('Ryhmätunnus ei voi olla tyhjä merkkijono.')
        )
    })

    it('Creating group with too long token fails', function () {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#btn-create-group-dialog').click()
        cy.get('#dialog-create-group')
        cy.get('#input-create-group-token').type('12345678901')
        cy.get('#input-create-group-token').should('have.value', '12345678901')
        cy.get('#btn-create-group-token').click()

        cy.waitUntil(() =>
            stub.calledWith('Ryhmätunnus ei voi olla yli 10 merkkiä pitkä.')
        )
    })

    it('Creating group with special character fails', function () {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#btn-create-group-dialog').click()
        cy.get('#dialog-create-group')
        cy.get('#input-create-group-token').type('MORO!')
        cy.get('#input-create-group-token').should('have.value', 'MORO!')
        cy.get('#btn-create-group-token').click()

        cy.waitUntil(() =>
            stub.calledWith(
                'Ryhmätunnus voi sisältää vain isoja kirjaimia ja numeroita.'
            )
        )
    })
})
