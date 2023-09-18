import { Typography, Button, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'

const SurveyOptionButton = styled(Button)`
    /* Add your styling here */
    /* Example: */

    /* You can add any CSS properties you need */
`

const SurveyOptionsContainer = styled.div`
    margin: 50px;
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
`

export function SurveyPage() {
    return (
        <SurveyPageContainer>
            <Heading variant="h1">Miten haluat tehdä kyselyn?</Heading>
            <SurveyOptionsContainer>
                <Stack spacing={2}>
                    <SurveyOptionButton
                        component={NavLink}
                        to="/"
                        variant="contained"
                    >
                        <Typography className="survey-option">
                            Tee kysely yksin :(
                        </Typography>
                    </SurveyOptionButton>
                    <SurveyOptionButton
                        component={NavLink}
                        to="/"
                        variant="contained"
                    >
                        <Typography className="survey-option">
                            Tee kysely Ryhmässä :)
                        </Typography>
                    </SurveyOptionButton>
                </Stack>
            </SurveyOptionsContainer>
        </SurveyPageContainer>
    )
}
