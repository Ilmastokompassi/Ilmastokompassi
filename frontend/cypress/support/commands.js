import 'cypress-wait-until'
import '@testing-library/cypress/add-commands'
import 'cy-mobile-commands'
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
    cy.request('POST', '/api/groups/new', { groupToken: groupToken }).then(
        (response) => {
            expect(response.status).equals(201)
            expect(response.body).to.have.property('group_token', groupToken)
        }
    )
})

Cypress.Commands.add('answerRoleSurveyWithApi', (groupToken, responses) => {
    cy.request('POST', '/api/survey/submit', {
        groupToken: groupToken,
        responses: responses,
    }).then((response) => {
        expect(response.status).equals(200)
    })
})

Cypress.Commands.add('joinGroup', (groupToken) => {
    cy.request('/api/groups/' + groupToken).then((response) => {
        expect(response.body).to.have.property('group_token', groupToken)

        window.localStorage.setItem('groupToken', groupToken)
    })
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

Cypress.Commands.add('nextQuizQuestion', () => {
    cy.findByTestId('quiz-answer-button').click()
    cy.findByTestId('quiz-next-button').click()
})
