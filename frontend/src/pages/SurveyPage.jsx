import { Typography, Button, Stack } from '@mui/material'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import { useEffect } from 'react'

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

const handelGroup = () => {
    console.log('moi')
}

export function SurveyPage() {
    useEffect(() => {
        document.title = 'Kysely'
    }, [])
    return (
        <SurveyPageContainer>
            <Heading variant="h1">Miten haluat tehdä kyselyn?</Heading>
            <SurveyOptionsContainer>
                <Stack spacing={2}>
                    <SurveyOptionButton
                        component={NavLink}
                        to="/question/1"
                        variant="contained"
                        data-testid="btn-start-survey"
                    >
                        <Typography className="survey-option">
                            Tee kysely yksin :(
                        </Typography>
                    </SurveyOptionButton>
                    <SurveyOptionButton
                        onClick={() => handelGroup()}
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
