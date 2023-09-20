import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, Button, IconButton, Stack } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import QuestionButton from './QuestionButton'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'

export const Heading = styled(Typography)`
    font-size: 50px;
    text-align: center
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

function Question() {
    const { id } = useParams()
    const questionId = Number(id)
    const navigate = useNavigate()

    const [selectedOption, setSelectedOption] = useState(null)
    const [questionData, setQuestionData] = useState(null)
    const [totalQuestions, setTotalQuestions] = useState(null)

    useEffect(() => {
        const fetchTotalQuestions = async () => {
            try {
                const response = await fetch(`/api/question`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const questions = await response.json()
                setTotalQuestions(questions.length)
            } catch (error) {
                console.error('Error fetching the total questions:', error)
            }
        }

        fetchTotalQuestions()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/question/${questionId}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const questionData = await response.json()
                setQuestionData(questionData)
            } catch (error) {
                console.error('Error fetching the question data:', error)
            }
        }

        fetchData()
    }, [questionId])

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

    const isLastQuestion = questionId >= totalQuestions;
    
    return (
        <QuestionPageContainer>
            <Card sx={cardStyles}>
                <CardContent>
                    <Heading variant="h1">{questionData.question}</Heading>
                    <QuestionOptionsContainer>
                        <Stack spacing={2}>
                            {questionData.options.map((option) => (
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
                <IconButton onClick={handlePrevious} disabled={questionId <= 1}>
                    <ArrowCircleLeftIcon fontSize="large" />
                </IconButton>
                {isLastQuestion &&
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                }
                <IconButton
                    onClick={handleNext}
                    disabled={!totalQuestions || questionId >= totalQuestions}
                >
                    <ArrowCircleRightIcon fontSize="large" />
                </IconButton>
                
                
            </Stack>
        </QuestionPageContainer>
    )
}

export default Question
