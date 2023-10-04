import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import useSWR from 'swr'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import QuestionCard from '../components/QuestionCard'

export const QuestionPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    margin-top: 100px;
`

export function QuestionPage() {
    const { questionId: questionParamId } = useParams()
    const [selectedOptionId, setSelectedOptionId] = useState(null)

    const questionId = parseInt(questionParamId)

    useEffect(() => {
        document.title = 'Kysymykset'
    }, [])

    const { data: allQuestions, isLoading: isLoadingAllQuestions } =
        useSWR('/api/question')

    const currentQuestion = allQuestions?.find(
        (question) => question.id == questionId
    )

    const totalQuestions = allQuestions?.length
    const isLastQuestion = questionId == totalQuestions

    const handleSubmit = () => {
        const responses = JSON.parse(localStorage.getItem('surveyResponses'))
        fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ responses }),
        })
            .then((response) => response.json())
            .then(() => {
                // Handle response from server
                // Possible redirect or show a thank-you message to user
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
    // to the local storage.
    const onOptionSelected = (selectedOptionId) => {
        setSelectedOptionId(selectedOptionId)

        const savedResponses =
            JSON.parse(localStorage.getItem('surveyResponses')) || {}

        savedResponses[questionId] = selectedOptionId
        localStorage.setItem('surveyResponses', JSON.stringify(savedResponses))
    }

    return (
        <QuestionPageContainer>
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
                        sx={{
                            width: '275px',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            aria-label="previous question"
                            href={`/question/${questionId - 1}`}
                            disabled={questionId <= 1}
                        >
                            <ArrowCircleLeftIcon fontSize="large" />
                        </IconButton>
                        {isLastQuestion ? (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Submit
                            </Button>
                        ) : (
                            <Typography>
                                {questionId}/{totalQuestions}
                            </Typography>
                        )}
                        <IconButton
                            aria-label="next question"
                            href={`/question/${questionId + 1}`}
                            disabled={
                                !totalQuestions || questionId >= totalQuestions
                            }
                        >
                            <ArrowCircleRightIcon fontSize="large" />
                        </IconButton>
                    </Stack>
                </>
            )}
        </QuestionPageContainer>
    )
}
