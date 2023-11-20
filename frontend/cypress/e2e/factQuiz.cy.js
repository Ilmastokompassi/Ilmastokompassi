describe('From quiz page large ', function () {
    beforeEach(function () {
        cy.visit('/tietovisa/1')
        cy.viewport(900, 1000)
    })

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
        cy.contains('Kaasut eivät vaikuta lämpösäteilyn kulkuun ilmakehässä')
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
})
