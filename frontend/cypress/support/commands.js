import 'cypress-wait-until'
import '@testing-library/cypress/add-commands'
import { isMobile } from './utils'

Cypress.Commands.add(
    'typeIfNotEmpty',
    { prevSubject: true },
    (subject, textToType) => {
        if (textToType) {
            cy.wrap(subject).type(textToType)
        }
        return subject
    }
)

Cypress.Commands.add('createGroupWithApi', (groupToken) => {
    cy.request('POST', '/api/group/new', { token: groupToken }).then(
        (response) => {
            expect(response.body).to.have.property('group_token', groupToken)
            expect(response.body).to.have.property('status', 'success')
        }
    )
})

Cypress.Commands.add('navigateToPageWithNavBar', (pageId) => {
    if (isMobile()) {
        cy.findByTestId('navigation-hamburger').should('be.visible').click()

        cy.findByTestId('navigation-menu')
            .should('be.visible')
            .findByTestId(pageId + '-navigation-menu-item')
            .click()
    } else {
        cy.findByTestId(pageId + '-navigation-button')
            .should('be.visible')
            .click()
    }
})
