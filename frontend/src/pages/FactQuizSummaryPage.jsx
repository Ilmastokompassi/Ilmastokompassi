import { Box, Button, Container, Stack, Typography } from '@mui/material'
import useSWR from 'swr'
import { useTitle } from '../hooks/useTitle'
import QuizSummaryAccordion from '../components/QuizSummaryAccordion' // Import the new component

export const FactQuizSummaryPage = () => {
    const { data: allSummaryInfo, isLoading: isLoadingAllSummaryInfo } =
        useSWR('/api/quiz/summary')

    useTitle(`Tietovisa - Kertaus`)

    return (
        <Container maxWidth="md">
            <Box paddingY={5}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                >
                    <Stack direction="column" justifyContent="center">
                        <Typography variant="h4" textAlign={'center'}>
                            Kertaus
                        </Typography>
                        <Typography
                            variant="h6"
                            paddingTop={2}
                            paddingBottom={2}
                            textAlign={'center'}
                        >
                            Alta löydät muistin virkistämiseksi kysymyskohtaiset
                            oikeat vastaukset
                        </Typography>
                        {isLoadingAllSummaryInfo ? (
                            <Typography>Ladataan...</Typography>
                        ) : (
                            allSummaryInfo.map((item, index) => (
                                <QuizSummaryAccordion
                                    key={index}
                                    questionText={item.question_text}
                                    correctAnswers={item.correct_answers}
                                />
                            ))
                        )}
                        <Stack paddingTop={2}>
                            <Button variant="contained" href="/">
                                Palaa etusivulle
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
        </Container>
    )
}
