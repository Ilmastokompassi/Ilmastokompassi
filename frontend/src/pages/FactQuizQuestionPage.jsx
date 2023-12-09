import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material'
import QuizQuestionCard from '../components/factQuiz/QuizQuestionCard'
import { useTitle } from '../hooks/useTitle'
import useSWR from 'swr'
import useSWRImmutable from 'swr'
import FactInfoBox from '../components/factQuiz/FactInfoBox'
import CorrectAnswersInfo from '../components/factQuiz/CorrectAnswersInfo'
import { useSwipeable } from 'react-swipeable'

export const FactQuizQuestionPage = () => {
    const { questionId: questionParamId } = useParams()

    const [selectedOptionsIds, setSelectedOptionsIds] = useState(new Set())

    const navigate = useNavigate()
    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => navigate(`/oppimisvisa/${questionId + 1}`),
        onSwipedRight: () => navigate(`/oppimisvisa/${questionId - 1}`),
    })

    const responseId = localStorage.getItem('quizResponseId')
    const groupToken = localStorage.getItem('groupToken')

    if (!responseId) {
        fetch('/api/quiz/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupToken: groupToken }),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('quizResponseId', data.response_id)
            })
    }

    const { data: allQuestions, isLoading: isLoadingAllQuestions } =
        useSWRImmutable('/api/quiz/questions')

    const totalQuestions = Object.keys(allQuestions || {}).length

    const questionId = Math.min(
        totalQuestions,
        Math.max(1, parseInt(questionParamId))
    )

    const isLastQuestion = questionId == totalQuestions

    // Try fetch already saved answers if they exists
    const {
        data: answers,
        isLoading: isLoadingAnswers,
        mutate: mutateAnswers,
    } = useSWR(() => responseId && '/api/quiz/answers/' + responseId)

    // If our existing answers contains our answers for current question (questionId), store them to variable for easier access
    const responseAnswers = answers?.response_answers || {}
    const responseSelectedOptionsIds = responseAnswers[questionId]

    if (selectedOptionsIds.size < 1 && responseSelectedOptionsIds?.length > 0) {
        setSelectedOptionsIds(new Set(responseSelectedOptionsIds))
    }

    // If current questionId is in our existing answers, it means we have already answered to this question
    const hasExistingAnswers = questionId in responseAnswers

    // If we have already answered, fetch correct answers
    const { data: correctAnswers, isLoading: isLoadingCorrectAnswers } = useSWR(
        () => hasExistingAnswers && '/api/quiz/correct-answers/' + questionId
    )

    const isLoading =
        isLoadingAllQuestions || isLoadingAnswers || isLoadingCorrectAnswers

    const infoText = correctAnswers?.info_text
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line?.length > 0)

    const currentQuestion = allQuestions ? allQuestions[questionId] : null

    const saveAnswers = () => {
        fetch('/api/quiz/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId,
                answer: Array.from(selectedOptionsIds),
                responseId: parseInt(responseId),
            }),
        }).then(() => mutateAnswers())
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

    const resetQuestionState = () => setSelectedOptionsIds(new Set())

    useTitle(`Oppimisvisa - Kysymys ${questionId}.`)

    return (
        <div {...swipeHandlers}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                margin={2}
                padding={{ xs: 2, sm: 2, md: 4 }}
                minHeight="80vh"
            >
                {isLoading ? (
                    <p>Ladataan...</p>
                ) : (
                    <Box textAlign="center">
                        <QuizQuestionCard
                            question={currentQuestion}
                            questionId={questionId}
                            totalQuestions={totalQuestions}
                            selectedOptionsIds={selectedOptionsIds}
                            onOptionSelected={onOptionSelected}
                            correctAnswers={correctAnswers?.correct_answers}
                        />

                        <Box
                            paddingY={2}
                            display="flex"
                            justifyContent="center"
                        >
                            <LinearProgress
                                variant="determinate"
                                value={(questionId * 100) / totalQuestions}
                                style={{
                                    width: '80%',
                                }}
                                aria-label="progressbar"
                            />
                        </Box>
                        {/* Buttons */}
                        <Stack
                            width="100%"
                            direction="column"
                            justifyContent="space-evenly"
                            alignItems="center"
                            spacing={4}
                        >
                            {correctAnswers === undefined ? (
                                <Button
                                    data-testid="quiz-answer-button"
                                    variant="contained"
                                    color="primary"
                                    onClick={saveAnswers}
                                    disabled={selectedOptionsIds.size === 0}
                                >
                                    <Typography>Vastaa</Typography>
                                </Button>
                            ) : (
                                <>
                                    <Box width="100%">
                                        <CorrectAnswersInfo
                                            options={currentQuestion.options}
                                            correctAnswers={
                                                correctAnswers.correct_answers
                                            }
                                            selectedOptionsIds={
                                                selectedOptionsIds
                                            }
                                        />
                                        {infoText?.length > 0 && (
                                            <FactInfoBox content={infoText} />
                                        )}
                                    </Box>
                                    {isLastQuestion ? (
                                        <Button
                                            data-testid="quiz-end-button"
                                            variant="contained"
                                            color="primary"
                                            href="/oppimisvisa/yhteenveto"
                                        >
                                            <Typography>
                                                Lopeta kysely
                                            </Typography>
                                        </Button>
                                    ) : (
                                        <Stack direction="row" spacing={2}>
                                            <Button
                                                data-testid="quiz-previous-button"
                                                variant="contained"
                                                color="primary"
                                                href={`/oppimisvisa/${
                                                    questionId - 1
                                                }`}
                                                disabled={questionId <= 1}
                                                onClick={resetQuestionState}
                                            >
                                                <Typography>
                                                    Edelllinen kysymys
                                                </Typography>
                                            </Button>
                                            <Button
                                                data-testid="quiz-next-button"
                                                variant="contained"
                                                color="primary"
                                                href={`/oppimisvisa/${
                                                    questionId + 1
                                                }`}
                                                onClick={resetQuestionState}
                                            >
                                                <Typography>
                                                    Seuraava kysymys
                                                </Typography>
                                            </Button>
                                        </Stack>
                                    )}
                                </>
                            )}
                        </Stack>
                    </Box>
                )}
            </Stack>
        </div>
    )
}
