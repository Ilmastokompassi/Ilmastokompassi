BEGIN;

INSERT INTO quiz_questions(id, content, info_text, introduction) 
  VALUES 
    (1, 'Ilmastonmuutokseen liittyviä väitteitä on kaikenlaisia. Tunnistatko mitkä seuraavista ovat totta?', E'Näin on näkkileipä. Ilmastonmuutoksen taustalla on paljon fysiikkaa sekä kemiaa, kuten säteilyä ja kasvihuonekaasuja. Maapallo ei ole kuitenkaan yksin kasvihuonekaasuilmiön kanssa, vaan sitä tapahtuu muillakin planeetoilla. Erona tosin on se, että täällä se on lähtöisin ihmisen toiminnasta ja sen vuoksi voimistunut viime aikoina aika lailla.', E''),
    (2, 'Ilmastonmuutos aiheuttaa muutoksia luonnossa ja nämä muutokset puolestaan vaikuttavat ilmastonmuutokseen. Mitä luulet, mitkä seuraavista ilmiöistä voimistavat ilmastonmuutosta?', 'Nämä ovat niin kutsuttuja palauteilmiöitä. Eli ilmastonmuutoksesta johtuvia tapahtumia, ja jotka puolestaan voimistavat tai heikentävät ilmastonmuutosta, johtaen näin ketjureaktioon. Jos ihmisten ilmastonmuutosta voimistava toiminta loppuisi tänään, palauteilmiöt vaikuttaisivat maapallon lämpötilaan vielä seuraavien tuhannen vuoden ajan. Esimerkiksi merivirtojen tasaantuminen vie hyvin kauan.', E''),
    (3, 'Muutokset ovat kuitenkin hyvin erilaisia eri puolilla maapalloa. Osaatko sanoa, mitkä seuraavista väitteistä pitävät paikkansa?', 'Ilmastosysteemiin kuuluvat ilmakehä, vesikehä, maaperä, lumi- ja jääpeite sekä biosfääri (erilaiset kasvillisuudet). Muutokset lämpötilassa vaikuttavat näihin kaikkiin ja hyvin eri tavoin. Esimerkiksi siinä missä lumi- ja jääpeite sulaa, merenpinta puolestaan nousee. Meret ja maaperä lämpenevät ja kasvillisuus eri puolilla maapalloa muuttuu. Toisaalla sataa enemmän kuin aiemmin, toisaalla taas on kuivempaa kuin ennen.', E''),
    (4, 'Ilmastonmuutoksen yhteydessä puhutaan paljon hiilidioksidista, sillä sen osuus on kasvanut hurjasti! Tähän liittyen alla on kaikenlaisia väitteitä. Tunnistatko oikeat väittämät?', E'Energiateollisuus ja liikenne aiheuttavat suurimmat hiilipäästöt Suomessa. Nämä hiilipäästöt varastoituvat ympäri maapalloa. Osa vapautuneesta hiilestä jää ilmakehään. Sitä enemmän, hiiltä on kuitenkin varastoituneena hyisen kylmän ikiroudan rakenteissa sekä merien syvyyksissä. Suurin osa hiilestä on sitoutuneena litosfäärin (eli maapallon kivikuoren) kerogeeneissä.\n\nHiilidioksidipäästöjen vähentämistä tavoitellaan. Tämä vaatii kuitenkin nykyisten rakenteiden ja kulutustottumusten muuttamista. Hiilijalanjälki on käsite, jonka avulla arvioidaan hiilipäästöjä. Hiilijalanjäljen laskeminen auttaa ensisijaisesti yrityksiä, kuntia ja valtioita arvioimaan omia hiilipäästöjään. Sitä voidaan käyttää yksilönkin hiilipäästöjen arvioimiseen, mutta on hyvä pyrkiä yhteiseen muutokseen, jossa jokaisella on rooli ja jaettu vastuu. Energiajärjestelmän ilmastoneutraalius tarkoittaisi sitä, että sen hiilijalanjälki olisi nolla.', E''),
    (5, 'Miten ilmastomallien epävarmuuksia voisi vähentää?', E'Ilmastomalli vaatii suuren määrän laskentatehoa toimiakseen. Siitä huolimatta pienten ilmiöiden jättäminen pois ei tarkenna lopputuloksia. Myöskään ainoastaan suurten ilmaston ilmiöiden seuraaminen ei paranna mallia vaan tekee siitä epätarkemman.', E'Ilmastomalleilla koetetaan kartoittaa, miltä ilmasto tulevaisuudessa voisi näyttää. Ilmastomalleilla tarkoitetaan kolmiulotteisia ilmakehä-valtamerimalleja, jotka kuvaavat ilmakehän ja valtamerten käyttäytymistä päästöskenaarioita ja fysiikan lakeja käyttäen. Ilmastomallit eivät ole kuitenkaan täydellisiä ennustamisen välineitä, vaan niissä esiintyy epävarmuuksia.'),
    (6, 'Ilmastomallit sekä tehdyt mittaukset ja havainnot ovat kuitenkin tarjonneet arvokasta tietoa jo tapahtuneista ja tulevaisuudessa esiintyvistä muutoksista. Mitä arvelet, mitkä seuraavista ovat ilmastonmuutoksen seurauksista nousussa/lisääntymässä?', E'Näin on ilmastomalleilla havaittu. Lämpötilan nousulla on monenlaisia vaikutuksia. Merenpinta nousee, kun mannerjäätiköt sulavat ja vesi lämpölaajenee. Lumisateet, jäät ja pakkanen vähenevät, kun taas äärimmäinen kuumuus lisääntyy. Pilvissä tapahtuvat muutokset ovat hyvin epävarmoja, mutta on todennäköistä, että pilvisyys lisääntyy. Joillain alueilla, kuten Suomessa, sademäärät lisääntyvät. Toisaalla, kuten Välimeren alueella, sademäärät vähenevät ja kuivuus lisääntyy.', E''),
    (7, 'Ilmastonmuutos vaatii kaikilta maapallolla kykyä sopeutua. Vaan mitä se tarkoittaa! Osaatko sanoa, mitkä seuraavista ovat esimerkkejä sopeutumista?', E'Ilmastonmuutos tulee lisäämään epätasa-arvoisuuksia, köyhyyttä sekä riskejä ihmisten fyysiselle ja psyykkiselle terveydelle. Ilmastoilmiöt vaikuttavat elinolosuhteisiin ja elinkeinomahdollisuuksiin esimerkiksi tuhoamalla koteja ja pienentämällä satoja. Heikoimmassa asemassa olevilla ei usein ole mahdollisuuksia muuttaa toiselle alueelle tai sopeutua muutoksiin. Esimerkki tilanteesta, jossa sopeutumisen rajat ylitetään, on, kun alue muuttuu elinkelvottomaksi. Ilmastonmuutokseen sopeutuminen vaatii niin taloudellisia kuin henkisiä resursseja. Välillä ilmastonmuutoksen hillintä- ja sopeutumistoimilla voi olla ristiriitaisiakin vaikutuksia.\n\nEsimerkki:\n\nKaupunkien tiivistäminen voi vähentää liikenteen päästöjä ja toimia näin hillintätoimena. Samanaikaisesti se voi kuitenkin myös lisätä lämpöstressiä kaupungissa, mikä on ilmastovaikutus. Lisääntynyt lämpöstressi voi puolestaan lisätä sisätilojen ilmastoinnin tarvetta, joka on sopeutumistoimenpide. Lisääntynyt ilmastoinnin käyttö taasen kasvattaa kasvihuonekaasupäästöjä ja voimistaa osaltaan ilmastonmuutosta. 
                --> negatiivinen eli konfliktinen vaikutus\n\nSopivien puiden tai muun kasvillisuuden lisääminen kaupunkialueella, mikä sitoo hiilidioksidia ja vähentää paikallisesti lämpötilojen kasvua. 
              --> positiivinen eli synerginen vaikutus', E''),
    (8, 'Käynnissä olevalla ilmastonmuutoksella on paljon vaikutuksia maapallon eliölajien ja populaatioiden hyvinvointiin. Osaatko sanoa, mitkä seuraavista väitteistä ovat totta?', E'Ihmisten toiminnan aiheuttaman ilmastonmuutoksen myötä mm. vuodenaikojen pituudet ja ajankohdat sekä paikalliset sademäärät muuttuvat, mikä muuttaa lajien elinalueita, vuodenkiertoa, yhteisöjen rakenteita ja ekosysteemien toimintaa.\n\nIhmisen olemassaolo ja hyvinvointi taas ovat täysin riippuvaisia luonnon ekosysteemeistä. Ilman terveitä ja toimivia ekosysteemejä meillä ei ole juomakelpoista vettä, viljavaa maata tai puhdasta ilmaa hengittää.', E'');

INSERT INTO quiz_question_options(id, option, is_correct, question_id)
  VALUES
    (1, 'Ihmistoiminnasta johtuva otsonikato on aiheuttanut ilmaston lämpenemisen', 'false', 1),
    (2, 'Hiilidioksidi on kasvihuonekaasu', 'true', 1),
    (3, 'Lämpösäteily kulkee ilmakehässä sekä kohti maanpintaa että kohti avaruutta', 'true', 1),
    (4, 'Käynnissä oleva kasvihuoneilmiön voimistuminen on seurausta ihmisen toimista', 'true', 1),
    (5, 'Suurin osa saapuvasta auringonsäteilystä imeytyy maanpinnalle', 'true', 1),
    (6, 'Kaasut eivät vaikuta lämpösäteilyn kulkuun ilmakehässä', 'false', 1),
    (7, 'Muilla planeetoilla ei ole kasvihuoneilmiötä', 'false', 1),
    (8, 'Vesihöyryn lisääntyminen ilmakehässä ilmaston lämmetessä', 'true', 2),
    (9, 'Ikiroudan (ja jäätiköiden) sulaminen', 'true', 2),
    (10, 'Kasvien hiilensidonnan (photosynteesin) lisääntyminen', 'false', 2),
    (11, 'Merenpinta on laskenut monin paikoin', 'false', 3),
    (12, 'Arktinen alue on lämmennyt enemmän kuin päiväntasaaja', 'true', 3),
    (13, 'Maa-alueiden ja alailmakehän lämpötila on noussut', 'true', 3),
    (14, 'Keskimääräinen pintalämpötila on noussut tasaisesti koko vuosisadan ajan', 'false', 3),
    (15, 'Ilmasto kuvaa sään hetkellistä olotilaa', 'false', 3),
    (16, 'Arktisen merijään määrä on laskenut', 'true', 3),
    (17, 'Suuri hiilijalanjälki auttaa ilmastonmuutoksen hillitsemisessä', 'false', 4),
    (18, 'Ilmastoneutraali energiajärjestelmä tarkoittaa, että energiajärjestelmän hiilijalanjälki on suurempi kuin nolla', 'false', 4),
    (19, 'Suomen suurimmat hiilipäästöt tulevat energiateollisuudesta ja liikenteestä', 'true', 4),
    (20, 'Maailman hiilivarastot pienimmästä suurimpaan; Ilmakehä, Ikirouta, Meret, (litosfäärin, eli maapallon kivikuoren) Kerogeenit', 'true', 4),
    (21, 'Hiilikädenjälki mittaa kaikkea sitä hyvää, mitä teemme ilmaston eteen', 'true', 4),
    (22, 'Tekemällä parempia ja yksityiskohtaisempia mittauksia', 'true', 5),
    (23, 'Keskittymällä vain ilmastonmuutoksen suuriin ilmiöihin', 'false', 5),
    (24, 'Jättämällä pienet ilmiöt pois ilmastomalleista', 'false', 5),
    (25, 'Tarkentamalla ilmastomallin yksityiskohtia', 'true', 5),
    (26, 'Pysäyttämällä ilmakehän hiilidioksidipitoisuuden kasvu', 'true', 5),
    (27, 'Merenpinta', 'true', 6),
    (28, 'Lumisateet kylmillä alueilla', 'true', 6),
    (29, 'Äärimmäinen kylmyys', 'false', 6),
    (30, 'Sateet Välimeren alueella', 'false', 6),
    (31, 'Jään sulaminen', 'true', 6),
    (32, 'Äärimmäinen kuumuus', 'true', 6),
    (33, 'Rankkasateet', 'true', 6),
    (34, 'Pilvisyys', 'true', 6),
    (35, 'Pakkaspäivät', 'false', 6),
    (36, 'Ilmastossa tapahtuneisiin muutoksiin mukautuminen', 'true', 7),
    (37, 'Ilmastonmuutoksen positiivisten vaikutusten hyödyntäminen', 'true', 7),
    (38, 'Taloudellisista syistä peruttu tulvariskialueelle rakentaminen', 'true', 7),
    (39, 'Ilmastonmuutoksen myötä sateisuus lisääntyy kaikkialla maailmassa ja makean veden saanti parantuu', 'false', 8),
    (40, 'Kaikki eliölajit eivät pysty sopeutumaan nopeasti muuttuviin elinolosuhteisiin', 'true', 8),
    (41, 'Ilmastonmuutoksen lisäämät kuivuudet ja tulvat voivat vaikuttaa ravinnon saatavuuteen', 'true', 8),
    (42, 'Ilmastonmuutoksen lisäämät helleaallot aiheuttavat ennenaikaisia kuolemia', 'true', 8);

COMMIT;