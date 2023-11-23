import { Typography, Container, Stack, Box, Skeleton } from '@mui/material'
import { useTitle } from '../hooks/useTitle'

import JoinGroup from '../components/JoinGroup'
import { ToSurveyCard } from '../components/ToSurveyCard'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import FaceIcon from '@mui/icons-material/Face'

export const LandingPage = () => {
    useTitle('Ilmastokompassi')
    return (
        <Container>
            <Stack
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
                spacing={5}
                paddingTop={10}
            >
                <Stack
                    paddingTop={2}
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    justifyContent="space-evenly"
                    alignItems="center"
                >
                    <Box>
                        <Typography variant="h4" align="left">
                            Tervetuloa Ilmastokompassiin!
                        </Typography>
                        <Typography variant="h6" align="left">
                            Ilmastokompassi on ilmastonmuutokseen liittyvä
                            oppimisalusta, joka tarjoaa oppimateriaalia
                            ilmastonmuutoksesta ja sen hillinnästä.
                            Ilmastokompassi on suunnattu erityisesti
                            yläkoululaisille ja lukiolaisille, mutta soveltuu
                            myös muille ilmastonmuutoksesta kiinnostuneille.
                        </Typography>
                    </Box>
                    <Box>
                        <Skeleton variant="circular" width={250} height={250} />
                    </Box>
                </Stack>
                <JoinGroup />
                <Stack
                    paddingTop={2}
                    spacing={2}
                    justifyContent="space-between"
                    width="100%"
                    maxWidth={{ xs: '650px', md: '100%' }}
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
