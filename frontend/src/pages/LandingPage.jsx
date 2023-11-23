import {
    Typography,
    Container,
    Stack,
    Box,
    Skeleton,
    Card,
    CardContent,
} from '@mui/material'
import { useTitle } from '../hooks/useTitle'

import JoinGroup from '../components/JoinGroup'
import { ToSurveyCard } from '../components/ToSurveyCard'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import FaceIcon from '@mui/icons-material/Face'
import CreateGroupDialog from '../components/CreateGroupDialog'

export const LandingPage = () => {
    useTitle('Ilmastokompassi')
    return (
        <Container>
            <Stack
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
                spacing={4}
                paddingTop={10}
            >
                <Card>
                    <CardContent>
                        <Stack spacing={2} alignItems="center">
                            <Box>
                                <Typography variant="h4" align="left">
                                    Tervetuloa Ilmastokompassiin!
                                </Typography>
                                <Typography variant="h6" align="left">
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
                        description="Siirry ilmastoroolikyselyn aloitussivulle"
                        cardMedia={<FaceIcon fontSize="large" />}
                        to="/ilmastoroolikysely"
                    />
                    <ToSurveyCard
                        name="Oppimisvisa"
                        description="Siirry oppimisvisan aloitussivulle"
                        cardMedia={<TravelExploreIcon fontSize="large" />}
                        to="/#factquiz"
                    />
                </Stack>
            </Stack>
        </Container>
    )
}
