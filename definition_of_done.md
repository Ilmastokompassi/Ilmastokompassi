# Definition of Done

1. Hyväksymiskriteerit tehty.
2. Koodi:
  * eslintin mukainen
  * virheiden käsittely hoidettu, esim. koodi antaa käyttäjälle palautetta, jos salasana on väärä
3. Testaus:
  * featuret on testattu huolellisesti
  * koko ohjelmisto toimii uuden featuren kanssa
4. Tietoturva:
  * vain käyttäjä, jolla on oikeus featureen, pystyy käyttämään sitä
  * ohjelmistossa oleva tieto ei ole saatavilla sellaiselle käyttäjälle, jolla ei ole siihen oikeutta 
  * arkaluontoista tietoa, kuten salasanoja, ei tallenneta selväsanaisina tietokantaan
5. Peer review
  * ennen kuin koodi lisätään main-haaraan, sille tehdään pull request
  * pull requestin tarkastaa joku muu kuin koodin kirjoittaja
6. Asiakas hyväksyy user storyn. 
