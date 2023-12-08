import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import QuizQuestionCard from '../components/factQuiz/QuizQuestionCard'
import { useTitle } from '../hooks/useTitle'
import useSWR from 'swr'
import FactInfoBox from '../components/factQuiz/FactInfoBox'
import CorrectAnswersInfo from '../components/factQuiz/CorrectAnswersInfo'
import { useSwipeable } from 'react-swipeable'

export const FactQuizQuestionPage = () => {
    const { questionId: questionParamId } = useParams()

    const [correctAnswers, setCorrectAnswers] = useState([])
    const [selectedOptionsIds, setSelectedOptionsIds] = useState(new Set())
    const [hasAnswered, setHasAnswered] = useState(false)
    const [infoText, setInfoText] = useState()

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
            .then(() =>
                localStorage.setItem(
                    'quizResponseId',
                    responseJSON['response_id']
                )
            )
    }

    const { data: allQuestions, isLoading: isLoadingAllQuestions } = useSWR(
        '/api/quiz/questions'
    )
    const questionId = Math.min(
        Object.keys(allQuestions || {}).length,
        Math.max(1, parseInt(questionParamId))
    )

    // If we have responseId already in the localStorage, fetch our existing answers, if they exist
    const { data: answers } = useSWR(
        responseId && '/api/quiz/answers/' + responseId
    )

    const responseAnswers = answers?.response_answers ?? []

    // If our existing answers contains our answers for current question (questionId), store them to variable for easier access
    const responseSelectedOptionsIds = responseAnswers[questionId]

    // If current questionId is in our existing answers, it means we have already answered to this question
    const hasAnswered2 = questionId in responseAnswers
    console.log('hasAnswered2', hasAnswered2)

    // If we have already answered, fetch correct answers
    const { data: correctAnswers2, isLoading: isLoadingCorrectAnswers } =
        useSWR(hasAnswered2 && '/api/quiz/correct-answers/' + questionId)

    console.log('RERENDER')
    // Split infotext for newlines to work

    if (hasAnswered2) {
        //setInfoText(
        //    handleInfoText(
        //        correctAnswers?.info_text
        //            .split('\n')
        //            .map((line) => line.trim())
        //            .filter((line) => line?.length > 0)
        //    )
        //)
        console.log('RERENDER WHEN hasAnswered2=true')
        setSelectedOptionsIds(new Set(responseSelectedOptionsIds))
    } else {
        return
        setSelectedOptionsIds(new Set())
    }

    const currentQuestion = allQuestions ? allQuestions[questionId] : null

    const totalQuestions = Object.keys(allQuestions || {})?.length
    const isLastQuestion = questionId == totalQuestions

    const handleAnswer = async () => {
        try {
            await fetch('/api/quiz/save', {
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
        setInfoText(null)
        setSelectedOptionsIds(new Set())
    }

    useTitle(`Oppimisvisa - Kysymys ${questionId}.`)

    return (
        <div {...swipeHandlers}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                margin={2}
                paddingTop={2}
                padding={{ xs: 2, sm: 2, md: 4 }}
                style={{ minHeight: '80vh' }}
            >
                {isLoadingAllQuestions ? (
                    <p>Loading...</p>
                ) : (
                    <Box textAlign={'center'}>
                        {/* Question options card */}
                        <QuizQuestionCard
                            question={currentQuestion}
                            questionId={questionId}
                            totalQuestions={totalQuestions}
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
                                    data-testid="quiz-answer-button"
                                    variant="contained"
                                    color="primary"
                                    onClick={handleAnswer}
                                    disabled={selectedOptionsIds.size === 0}
                                >
                                    <Typography>Vastaa</Typography>
                                </Button>
                            )}
                            {hasAnswered && (
                                <>
                                    <Box width="100%">
                                        <CorrectAnswersInfo
                                            options={currentQuestion.options}
                                            correctAnswers={correctAnswers}
                                            userAnswers={[
                                                ...selectedOptionsIds,
                                            ]}
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
                                            Lopeta kysely
                                        </Button>
                                    ) : (
                                        <Button
                                            data-testid="quiz-next-button"
                                            variant="contained"
                                            color="primary"
                                            href={`/oppimisvisa/${
                                                questionId + 1
                                            }`}
                                            onClick={handleNextQuestion}
                                        >
                                            Seuraava kysymys
                                        </Button>
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
