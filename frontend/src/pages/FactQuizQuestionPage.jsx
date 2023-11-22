import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import QuizQuestionCard from '../components/QuizQuestionCard'
import { useTitle } from '../hooks/useTitle'
import useSWR from 'swr'
import FactInfoBox from '../components/FactInfoBox'
import CorrectAnswersInfo from '../components/CorrectAnswersInfo'
import { useSwipeable } from 'react-swipeable'

export const FactQuizQuestionPage = () => {
    const { questionId: questionParamId } = useParams()
    const [selectedOptionsIds, setSelectedOptionsIds] = useState(new Set())
    const [hasAnswered, setHasAnswered] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(null)
    const [infoText, setInfoText] = useState()

    const navigate = useNavigate()
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => navigate(`/tietovisa/${questionId + 1}`),
        onSwipedRight: () => navigate(`/tietovisa/${questionId - 1}`),
    })

    const responseId = localStorage.getItem('quizResponseId')
    const groupToken = localStorage.getItem('groupToken')

    if (!responseId) {
        const getResponseID = async () => {
            const response = await fetch('/api/new-quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ groupToken: groupToken }),
            })
            const responseJSON = await response.json()
            localStorage.setItem('quizResponseId', responseJSON['response_id'])
        }
        getResponseID()
    }

    const { data: allQuestions, isLoading: isLoadingAllQuestions } =
        useSWR('/api/quiz')

    const questionId = Math.min(
        Object.keys(allQuestions || {}).length,
        Math.max(1, parseInt(questionParamId))
    )

    const currentQuestion = allQuestions ? allQuestions[questionId] : null

    const totalQuestions = Object.keys(allQuestions || {})?.length
    const isLastQuestion = questionId == totalQuestions

    const handleAnswer = async () => {
        try {
            const response = await fetch('/api/quiz', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId,
                    answer: Array.from(selectedOptionsIds),
                    responseId: parseInt(responseId),
                }),
            })
            const data = await response.json()
            setCorrectAnswers(data.correct_answers)
            // Split infotext for newlines to work
            const splittedInfoText = data.info_text
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line?.length > 0)
            setInfoText(splittedInfoText)
            setHasAnswered(true)
        } catch (error) {
            console.log(error)
        }
    }

    const onOptionSelected = (optionId) => {
        const updatedOptions = new Set(selectedOptionsIds)
        if (updatedOptions.has(optionId)) {
            updatedOptions.delete(optionId)
        } else {
            updatedOptions.add(optionId)
        }
        setSelectedOptionsIds(updatedOptions)
    }

    const handleNextQuestion = () => {
        setHasAnswered(false)
        setCorrectAnswers(null)
        setInfoText(null)
        setSelectedOptionsIds(new Set())
    }

    useTitle(`Tietovisa - Kysymys ${questionId}.`)

    return (
        <div {...swipeHandlers}>
            <Container>
                <Box display="flex" justifyContent="center">
                    <Stack
                        maxWidth="800px"
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        style={{ minHeight: '80vh' }}
                    >
                        {isLoadingAllQuestions ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {/* Question options card */}
                                <QuizQuestionCard
                                    question={currentQuestion}
                                    selectedOptionsIds={selectedOptionsIds}
                                    onOptionSelected={onOptionSelected}
                                    canAnswer={!hasAnswered}
                                    correctAnswers={correctAnswers}
                                />
                                {/* Buttons */}
                                <Stack
                                    width="100%"
                                    direction="column"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    spacing={4}
                                >
                                    {!hasAnswered && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAnswer}
                                            disabled={
                                                selectedOptionsIds.size === 0
                                            }
                                        >
                                            Vastaa
                                        </Button>
                                    )}
                                    {hasAnswered && (
                                        <>
                                            <Box width="100%">
                                                <CorrectAnswersInfo
                                                    options={
                                                        currentQuestion.options
                                                    }
                                                    correctAnswers={
                                                        correctAnswers
                                                    }
                                                    userAnswers={[
                                                        ...selectedOptionsIds,
                                                    ]}
                                                />
                                                {infoText?.length > 0 && (
                                                    <FactInfoBox
                                                        content={infoText}
                                                    />
                                                )}
                                            </Box>
                                            {isLastQuestion ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    href="/tietovisa/yhteenveto"
                                                >
                                                    Lopeta kysely
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    href={`/tietovisa/${
                                                        questionId + 1
                                                    }`}
                                                    onClick={handleNextQuestion}
                                                >
                                                    Seuraava kysymys
                                                </Button>
                                            )}
                                        </>
                                    )}
                                    <Typography>
                                        {questionId}/{totalQuestions}
                                    </Typography>
                                </Stack>
                            </>
                        )}
                    </Stack>
                </Box>
            </Container>
        </div>
    )
}
