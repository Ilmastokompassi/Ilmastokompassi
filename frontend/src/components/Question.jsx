import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, Button, IconButton, Stack } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import QuestionButton from './QuestionButton'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import useSWR from 'swr'
import PropTypes from 'prop-types'

export const Heading = styled(Typography)`
    font-size: 50px;
    text-align: center;
`

export const QuestionOptionsContainer = styled.div`
    margin: 30px;
`

export const QuestionPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    margin-top: 100px;
`

function Question({ questionId }) {
    const navigate = useNavigate()

    const [selectedOption, setSelectedOption] = useState(null)

    const { data: questionData } = useSWR(`/api/question/${questionId}`)
    const { data: allQuestions } = useSWR('/api/question')
    const totalQuestions = allQuestions?.length

    useEffect(() => {
        const savedResponses =
            JSON.parse(localStorage.getItem('surveyResponses')) || {}
        setSelectedOption(savedResponses[questionId])
    }, [questionId])

    const handleOptionClick = (option) => {
        setSelectedOption(option)
        const savedResponses =
            JSON.parse(localStorage.getItem('surveyResponses')) || {}
        savedResponses[questionId] = option
        localStorage.setItem('surveyResponses', JSON.stringify(savedResponses))
    }

    const handleNext = () => {
        const nextId = questionId + 1
        navigate(`/question/${nextId}`)
    }

    const handlePrevious = () => {
        if (questionId > 1) {
            const previousId = questionId - 1
            navigate(`/question/${previousId}`)
        }
    }
    const handleSubmit = () => {
        return null // Add submit function
    }

    if (!questionData) return null

    const cardStyles = {
        width: '80%',
        maxWidth: '800px',
        height: '50vh',
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        padding: '10px',
        marginTop: '50px',
        marginBottom: '20px',
        overflowY: 'auto',
    }

    const isLastQuestion = questionId >= totalQuestions

    const options = [
        'Täysin eri mieltä',
        'Jokseenkin eri mieltä',
        'En samaa enkä eri mieltä',
        'Jokseenkin samaa mieltä',
        'Täysin samaa mieltä',
    ]

    return (
        <QuestionPageContainer>
            <Card sx={cardStyles}>
                <CardContent>
                    <Heading variant="h1">
                        {questionData.id}/{totalQuestions}{' '}
                        {questionData.content}
                    </Heading>
                    <QuestionOptionsContainer>
                        <Stack spacing={2}>
                            {options.map((option) => (
                                <QuestionButton
                                    key={option}
                                    option={option}
                                    selectedOption={selectedOption}
                                    onClick={() => handleOptionClick(option)}
                                />
                            ))}
                        </Stack>
                    </QuestionOptionsContainer>
                </CardContent>
            </Card>
            <Stack
                direction="row"
                sx={{ width: '275px', justifyContent: 'space-between' }}
            >
                <IconButton
                    aria-label="previous question"
                    onClick={handlePrevious}
                    disabled={questionId <= 1}
                >
                    <ArrowCircleLeftIcon fontSize="large" />
                </IconButton>
                {isLastQuestion && (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                )}
                <IconButton
                    aria-label="next question"
                    onClick={handleNext}
                    disabled={!totalQuestions || questionId >= totalQuestions}
                >
                    <ArrowCircleRightIcon fontSize="large" />
                </IconButton>
            </Stack>
        </QuestionPageContainer>
    )
}

Question.propTypes = {
    questionId: PropTypes.number.isRequired,
}

export default Question
