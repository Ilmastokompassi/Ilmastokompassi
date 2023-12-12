import theme from '../../src/theme'
import { hexToRgb } from '@mui/material'

describe('Quiz page', function () {
    beforeEach(() => {
        cy.visit('/')
        cy.contains('Oppimisvisa').click()
    })

    const successColor = hexToRgb(theme.palette.success.main)
    const errorColor = hexToRgb(theme.palette.error.main)
    const iconGray = hexToRgb(theme.palette.iconGray.main)

    Cypress.env('viewports').forEach((viewport) => {
        describe(
            `on ${viewport[0]}x${viewport[1]} viewport`,
            {
                viewportWidth: viewport[0],
                viewportHeight: viewport[1],
            },
            () => {
                it('First question and answer options are rendered', function () {
                    cy.title().should('eq', 'Oppimisvisa - Kysymys 1.')
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
                    cy.title().should('eq', 'Oppimisvisa - Kysymys 1.')
                    cy.contains(
                        '1. Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?'
                    )
                    cy.contains(
                        'Käynnissä oleva kasvihuoneilmiön voimistuminen on seurausta ihmisen toimista'
                    ).click()
                    cy.contains('Vastaa').click()

                    cy.contains('Oikeat vastaukset').click()
                })

                it('Select multiple answers, both wrong and right press "Vastaa" and press "Oikeat vastaukset"', function () {
                    cy.visit('/oppimisvisa/2')
                    cy.title().should('eq', 'Oppimisvisa - Kysymys 2.')

                    cy.contains(
                        'Vesihöyryn lisääntyminen ilmakehässä ilmaston lämmetessä'
                    ).click()
                    cy.contains('Ikiroudan (ja jäätiköiden) sulaminen').click()
                    cy.contains(
                        'Kasvien hiilensidonnan (photosynteesin) lisääntyminen'
                    ).click()
                    cy.contains('Vastaa').click()

                    cy.contains('Oikeat vastaukset').click()
                })

                it('Check that marks are correct color', function () {
                    cy.contains(
                        'Ihmistoiminnasta johtuva otsonikato on aiheuttanut ilmaston lämpenemisen'
                    ).click()
                    cy.contains(
                        'Suurin osa saapuvasta auringonsäteilystä imeytyy maanpinnalle'
                    ).click()
                    cy.contains('Vastaa').click()
                    cy.findByTestId('correct-answer-5').should(
                        'have.css',
                        'color',
                        successColor
                    )
                    cy.findByTestId('wrong-answer-1').should(
                        'have.css',
                        'color',
                        errorColor
                    )
                    cy.findByTestId('correct-answer-3').should(
                        'have.css',
                        'color',
                        iconGray
                    )
                    cy.findByTestId('wrong-answer-7').should(
                        'have.css',
                        'color',
                        iconGray
                    )
                })

                it('Select one answer, press "Vastaa" and move to next question"', function () {
                    cy.title().should('eq', 'Oppimisvisa - Kysymys 1.')
                    cy.contains(
                        '1. Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?'
                    )
                    cy.contains(
                        'Käynnissä oleva kasvihuoneilmiön voimistuminen on seurausta ihmisen toimista'
                    ).click()
                    cy.contains('Vastaa').click()
                    cy.contains('Seuraava kysymys').click()

                    cy.title().should('eq', 'Oppimisvisa - Kysymys 2.')
                })

                it('Move from first question to last question and answer question with answer option', function () {
                    cy.title().should('eq', 'Oppimisvisa - Kysymys 1.')
                    cy.contains('1/8')

                    cy.visit('/oppimisvisa/8')
                    cy.title().should('eq', 'Oppimisvisa - Kysymys 8.')
                    cy.contains(
                        '8. Käynnissä olevalla ilmastonmuutoksella on paljon vaikutuksia maapallon eliölajien ja populaatioiden hyvinvointiin. Osaatko sanoa, mitkä seuraavista väitteistä ovat totta?'
                    )
                    cy.contains('8/8')

                    cy.contains(
                        'Kaikki eliölajit eivät pysty sopeutumaan nopeasti muuttuviin elinolosuhteisiin'
                    ).click()
                    cy.contains('Vastaa').click()
                    cy.contains('Oikeat vastaukset')
                    cy.contains('Mistä tässä on kyse?').click()
                    cy.contains(
                        'Ihmisten toiminnan aiheuttaman ilmastonmuutoksen myötä mm. vuodenaikojen pituudet ja ajankohdat sekä paikalliset sademäärät muuttuvat, mikä muuttaa lajien elinalueita, vuodenkiertoa, yhteisöjen rakenteita ja ekosysteemien toimintaa.'
                    )

                    cy.contains('Lopeta kysely')
                })

                it('Selecting correct answer renders correct checkmark after submitting answer', function () {
                    cy.title().should('eq', 'Oppimisvisa - Kysymys 1.')
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
                    cy.visit('/oppimisvisa/2')
                    cy.title().should('eq', 'Oppimisvisa - Kysymys 2.')
                    cy.contains(
                        '2. Ilmastonmuutos aiheuttaa muutoksia luonnossa ja nämä muutokset puolestaan vaikuttavat ilmastonmuutokseen. Mitä luulet, mitkä seuraavista ilmiöistä voimistavat ilmastonmuutosta?'
                    )

                    cy.contains(
                        'Kasvien hiilensidonnan (photosynteesin) lisääntyminen'
                    ).click()
                    cy.contains('Vastaa').click()
                    cy.get('.MuiSvgIcon-root.MuiSvgIcon-colorError')
                })

                it('From start to finish', function () {
                    cy.findByTestId('answer-4').click()
                    cy.nextQuizQuestion()

                    cy.findByTestId('answer-8').click()
                    cy.nextQuizQuestion()

                    cy.findByTestId('answer-16').click()
                    cy.nextQuizQuestion()

                    cy.findByTestId('answer-20').click()
                    cy.nextQuizQuestion()

                    cy.findByTestId('answer-22').click()
                    cy.nextQuizQuestion()

                    cy.findByTestId('answer-27').click()
                    cy.nextQuizQuestion()

                    cy.findByTestId('answer-38').click()
                    cy.nextQuizQuestion()

                    cy.findByTestId('answer-40').click()
                    cy.findByTestId('quiz-answer-button').click()
                    cy.findByTestId('quiz-end-button').click()

                    cy.contains('Hyvää työtä !')
                })

                it('Summary page accordions work', function () {
                    cy.visit('/oppimisvisa/yhteenveto')

                    cy.contains(
                        'Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?'
                    ).click()
                    cy.contains(
                        'Käynnissä oleva kasvihuoneilmiön voimistuminen on seurausta ihmisen toimista'
                    )
                    cy.contains(
                        'Ihmistoiminnasta johtuva otsonikato on aiheuttanut ilmaston lämpenemisen'
                    ).should('not.exist')
                    cy.contains('Näin on näkkileipä.')

                    cy.contains(
                        'Ilmastonmuutos vaatii kaikilta maapallolla kykyä sopeutua. Vaan mitä se tarkoittaa! Osaatko sanoa, mitkä seuraavista ovat esimerkkejä sopeutumista?'
                    ).click()
                    cy.contains(
                        'Ilmastossa tapahtuneisiin muutoksiin mukautuminen'
                    )
                    cy.contains(
                        'Ilmastonmuutos tulee lisäämään epätasa-arvoisuuksia,'
                    )
                })

                it('Introduction text is rendered', function () {
                    cy.visit('/oppimisvisa/5')
                    cy.contains(
                        'Ilmastomalleilla koetetaan kartoittaa, miltä ilmasto tulevaisuudessa voisi näyttää. Ilmastomalleilla tarkoitetaan kolmiulotteisia ilmakehä-valtamerimalleja, jotka kuvaavat ilmakehän ja valtamerten käyttäytymistä päästöskenaarioita ja fysiikan lakeja käyttäen. Ilmastomallit eivät ole kuitenkaan täydellisiä ennustamisen välineitä, vaan niissä esiintyy epävarmuuksia.'
                    )
                })

                it('Show responses in previous question when not answered to next question', function () {
                    cy.contains(
                        'Suurin osa saapuvasta auringonsäteilystä imeytyy maanpinnalle'
                    ).click()
                    cy.contains(
                        'Ihmistoiminnasta johtuva otsonikato on aiheuttanut ilmaston lämpenemisen'
                    ).click()
                    cy.nextQuizQuestion()

                    cy.contains(
                        '2. Ilmastonmuutos aiheuttaa muutoksia luonnossa ja nämä muutokset puolestaan vaikuttavat ilmastonmuutokseen. Mitä luulet, mitkä seuraavista ilmiöistä voimistavat ilmastonmuutosta?'
                    )

                    cy.findByTestId('quiz-previous-button').click()

                    cy.findByTestId('wrong-answer-1').should(
                        'have.css',
                        'color',
                        errorColor
                    )
                    cy.findByTestId('correct-answer-5').should(
                        'have.css',
                        'color',
                        successColor
                    )
                    cy.findByTestId('correct-answer-3').should(
                        'have.css',
                        'color',
                        iconGray
                    )
                    cy.findByTestId('wrong-answer-6').should(
                        'have.css',
                        'color',
                        iconGray
                    )

                    cy.findByTestId('quiz-next-button').click()
                    cy.findByTestId('quiz-answer-button').should('be.disabled')
                })

                it('Show responses in previous question after answering and navigating to next question and back using button', function () {
                    cy.contains(
                        'Suurin osa saapuvasta auringonsäteilystä imeytyy maanpinnalle'
                    ).click()
                    cy.contains(
                        'Ihmistoiminnasta johtuva otsonikato on aiheuttanut ilmaston lämpenemisen'
                    ).click()
                    cy.nextQuizQuestion()

                    cy.contains(
                        '2. Ilmastonmuutos aiheuttaa muutoksia luonnossa ja nämä muutokset puolestaan vaikuttavat ilmastonmuutokseen. Mitä luulet, mitkä seuraavista ilmiöistä voimistavat ilmastonmuutosta?'
                    )
                    cy.contains('Ikiroudan (ja jäätiköiden) sulaminen').click()
                    cy.findByTestId('quiz-answer-button').click()

                    cy.findByTestId('quiz-previous-button').click()

                    cy.findByTestId('wrong-answer-1').should(
                        'have.css',
                        'color',
                        errorColor
                    )
                    cy.findByTestId('correct-answer-5').should(
                        'have.css',
                        'color',
                        successColor
                    )
                    cy.findByTestId('correct-answer-3').should(
                        'have.css',
                        'color',
                        iconGray
                    )
                    cy.findByTestId('wrong-answer-6').should(
                        'have.css',
                        'color',
                        iconGray
                    )

                    cy.findByTestId('quiz-next-button').click()

                    cy.findByTestId('quiz-previous-button').should('exist')
                    cy.findByTestId('quiz-next-button').should('exist')
                })

                it('Show responses in previous question after answering and navigating to next question and back using link', function () {
                    cy.contains(
                        'Suurin osa saapuvasta auringonsäteilystä imeytyy maanpinnalle'
                    ).click()
                    cy.contains(
                        'Ihmistoiminnasta johtuva otsonikato on aiheuttanut ilmaston lämpenemisen'
                    ).click()
                    cy.nextQuizQuestion()

                    cy.contains(
                        '2. Ilmastonmuutos aiheuttaa muutoksia luonnossa ja nämä muutokset puolestaan vaikuttavat ilmastonmuutokseen. Mitä luulet, mitkä seuraavista ilmiöistä voimistavat ilmastonmuutosta?'
                    )
                    cy.contains('Ikiroudan (ja jäätiköiden) sulaminen').click()
                    cy.findByTestId('quiz-answer-button').click()

                    cy.visit('/oppimisvisa/1')
                    cy.findByTestId('wrong-answer-1').should(
                        'have.css',
                        'color',
                        errorColor
                    )
                    cy.findByTestId('correct-answer-5').should(
                        'have.css',
                        'color',
                        successColor
                    )
                    cy.findByTestId('correct-answer-3').should(
                        'have.css',
                        'color',
                        iconGray
                    )
                    cy.findByTestId('wrong-answer-6').should(
                        'have.css',
                        'color',
                        iconGray
                    )

                    cy.findByTestId('quiz-next-button').click()

                    cy.findByTestId('quiz-next-button').should('exist')
                })
            }
        )
    })
})
