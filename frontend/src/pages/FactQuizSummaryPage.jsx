import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import useSWR from 'swr'
import QuizSummaryAccordion from '../components/QuizSummaryAccordion' // Import the new component

export const FactQuizSummaryPage = () => {
    const { data: allSummaryInfo, isLoading: isLoadingAllSummaryInfo } =
        useSWR('/api/quiz/summary')

    return (
        <Container maxWidth="md">
            <Box paddingY={5}>
                <Card>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        padding={2}
                    >
                        <Stack
                            maxWidth="800px"
                            direction="column"
                            justifyContent="center"
                        >
                            <Typography variant="h1" textAlign={'center'}>
                                Kertaus
                            </Typography>
                            <Typography
                                variant="h3"
                                paddingTop={2}
                                paddingBottom={2}
                            >
                                Alta löydät muistin virkistämiseksi
                                kysymyskohtaiset oikeat vastaukset
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
                </Card>
            </Box>
        </Container>
    )
}
