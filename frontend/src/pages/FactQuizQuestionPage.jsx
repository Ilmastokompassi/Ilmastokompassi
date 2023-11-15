import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Stack,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import QuizQuestionCard from '../components/QuizQuestionCard'
import { useTitle } from '../hooks/useTitle'
import useSWR from 'swr'
import { useSwipeable } from 'react-swipeable'

export const FactQuizQuestionPage = () => {
    const { questionId: questionParamId } = useParams()
    const [selectedOptionsIds, setSelectedOptionsIds] = useState(new Set())
    const [hasAnswered, setHasAnswered] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(null)
    const [infoText, setInfoText] = useState(null)

    const responseId = localStorage.getItem('quizResponseId')
    const groupToken = localStorage.getItem('groupToken')

    const navigate = useNavigate()
    const handlers = useSwipeable({
        onSwipedLeft: () => navigate(`/kysymys/${questionId + 1}`),
        onSwipedRight: () => navigate(`/kysymys/${questionId - 1}`),
    })

    const consistentWidthStyle = {
        width: '80%',
        maxWidth: '800px',
    }

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
                    responseId: parseInt(responseId),
                }),
            })
            const data = await response.json()
            console.log(data)
            setCorrectAnswers(data.correct_answers)
            setInfoText(data.info_text)
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
        setCorrectAnswers(null)
        setInfoText(null)
        setSelectedOptionsIds(new Set())
    }

    useTitle(`Tietovisa - Kysymys ${questionId}.`)

    return (
        <div {...handlers}>
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
                        <QuizQuestionCard
                            question={currentQuestion}
                            selectedOptionsIds={selectedOptionsIds}
                            onOptionSelected={onOptionSelected}
                            alwaysCol={true}
                            canAnswer={!hasAnswered}
                            correctAnswers={correctAnswers}
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
                                <>
                                    {infoText && (
                                        <Accordion
                                            style={consistentWidthStyle}
                                            infotext={infoText}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography>
                                                    Selitykset
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                {infoText}
                                            </AccordionDetails>
                                        </Accordion>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={`/tietovisa/${questionId + 1}`}
                                        onClick={handleNextQuestion}
                                    >
                                        Seuraava kysymys
                                    </Button>
                                </>
                            )}
                            {hasAnswered && isLastQuestion ? (
                                <>
                                    <Accordion
                                        style={consistentWidthStyle}
                                        infotext={infoText}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography>Selitykset</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {infoText}
                                        </AccordionDetails>
                                    </Accordion>

                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleAnswer}
                                    >
                                        Lopeta kysely
                                    </Button>
                                </>
                            ) : (
                                <Typography>
                                    {questionId}/{totalQuestions}
                                </Typography>
                            )}
                        </Stack>
                    </>
                )}
            </Stack>
        </div>
    )
}
