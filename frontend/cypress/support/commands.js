// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-wait-until'

Cypress.Commands.add('createGroupWithToken', (groupToken, alertMsg) => {
    cy.get('#btn-create-group-dialog').click()
    cy.get('#dialog-create-group')
    if (groupToken) {
        cy.get('#input-create-group-token').type(groupToken)
    }
    cy.get('#input-create-group-token').should('have.value', groupToken)
    if (alertMsg) {
        if (groupToken === '') {
            cy.get('#btn-create-group-token').click()
        }
        cy.get('#dialog-create-group')
        cy.contains(alertMsg)
    } else {
        cy.get('#btn-create-group-token').click()
        cy.get('#group-created-dialog')
        cy.should('contain', `Ryhmä ${groupToken} luotu onnistuneesti!`)
        cy.get('#btn-group-created-ok').click()
    }
})

Cypress.Commands.add('joinGroupWithToken', (groupToken, alertMsg) => {
    if (groupToken) {
        cy.get('#input-group-token').type(groupToken)
    }
    cy.get('#btn-join-group').click()
    if (alertMsg) {
        cy.contains(alertMsg)
    }
})
