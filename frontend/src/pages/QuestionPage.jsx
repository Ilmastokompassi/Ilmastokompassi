import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import QuestionCard from '../components/QuestionCard'
import { useTitle } from '../hooks/useTitle'

export function QuestionPage() {
    const { questionId: questionParamId } = useParams()
    const [selectedOptionId, setSelectedOptionId] = useState(null)
    const navigate = useNavigate()

    const { data: allQuestions, isLoading: isLoadingAllQuestions } =
        useSWR('/api/question')

    const questionId = Math.min(
        allQuestions?.length,
        Math.max(1, parseInt(questionParamId))
    )

    const currentQuestion = allQuestions?.find(
        (question) => question.id == questionId
    )

    const totalQuestions = allQuestions?.length
    const isLastQuestion = questionId == totalQuestions

    useTitle(`Ilmastoprofiili - Kysymys ${questionId}.`)

    const handleSubmit = () => {
        const responses = JSON.parse(localStorage.getItem('surveyResponses'))
        const groupToken = localStorage.getItem('groupToken')
        fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ responses, groupToken }),
        })
            .then((response) => response.json())
            .then((data) => {
                localStorage.removeItem('surveyResponses')
                navigate('/yhteenveto/' + data.user_id)
            })
            .catch((error) => {
                console.error('Error submitting data: ', error)
            })
    }

    // When new question is loaded, lookup the saved response for that question
    // and set the selected option to that value.
    useEffect(() => {
        const savedResponses =
            JSON.parse(localStorage.getItem('surveyResponses')) || {}
        setSelectedOptionId(savedResponses[questionId])
    }, [questionId])

    // On option selected, save the selected option for the question
    // to the local storage and move to the next question.
    const onOptionSelected = (selectedOptionId) => {
        setSelectedOptionId(selectedOptionId)

        const savedResponses =
            JSON.parse(localStorage.getItem('surveyResponses')) || {}

        savedResponses[questionId] = selectedOptionId
        localStorage.setItem('surveyResponses', JSON.stringify(savedResponses))

        // Automatically move to the next question
        if (!isLastQuestion) {
            setTimeout(() => {
                navigate(`/kysymys/${questionId + 1}`)
            }, 500)
        }
    }

    useEffect(() => {
        const handleKeyUp = (e) => {
            if (e.keyCode === 39) {
                if (!isLastQuestion) {
                    navigate(`/kysymys/${questionId + 1}`)
                }
            } else if (e.keyCode === 37) {
                if (questionId > 1) {
                    navigate(`/kysymys/${questionId - 1}`)
                }
            }
        }
        document.addEventListener('keyup', handleKeyUp)

        return () => document.removeEventListener('keyup', handleKeyUp)
    }, [questionId, isLastQuestion, navigate])

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
                        selectedOptionId={selectedOptionId}
                        onOptionSelected={onOptionSelected}
                    />
                    {/* Buttons */}
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={4}
                    >
                        <IconButton
                            aria-label="previous question"
                            href={`/kysymys/${questionId - 1}`}
                            disabled={questionId <= 1}
                        >
                            <ArrowCircleLeftIcon fontSize="large" />
                        </IconButton>
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
                            href={`/kysymys/${questionId + 1}`}
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
