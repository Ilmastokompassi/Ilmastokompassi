import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import QuestionCard from '../components/QuestionCard'
import { useTitle } from '../hooks/useTitle'
import useSWR from 'swr'

export const FactQuizQuestionPage = () => {
    const { questionId: questionParamId } = useParams()
    const [selectedOptionsIds, setSelectedOptionsIds] = useState(new Set())
    const [hasAnswered, setHasAnswered] = useState(false)

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
                    responseId: responseId,
                }),
            })
            const data = await response.json()
            console.log(data)
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

    useTitle(`Tietovisa - Kysymys ${questionId}.`)

    return (
        <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            margin={2}
            style={{ minHeight: '80vh' }}
        >
            {isLoadingAllQuestions ? (
                <p>Loading...</p>
            ) : (
                <>
                    {/* Question options card */}
                    <QuestionCard
                        question={currentQuestion}
                        selectedOptionsIds={selectedOptionsIds}
                        onOptionSelected={onOptionSelected}
                        alwaysCol={true}
                        canAnswer={!hasAnswered}
                    />
                    {/* Buttons */}
                    <Stack
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
                                disabled={selectedOptionsIds.size === 0}
                            >
                                Vastaa
                            </Button>
                        )}
                        {hasAnswered && !isLastQuestion && (
                            <Button
                                variant="contained"
                                color="primary"
                                href={`/tietovisa/${questionId + 1}`}
                                onClick={() => {
                                    setHasAnswered(false)
                                    setSelectedOptionsIds(new Set())
                                }}
                            >
                                Seuraava kysymys
                            </Button>
                        )}
                        {hasAnswered && isLastQuestion ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleAnswer}
                            >
                                Lopeta kysely
                            </Button>
                        ) : (
                            <Typography>
                                {questionId}/{totalQuestions}
                            </Typography>
                        )}
                    </Stack>
                </>
            )}
        </Stack>
    )
}
