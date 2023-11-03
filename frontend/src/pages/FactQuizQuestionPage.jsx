import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Stack, Typography } from '@mui/material'
import QuestionCard from '../components/QuestionCard'
import { useTitle } from '../hooks/useTitle'

export const FactQuizQuestionPage = () => {
    const { questionId: questionParamId } = useParams()
    const [selectedOptionsIds, setSelectedOptionsIds] = useState(new Set())
    const [hasAnswered, setHasAnswered] = useState(false)

    // const { data: allQuestions, isLoading: isLoadingAllQuestions } =
    // useSWR('/api/quiz')
    const isLoadingAllQuestions = false

    const allQuestions = [
        {
            id: 1,
            content: 'ksymys1',
            options: [
                { id: 1, name: 'vastaus11' },
                { id: 2, name: 'vastas12' },
            ],
        },
        {
            id: 2,
            content: 'ksymys1',
            options: [
                { id: 1, name: 'vastaus21' },
                { id: 2, name: 'vastas22' },
                { id: 3, name: 'vastas23' },
            ],
        },
        {
            id: 3,
            content: 'ksymys1',
            options: [
                { id: 1, name: 'vastaus31' },
                { id: 2, name: 'vastas32' },
                { id: 3, name: 'vastas33' },
                { id: 4, name: 'vastas34' },
            ],
        },
    ]

    const questionId = Math.min(
        allQuestions?.length,
        Math.max(1, parseInt(questionParamId))
    )

    const currentQuestion = allQuestions?.find(
        (question) => question.id == questionId
    )

    const totalQuestions = allQuestions?.length
    const isLastQuestion = questionId == totalQuestions

    const handleAnswer = async () => {
        console.log(Array.from(selectedOptionsIds))
        setHasAnswered(true)
        // try {
        //     const response = await fetch('/api/quiz', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             questionId,
        //             selectedOptionsIds: Array.from(selectedOptionsIds),
        //         }),
        //     })
        //     const data = await response.json()
        // } catch (error) {
        //     console.log(error)
        // }
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
