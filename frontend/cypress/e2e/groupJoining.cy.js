describe('From survey page large', function () {
    beforeEach(function () {
        cy.visit('/survey')
        cy.viewport(900, 1000)
    })

    it('title should be Kysely', function () {
        cy.title().should('eq', 'Kysely')
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
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#btn-join-group-dialog').click()
        cy.get('#dialog-join-group')
        cy.get('#input-join-group-token').type('SOUP')
        cy.get('#input-join-group-token').should('have.value', 'SOUP')

        cy.get('#btn-join-group-token').click()

        cy.waitUntil(() => stub.calledWith('Ryhmätunnusta ei löytynyt.'))
    })

    it('Open join-group dialog and joining with empty inputfield fails', function () {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#btn-join-group-dialog').click()
        cy.get('#dialog-join-group')
        cy.get('#input-join-group-token').should('have.value', '')
        cy.get('#btn-join-group-token').click()

        cy.waitUntil(() => stub.calledWith('Syötä ryhmätunnus.'))
    })

    it('Open join-group dialog and joining with too long token fails', function () {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#btn-join-group-dialog').click()
        cy.get('#dialog-join-group')
        cy.get('#input-join-group-token').type('LIIANPITKÄTOKEN')
        cy.get('#input-join-group-token').should(
            'have.value',
            'LIIANPITKÄTOKEN'
        )
        cy.get('#btn-join-group-token').click()

        cy.waitUntil(() =>
            stub.calledWith('Ryhmätunnus ei voi olla yli 10 merkkiä pitkä.')
        )
    })

    it('Open join-group dialog and joining with special character fails', function () {
        const stub = cy.stub()
        cy.on('window:alert', stub)

        cy.get('#btn-join-group-dialog').click()
        cy.get('#dialog-join-group')
        cy.get('#input-join-group-token').type('MORO!')
        cy.get('#input-join-group-token').should('have.value', 'MORO!')
        cy.get('#btn-join-group-token').click()

        cy.waitUntil(() =>
            stub.calledWith(
                'Ryhmätunnus voi sisältää vain isoja kirjaimia ja numeroita.'
            )
        )
    })
})
