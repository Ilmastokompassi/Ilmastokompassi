import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import QuestionCard from '../components/QuestionCard'
import { useTitle } from '../hooks/useTitle'

export const FactQuizQuestionPage = () => {
    const { questionId: questionParamId } = useParams()
    const [selectedOptionsIds, setSelectedOptionsIds] = useState(new Set())

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

    const handleSubmit = () => {
        console.log(selectedOptionsIds)
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
                    />
                    {/* Buttons */}
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={4}
                    >
                        {isLastQuestion ? (
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleSubmit}
                            >
                                Lopeta kysely
                            </Button>
                        ) : (
                            <Typography>
                                {questionId}/{totalQuestions}
                            </Typography>
                        )}
                        <IconButton
                            aria-label="next question"
                            href={`/tietovisa/${questionId + 1}`}
                            disabled={
                                !totalQuestions || questionId >= totalQuestions
                            }
                        >
                            <ArrowCircleRightIcon fontSize="large" />
                        </IconButton>
                    </Stack>
                </>
            )}
        </Stack>
    )
}
