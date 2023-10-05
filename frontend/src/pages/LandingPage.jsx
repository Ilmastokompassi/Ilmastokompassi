import { useEffect } from 'react'
import { Typography, Container, Button, Stack } from '@mui/material'
import useSWR from 'swr'

export const LandingPage = () => {
    const { data } = useSWR('/api/test-content')
    const content = data?.content

    useEffect(() => {
        document.title = 'Ilmastokompassi'
    }, [])
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
                <Typography variant="h2" align="center" paddingBottom={'80px'}>
                    Tervetuloa!
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
