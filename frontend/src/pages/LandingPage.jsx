import {
    Typography,
    Container,
    Button,
    Stack,
    Box,
    Skeleton,
} from '@mui/material'
import { useTitle } from '../hooks/useTitle'

import JoinGroup from '../components/JoinGroup'

export const LandingPage = () => {
    useTitle('Ilmastokompassi')
    return (
        <Container>
            <Stack
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
                spacing={5}
                paddingTop={10}
            >
                <Stack
                    paddingTop={2}
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    justifyContent={'space-evenly'}
                    alignItems={'center'}
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
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    justifyContent={'space-evenly'}
                >
                    <Button
                        style={{
                            width: 300,
                            height: 150,
                            fontSize: '20px',
                        }}
                        variant="contained"
                        color="secondary"
                        href={`/kyselyt`}
                    >
                        Ilmastoroolikysely
                    </Button>
                    <Button
                        style={{
                            width: 300,
                            height: 150,
                            fontSize: '20px',
                        }}
                        variant="contained"
                        disabled
                    >
                        Oppimisvisa
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}
