import { Typography, Button, Stack, Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { useEffect } from 'react'
import FormDialog from '../components/FormDialog'

const SurveyOptionButton = styled(Button)`
    /* Add your styling here */
    /* Example: */

    /* You can add any CSS properties you need */
`

const SurveyPageContainer = styled.div`
    display: flex; /* Use flexbox layout */
    flex-direction: column; /* Stack elements vertically */
    align-items: center; /* Center items horizontally */
    height: 100vh; /* Make the container full viewport height */
    margin-top: 100px;
`

const Heading = styled(Typography)`
    font-size: 50px;
    text-align: center;
`

export function SurveyPage() {
    useEffect(() => {
        document.title = 'Kysely'
    }, [])
    return (
        <SurveyPageContainer>
            <Heading
                variant="h1"
                sx={{ fontSize: { xs: '2em', sm: '3em', md: '4em' } }}
            >
                Miten haluat tehdä kyselyn?
            </Heading>
            <Stack spacing={7} margin={5}>
                <Stack spacing={2}>
                    <FormDialog />
                    <SurveyOptionButton
                        component={NavLink}
                        to="/question/1"
                        variant="contained"
                        data-testid="btn-start-survey"
                        id="btn-survey-alone"
                    >
                        <Typography className="survey-option">
                            Teen kyselyn yksin
                        </Typography>
                    </SurveyOptionButton>
                </Stack>
                <Box>
                    <Button variant="text" size="small">
                        Luo ryhmä
                    </Button>
                </Box>
            </Stack>
        </SurveyPageContainer>
    )
}
