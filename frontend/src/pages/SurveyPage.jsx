import {
    Typography,
    Button,
    Stack,
    Box,
    Card,
    CardContent,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import styled from '@emotion/styled'
import FormDialog from '../components/FormDialog'
import GroupDialog from '../components/GroupDialog'
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

    const removeGroupToken = () => {
        localStorage.removeItem('groupToken')
        window.dispatchEvent(new Event('setGroupToken'))
    }

    return (
        <SurveyPageContainer>
            <Card>
                <CardContent>
                    <Box margin={2}>
                        <Heading
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2em', sm: '3em', md: '4em' },
                                marginBottom: 2,
                            }}
                        >
                            Miten haluat tehdä kyselyn?
                        </Heading>
                        <Stack spacing={2}>
                            <FormDialog />
                            <SurveyOptionButton
                                component={NavLink}
                                onClick={() => removeGroupToken()}
                                to="/kysymys/1"
                                variant="contained"
                                data-testid="btn-start-survey"
                                id="btn-survey-alone"
                                color="secondary"
                            >
                                <Typography className="survey-option">
                                    Teen kyselyn yksin
                                </Typography>
                            </SurveyOptionButton>
                            <Box alignSelf="center">
                                <GroupDialog />
                            </Box>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>
        </SurveyPageContainer>
    )
}
