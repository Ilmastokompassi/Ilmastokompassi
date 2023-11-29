import { isMobile } from '../support/utils'

Cypress.env('viewports').forEach((viewport) => {
    describe(
        `Front page on ${viewport[2]}`,
        {
            viewportWidth: viewport[0],
            viewportHeight: viewport[1],
        },
        () => {
            beforeEach(() => cy.visit('/'))

            it('navigate to role survey page', function () {
                cy.navigateToPageWithNavBar('survey')

                cy.location('pathname').should('eq', '/ilmastoroolikysely')
                cy.title().should('eq', 'Ilmastoroolikysely')
            })

            it('navigate to quiz page', function () {
                cy.navigateToPageWithNavBar('quiz')

                cy.location('pathname').should('eq', '/oppimisvisa/1')
                cy.title().should('eq', 'Oppimisvisa - Kysymys 1.')
            })

            it('navigate to faq page', function () {
                cy.navigateToPageWithNavBar('faq')

                cy.location('pathname').should('eq', '/faq')
                cy.title().should('eq', 'Usein kysytyt kysymykset')
            })

            it('navigate to role survey page and back to front page', function () {
                cy.navigateToPageWithNavBar('survey')

                cy.location('pathname').should('eq', '/ilmastoroolikysely')
                cy.title().should('eq', 'Ilmastoroolikysely')
                if (isMobile()) {
                    cy.findByTestId('navigation-hamburger').click()
                    cy.findByTestId('landing-page-navigation-menu-item').click()
                } else {
                    cy.findByTestId('logo').click()
                }

                cy.location('pathname').should('eq', '/')
                cy.title().should('eq', 'Ilmastokompassi')
            })
        }
    )
})
