Cypress.env('viewports').forEach((viewport) => {
    describe(
        `Front page on ${viewport[2]}`,
        {
            viewportWidth: viewport[0],
            viewportHeight: viewport[1],
        },
        () => {
            beforeEach(() => cy.visit('/'))

            it('Footer has correct content', function () {
                cy.get('footer').should('exist')
                cy.get('footer').should('contain', '2023')
                cy.get('footer').should('contain', '© Helsingin yliopisto')
                cy.get('footer').should('contain', 'INAR')
                cy.get('footer').should('contain', 'ClimComp')
            })

            it('Footer has correct links', function () {
                cy.get('footer .footer_link').should('have.length', 2)
                cy.get('footer .footer_link')
                    .eq(0)
                    .should(
                        'have.attr',
                        'href',
                        'https://www.helsinki.fi/fi/inar'
                    )
                cy.get('footer .footer_link')
                    .eq(1)
                    .should(
                        'have.attr',
                        'href',
                        'https://blogs.helsinki.fi/climatecompetencies/about/'
                    )
            })
        }
    )
})
