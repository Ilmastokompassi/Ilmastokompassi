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
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('#btn-create-group-dialog').click()
    cy.get('#dialog-create-group')
    if (groupToken) {
        cy.get('#input-create-group-token').type(groupToken)
    }
    cy.get('#input-create-group-token').should('have.value', groupToken)
    cy.get('#btn-create-group-token').click()
    if (alertMsg) {
        cy.waitUntil(() => stub.calledWith(alertMsg))
    } else {
        cy.get('#group-created-dialog')
        cy.should('contain', 'Ryhmä luotu onnistuneesti!')
        cy.get('#btn-group-created-ok').click()
    }
})

Cypress.Commands.add('joinGroupWithToken', (groupToken, alertMsg) => {
    const stub = cy.stub()
    cy.on('window:alert', stub)

    cy.get('#btn-join-group-dialog').click()
    cy.get('#dialog-join-group')
    if (groupToken) {
        cy.get('#input-join-group-token').type(groupToken)
    }
    cy.get('#input-join-group-token').should('have.value', groupToken)

    cy.get('#btn-join-group-token').click()
    if (alertMsg) {
        cy.waitUntil(() => stub.calledWith(alertMsg))
    }
})
