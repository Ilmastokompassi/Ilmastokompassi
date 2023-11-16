import { Typography, Button, Stack, Box } from '@mui/material'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { useTitle } from '../hooks/useTitle'

const SurveyOptionButton = styled(Button)`
    /* Add your styling here */
    /* Example: */

    /* You can add any CSS properties you need */
`

const SurveyPageContainer = styled.div`
    display: flex; /* Use flexbox layout */
    flex-direction: column; /* Stack elements vertically */
    align-items: center; /* Center items horizontally */
    justify-content: center;
    height: 100vh;
`

const Heading = styled(Typography)`
    font-size: 50px;
    text-align: center;
`

export function SurveyPage() {
    useTitle('Kyselyt')

    return (
        <SurveyPageContainer>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                margin={2}
            >
                <Heading>Tänne tulee tekstiä</Heading>
                <SurveyOptionButton
                    id="btn-survey-alone"
                    component={NavLink}
                    to="/kysymys/1"
                    variant="contained"
                    data-testid="btn-start-survey"
                    color="secondary"
                >
                    <Typography className="survey-option">
                        Siirry kyselyyn
                    </Typography>
                </SurveyOptionButton>
                <Box>Täältä löytyy jatkossa ilmastoprofiilit.</Box>
            </Stack>
        </SurveyPageContainer>
    )
}
