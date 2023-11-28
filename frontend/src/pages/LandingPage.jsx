import {
    Typography,
    Container,
    Stack,
    Box,
    Card,
    CardContent,
} from '@mui/material'
import { useTitle } from '../hooks/useTitle'

import JoinGroup from '../components/JoinGroup'
import { ToSurveyCard } from '../components/ToSurveyCard'
import CreateGroupDialog from '../components/CreateGroupDialog'
import FaceIcon from '@mui/icons-material/Face'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import ClimateCompassMap from '../assets/kompassi_tausta.png'

export const LandingPage = () => {
    useTitle('Ilmastokompassi')
    return (
        <Container>
            <Stack
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={4}
                py={2}
            >
                <Box
                    component="img"
                    src={ClimateCompassMap}
                    alt="ilmastokompassi"
                    sx={{ width: ['70%', '55%', '40%'] }}
                />

                <Card>
                    <CardContent>
                        <Stack spacing={2} alignItems="center">
                            <Box>
                                <Typography variant="h5" align="left">
                                    Tervetuloa Ilmastokompassiin!
                                </Typography>
                                <Typography variant="body1" align="left">
                                    Ilmastokompassi on ilmastonmuutokseen
                                    liittyvä oppimisalusta, joka tarjoaa
                                    oppimateriaalia ilmastonmuutoksesta ja sen
                                    hillinnästä. Ilmastokompassi on suunnattu
                                    erityisesti yläkoululaisille ja
                                    lukiolaisille, mutta soveltuu myös muille
                                    ilmastonmuutoksesta kiinnostuneille.
                                </Typography>
                            </Box>
                            <JoinGroup />
                            <CreateGroupDialog />
                        </Stack>
                    </CardContent>
                </Card>
                <Stack
                    spacing={2}
                    width="100%"
                    direction={{ xs: 'column', md: 'row' }}
                    alignItems="stretch"
                >
                    <ToSurveyCard
                        name="Ilmastoroolikysely"
                        description="Selvitä mikä ilmastorooli kuvastaa sinua parhaiten!"
                        icon={<FaceIcon sx={{ fontSize: '72px' }} />}
                        iconBackgroundColor="#429446"
                        to="/ilmastoroolikysely"
                    />
                    <ToSurveyCard
                        name="Oppimisvisa"
                        description="Kokeile ilmastotietämystäsi oppimisvisan avulla!"
                        to="/tietovisa/1"
                        icon={<TravelExploreIcon sx={{ fontSize: '72px' }} />}
                        iconBackgroundColor="#944290"
                    />
                </Stack>
            </Stack>
        </Container>
    )
}
