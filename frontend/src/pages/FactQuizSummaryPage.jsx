import { Box, Button, Stack, Typography } from '@mui/material'
import useSWR from 'swr'
import QuizSummaryAccordion from '../components/QuizSummaryAccordion' // Import the new component

export const FactQuizSummaryPage = () => {
    const { data: allSummaryInfo, isLoading: isLoadingAllSummaryInfo } =
        useSWR('/api/quiz/summary')

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Stack
                maxWidth="800px"
                direction="column"
                justifyContent="center"
                style={{ minHeight: '80vh' }}
            >
                <Typography variant="h1" justifyContent="center">
                    Kertaus
                </Typography>
                <Typography variant="h3" paddingBottom={2}>
                    Alta löydät muistin virkistämiseksi kysymyskohtaiset oikeat
                    vastaukset
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
    )
}
