import 'cy-mobile-commands'

describe('From survey page large ', function () {
    beforeEach(function () {
        cy.visit('/kysymys/2')
        cy.viewport('iphone-5')
    })

    it('Move forward on survey page using swipe', function () {
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 2.')
        cy.get('#question-stack').swipe('right', 'left')
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 3.')
    })
    it('Move back on survey page using swipe', function () {
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 2.')
        cy.get('#question-stack').swipe('left', 'right')
        cy.title().should('eq', 'Ilmastoprofiili - Kysymys 1.')
    })
})
