import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import SurveyQuestionCard from '../components/roleSurvey/SurveyQuestionCard'
import { useTitle } from '../hooks/useTitle'
import { useSwipeable } from 'react-swipeable'

export function RoleSurveyQuestionPage() {
    const { questionId: questionParamId } = useParams()
    const [selectedOptionId, setSelectedOptionId] = useState(null)
    const navigate = useNavigate()

    const options = [
        { id: 1, name: 'Täysin eri mieltä' },
        { id: 2, name: 'Jokseenkin eri mieltä' },
        { id: 3, name: 'En samaa enkä eri mieltä' },
        { id: 4, name: 'Jokseenkin samaa mieltä' },
        { id: 5, name: 'Täysin samaa mieltä' },
    ]

    const handlers = useSwipeable({
        onSwipedLeft: () => navigate(`/kysymys/${questionId + 1}`),
        onSwipedRight: () => navigate(`/kysymys/${questionId - 1}`),
    })

    const { data: allQuestions, isLoading: isLoadingAllQuestions } = useSWR(
        '/api/survey/questions'
    )

    const questionId = Math.min(
        allQuestions?.length,
        Math.max(1, parseInt(questionParamId))
    )

    const currentQuestion = allQuestions?.find(
        (question) => question.id == questionId
    )

    const totalQuestions = allQuestions?.length
    const isLastQuestion = questionId == totalQuestions

    useTitle(`Ilmastorooli - Kysymys ${questionId}.`)

    const handleSubmit = () => {
        const responses = JSON.parse(localStorage.getItem('surveyResponses'))
        const groupToken = localStorage.getItem('groupToken')
        fetch('/api/survey/submit', {
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
            }, 200)
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
        <div {...handlers}>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
                margin={2}
                padding={{ xs: 2, sm: 2, md: 4 }}
                style={{ minHeight: '80vh' }}
                data-testid="questions"
            >
                {isLoadingAllQuestions ? (
                    <p>Loading...</p>
                ) : (
                    <Box>
                        {/* Question options card */}
                        <SurveyQuestionCard
                            question={{
                                ...currentQuestion,
                                options: options,
                            }}
                            selectedOptionsIds={selectedOptionId}
                            onOptionSelected={onOptionSelected}
                            totalQuestions={totalQuestions}
                            handleSubmit={handleSubmit}
                        />
                    </Box>
                )}
            </Stack>
        </div>
    )
}
