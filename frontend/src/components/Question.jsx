import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, CardContent, IconButton, Stack } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import QuestionButton from './QuestionButton'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'

export const Heading = styled(Typography)`
    font-size: 50px;
`

export const QuestionOptionsContainer = styled.div`
    margin: 50px;
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
                const response = await fetch(
                    `/api/question`
                )
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const questions = await response.json()
                console.log(questions.length)
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
                const response = await fetch(
                    `http://127.0.0.1:5000/api/question/${questionId}`
                )
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

    const handleOptionClick = (option) => {
        setSelectedOption(option)
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

    if (!questionData) return null

    const cardStyles = {
        minWidth: 275,
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        padding: '20px',
        marginTop: '50px',
        marginBottom: '20px',
    }

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
