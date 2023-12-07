import { Typography, Box, Card, Container, CardContent } from '@mui/material'
import { useTitle } from '../hooks/useTitle'

export function FaqPage() {
    useTitle('Usein kysytyt kysymykset')
    return (
        <Container>
            <Box paddingY={6}>
                <Card>
                    <CardContent>
                        <Box marginLeft={1} paddingY={2}>
                            <Typography textAlign={'center'} variant="h1">
                                Usein kysytyt kysymykset
                            </Typography>
                            <Typography
                                marginTop={4}
                                marginBottom={4}
                                textAlign={'center'}
                                variant="h2"
                            >
                                Täältä löydät vastauksia usein kysyttyihin
                                kysymyksiin.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Mikä on Ilmastokompassi?
                            </Typography>
                            <Typography marginBottom={2}>
                                Ilmastokompassi on ilmastonmuutokseen liittyvä
                                oppimisalusta, joka tarjoaa oppimateriaalia
                                ilmastonmuutoksesta ja sen hillinnästä.
                                Ilmastokompassi on suunnattu erityisesti
                                yläkoululaisille ja lukiolaisille, mutta
                                soveltuu myös muille ilmastonmuutoksesta
                                kiinnostuneille.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Miten voin navigoida sivustolla?
                            </Typography>
                            <Typography marginBottom={2}>
                                Sivuston navigointi onnistuu sivuston
                                yläreunasta löytyvien painikkeiden avulla.
                                Painamalla painiketta pääset sivuston kyseiseen
                                osioon. Logo ja &quot;Ilmastokompassi&quot;
                                vievät sivuston etusivulle.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Mikä on Ilmastoroolikysely?
                            </Typography>
                            <Typography marginBottom={2}>
                                Ilmastoroolikysely on kysely, joka selvittää,
                                mikä neljästä ilmastoroolista kuvastaa sinua.
                                Ilmastoroolikyselyyn vastaaminen onnistuu
                                sivuston etusivulta.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Mikä on Ilmastorooli?
                            </Typography>
                            <Typography marginBottom={2}>
                                Ilmastorooli on kyselyssä saatu tulos, joka
                                kuvastaa vastaajan suhtautumista
                                ilmastonmuutokseen. Ilmastorooli voi olla joko
                                Ilmastoasiantuntija, Mielipidevaikuttaja,
                                Kestävän elämäntavan etsijä tai Eettinen
                                kuluttaja.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Miten voin tehdä kyselyn?
                            </Typography>
                            <Typography marginBottom={2}>
                                Kyselyyn vastaaminen onnistuu sivuston
                                etusivulta. Paina &quot;ILMASTOROOLIKYSELY&quot;
                                painiketta. Kysely alkaa painamalla
                                &quot;ALOITA&quot; painiketta.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Mikä on ryhmä?
                            </Typography>
                            <Typography marginBottom={2}>
                                Kyselyyn vastaaminen onnistuu myös ryhmänä,
                                jolloin voitte vertailla kyselyn tuloksia
                                keskenänne.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Mistä tiedän olenko liittynyt ryhmään?
                            </Typography>
                            <Typography marginBottom={2}>
                                Oikeassa yläkulmassa näkyy ryhmäikoni. Jos et
                                ole osa ryhmää, ikonia painamalla pääset
                                liittymään ryhmään.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Miten voin liittyä ryhmään?
                            </Typography>
                            <Typography marginBottom={2}>
                                Ryhmään liittyminen onnistuu
                                Ilmastoroolikyselyt- sivulta. Pääset sinne
                                painamalla navikointipalkissa olevaa
                                &quot;Ilmastoroolikysely&quot; tekstiä. Syötä
                                ryhmätunnus tekstikenttään ja paina
                                &quot;LIITY&quot; painiketta. Ryhmätunnuksen
                                saat ryhmän ylläpitäjältä.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Miten voin luoda ryhmän?
                            </Typography>
                            <Typography marginBottom={2}>
                                Ryhmän luominen onnistuu Ilmastoroolikyselyt-
                                sivulta. Paina &quot;LUO RYHMÄ&quot; painiketta.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Miten voin tarkastella ryhmän tuloksia?
                            </Typography>
                            <Typography marginBottom={2}>
                                Ryhmän tulokset näkyvät omalla sivullaan, jonne
                                pääset painamalla sivuston oikeassa yläkulmassa
                                olevaa kuvaa ja &quot;Ryhmän tulokset&quot;
                                painiketta.
                            </Typography>
                            <Typography
                                variant="h3"
                                marginBottom={1}
                                fontWeight={'bold'}
                            >
                                Miten voin poistua ryhmästä?
                            </Typography>
                            <Typography marginBottom={2}>
                                Ryhmästä poistuminen onnistuu painamalla
                                sivuston oikeassa yläkulmassa olevaa kuvaa ja
                                &quot;Poistu ryhmästä&quot; painiketta.
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}
