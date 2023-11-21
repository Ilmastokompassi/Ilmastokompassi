import 'cy-mobile-commands'

describe('Survey page on mobile', function () {
    beforeEach(function () {
        cy.visit('/kysymys/2')
        cy.viewport('iphone-se2')
    })

    it('move forward using swipe', function () {
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 2.')
        cy.findByTestId('questions').swipe('right', 'left')
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 3.')
    })

    it('move back using swipe', function () {
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 2.')
        cy.findByTestId('questions').swipe('left', 'right')
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 1.')
    })
})
