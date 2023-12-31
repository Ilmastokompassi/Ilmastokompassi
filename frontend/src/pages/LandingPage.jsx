import {
    Typography,
    Container,
    Stack,
    Box,
    Card,
    CardContent,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useTitle } from '../hooks/useTitle'
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
    return (
        <Container>
            <Stack
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                padding={{ xs: 2, sm: 2 }}
                mb={4}
            >
                <Box
                    component="img"
                    src={ClimateCompassMap}
                    alt="ilmastokompassi"
                    sx={{ width: ['70%', '55%', '40%'] }}
                />

                <Stack spacing={2} width="100%" alignItems="stretch">
                    <Stack paddingBottom={4}>
                        <Card
                            elevation={5}
                            sx={{
                                width: '100%',
                                height: 'auto',
                                backgroundColor: alpha('#fff', 0.7),
                            }}
                        >
                            <CardContent>
                                <Stack padding={{ md: 2 }}>
                                    <Typography
                                        variant="h1"
                                        align="center"
                                        fontFamily="Roboto condensed"
                                        fontWeight={700}
                                        marginBottom={2}
                                    >
                                        Tervetuloa Ilmastokompassiin!
                                    </Typography>
                                    <Typography
                                        variant="h3"
                                        component="div"
                                        align="center"
                                        fontFamily="Roboto condensed"
                                    >
                                        Täällä pääset kartuttamaan
                                        ilmastotietämystäsi ja ymmärtämään omaa
                                        suhtautumistasi ilmastonmuutokseen.
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
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
