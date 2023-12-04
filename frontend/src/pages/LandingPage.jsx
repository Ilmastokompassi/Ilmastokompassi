import { Typography, Container, Stack, Box } from '@mui/material'
import { useTitle } from '../hooks/useTitle'
import { useTheme } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import { ToSurveyCard } from '../components/ToSurveyCard'
import ClimateCompassMap from '../assets/kompassi_tausta.png'
import RoleSurveyLogo from '../assets/roolilogo.png'
import FactQuizLogo from '../assets/oppimisvisalogo.png'

const cardDescription = {
    roleSurvey:
        'Vastaa rehellisesti ja omana itsenäsi pikaisiin kysymyksiin, jolloin näet minkälainen ilmastoroolihahmo kuvastaa juuri sinua! Voit tehdä kyselyn yksin tai ryhmässä.',
    factQuiz:
        'Kokeile ilmasto-oppimisvisaa ja laajenna ilmastotietämystäsi. Ilmastonmuutos on laaja aihe ja sen ymmärtäminen vaatii monenlaista osaamista. Olet aikamoinen ilmastotaituri, jos saat vastattua kaikkiin oikein!',
}

export const LandingPage = () => {
    useTitle('Ilmastokompassi')
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Container>
            <Stack
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                py={2}
                sx={{
                    padding: isDesktop ? 4 : 2,
                }}
            >
                <Box
                    component="img"
                    src={ClimateCompassMap}
                    alt="ilmastokompassi"
                    sx={{ width: ['70%', '55%', '40%'] }}
                />

                <Stack spacing={2} alignItems="center">
                    <Box>
                        <Typography
                            variant="h1"
                            align="center"
                            fontFamily={'Roboto condensed'}
                            fontWeight={'800'}
                            marginBottom={2}
                        >
                            Tervetuloa Ilmastokompassiin!
                        </Typography>
                        <Typography
                            variant="h3"
                            component="div"
                            align="center"
                            fontFamily={'Roboto condensed'}
                        >
                            Täällä pääset kartuttamaan ilmastotietämystäsi ja
                            ymmärtämään omaa suhtautumistasi ilmastonmuutokseen.
                        </Typography>
                    </Box>
                </Stack>
                <Stack spacing={2} width="100%" alignItems="stretch">
                    <ToSurveyCard
                        name="Ilmastoroolikysely"
                        description={cardDescription.roleSurvey}
                        icon={
                            <img
                                src={RoleSurveyLogo}
                                alt="ilmastoroolien hahmot"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        }
                        to="/ilmastoroolikysely"
                    />
                    <ToSurveyCard
                        name="Oppimisvisa"
                        description={cardDescription.factQuiz}
                        to="/oppimisvisa/1"
                        icon={
                            <img
                                src={FactQuizLogo}
                                alt="hymyilevä maapallo suurennuslasilla"
                                style={{
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                }}
                            />
                        }
                    />
                </Stack>
            </Stack>
        </Container>
    )
}
