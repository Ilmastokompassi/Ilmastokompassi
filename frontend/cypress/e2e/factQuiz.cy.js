describe('Quiz page', function () {
    beforeEach(() => cy.visit('/tietovisa/1'))

    Cypress.env('viewports').forEach((viewport) => {
        describe(
            `on ${viewport[0]}x${viewport[1]} viewport`,
            {
                viewportWidth: viewport[0],
                viewportHeight: viewport[1],
            },
            () => {
                it('First question and answer options are rendered', function () {
                    cy.title().should('eq', 'Tietovisa - Kysymys 1.')
                    cy.contains(
                        '1. Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?'
                    )
                    cy.contains(
                        'Käynnissä oleva kasvihuoneilmiön voimistuminen on seurausta ihmisen toimista'
                    )
                    cy.contains('Hiilidioksidi on kasvihuonekaasu')
                    cy.contains(
                        'Lämpösäteily kulkee ilmakehässä sekä kohti maanpintaa että kohti avaruutta'
                    )
                    cy.contains(
                        'Suurin osa saapuvasta auringonsäteilystä imeytyy maanpinnalle'
                    )
                    cy.contains(
                        'Kaasut eivät vaikuta lämpösäteilyn kulkuun ilmakehässä'
                    )
                    cy.contains('Muilla planeetoilla ei ole kasvihuoneilmiötä')
                    cy.contains(
                        'Ihmistoiminnasta johtuva otsonikato on aiheuttanut ilmaston lämpenemisen'
                    )
                })

                it('Select one answer, press "Vastaa" and press "Oikeat vastaukset"', function () {
                    cy.title().should('eq', 'Tietovisa - Kysymys 1.')
                    cy.contains(
                        '1. Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?'
                    )
                    cy.contains(
                        'Käynnissä oleva kasvihuoneilmiön voimistuminen on seurausta ihmisen toimista'
                    ).click()
                    cy.contains('Vastaa').click()

                    cy.contains('Oikeat vastaukset').click()

                    cy.contains('Olet valinnut oikein 1')
                })

                it('Select one answer, press "Vastaa" and move to next question"', function () {
                    cy.title().should('eq', 'Tietovisa - Kysymys 1.')
                    cy.contains(
                        '1. Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?'
                    )
                    cy.contains(
                        'Käynnissä oleva kasvihuoneilmiön voimistuminen on seurausta ihmisen toimista'
                    ).click()
                    cy.contains('Vastaa').click()
                    cy.contains('Seuraava kysymys').click()

                    cy.title().should('eq', 'Tietovisa - Kysymys 2.')
                })

                it('Move from first question to last question and answer question with answer option', function () {
                    cy.title().should('eq', 'Tietovisa - Kysymys 1.')
                    cy.contains('1/8')

                    cy.visit('/tietovisa/8')
                    cy.title().should('eq', 'Tietovisa - Kysymys 8.')
                    cy.contains(
                        '8. Käynnissä olevalla ilmastonmuutoksella on paljon vaikutuksia maapallon eliölajien ja populaatioiden hyvinvointiin. Osaatko sanoa, mitkä seuraavista väitteistä ovat totta ja mitkä tarua?'
                    )
                    cy.contains('8/8')

                    cy.contains(
                        'Kaikki eliölajit eivät pysty sopeutumaan nopeasti muuttuviin elinolosuhteisiin'
                    ).click()
                    cy.contains('Vastaa').click()
                    cy.contains('Oikeat vastaukset')
                    cy.contains('Selitykset').click()
                    cy.contains(
                        'Ihmisten toiminnan aiheuttaman ilmastonmuutoksen myötä mm. vuodenaikojen pituudet ja ajankohdat sekä paikalliset sademäärät muuttuvat, mikä muuttaa lajien elinalueita, vuodenkiertoa, yhteisöjen rakenteita ja ekosysteemien toimintaa.'
                    )

                    cy.contains('Lopeta kysely')
                })

                it('Selecting correct answer renders correct checkmark after submitting answer', function () {
                    cy.title().should('eq', 'Tietovisa - Kysymys 1.')
                    cy.contains(
                        '1. Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?'
                    )
                    cy.contains(
                        'Käynnissä oleva kasvihuoneilmiön voimistuminen on seurausta ihmisen toimista'
                    ).click()
                    cy.contains('Vastaa').click()
                    cy.get('.MuiSvgIcon-root.MuiSvgIcon-colorSuccess')
                })

                it('Selecting incorrect answer renders incorrect checkmark after submitting answer', function () {
                    cy.visit('/tietovisa/2')
                    cy.title().should('eq', 'Tietovisa - Kysymys 2.')
                    cy.contains(
                        '2. Ilmastonmuutos aiheuttaa muutoksia luonnossa ja nämä muutokset puolestaan vaikuttavat ilmastonmuutokseen. Mitä luulet, mitkä seuraavista ilmiöistä voimistavat ilmastonmuutosta?'
                    )

                    cy.contains(
                        'Kasvien hiilensidonnan (photosynteesin) lisääntyminen'
                    ).click()
                    cy.contains('Vastaa').click()
                    cy.get('.MuiSvgIcon-root.MuiSvgIcon-colorError')
                })
            }
        )
    })
})
