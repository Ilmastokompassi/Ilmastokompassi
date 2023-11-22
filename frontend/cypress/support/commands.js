import 'cypress-wait-until'
import '@testing-library/cypress/add-commands'

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
