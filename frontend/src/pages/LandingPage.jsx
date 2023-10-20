import { Typography, Container, Button, Stack } from '@mui/material'
import { useTitle } from '../hooks/useTitle'

export const LandingPage = () => {
    useTitle('Ilmastokompassi')
    return (
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                overflow: 'hidden',
            }}
        >
            <Stack direction="column" alignItems="center">
                <Typography
                    variant="h2"
                    align="center"
                    paddingBottom={'80px'}
                    sx={{
                        fontSize: {
                            xs: '2em',
                            sm: '3em',
                            md: '4em',
                        },
                    }}
                >
                    Tervetuloa Ilmastokompassiin!
                </Typography>
                <Button
                    style={{ width: 250, height: 60, fontSize: '20px' }}
                    variant="contained"
                    color="primary"
                    aria-label="move to survey"
                    href={`/survey`}
                >
                    Kyselyyn!
                </Button>
            </Stack>
        </Container>
    )
}
