import {
    Box,
    Container,
    Stack,
    Typography,
    Card,
    CardContent,
} from '@mui/material'
import useSWR from 'swr'
import { useTitle } from '../hooks/useTitle'
import QuizSummaryAccordion from '../components/factQuiz/QuizSummaryAccordion' // Import the new component
import FactQuizLogo from '../assets/oppimisvisalogo.png'

export const FactQuizSummaryPage = () => {
    const { data: allSummaryInfo, isLoading: isLoadingAllSummaryInfo } =
        useSWR('/api/quiz/summary')

    useTitle(`Oppimisvisa - Kertaus`)

    return (
        <Container maxWidth="md">
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                padding={2}
                paddingY={6}
            >
                <Card elevation={5}>
                    <CardContent>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            padding={{ xs: 1, md: 4 }}
                        >
                            <Stack alignItems="center" spacing={3} paddingY={2}>
                                <Typography variant="h2" textAlign={'center'}>
                                    Hyvää työtä !
                                </Typography>
                                <Box
                                    component="img"
                                    src={FactQuizLogo}
                                    alt="hymyilevä maapallo suurennuslasilla"
                                    sx={{ width: ['70%', '60%', '50%'] }}
                                    borderRadius={2}
                                    boxShadow={5}
                                />
                                <Typography
                                    variant="h5"
                                    paddingTop={2}
                                    paddingBottom={2}
                                    textAlign={'center'}
                                >
                                    Olet seikkaillut oppimisvisan loppuun
                                    saakka. Tästä voit vielä tarkastella, mitä
                                    kaikkea sitä tulikaan käytyä läpi.
                                </Typography>
                            </Stack>
                            {isLoadingAllSummaryInfo ? (
                                <Typography>Ladataan...</Typography>
                            ) : (
                                allSummaryInfo.map((item, index) => (
                                    <QuizSummaryAccordion
                                        key={index}
                                        questionText={item.question_text}
                                        correctAnswers={item.correct_answers}
                                        infoText={item.info_text}
                                    />
                                ))
                            )}
                            <Typography
                                paddingTop={3}
                                paddingBottom={2}
                                textAlign={'center'}
                            >
                                Jäikö jokin epäselväksi tai mietityttämään?
                                Uskalla keskustella ystävien ja läheisten
                                kanssa. Et varmasti ole yksin ajatustesi kanssa!
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    )
}
