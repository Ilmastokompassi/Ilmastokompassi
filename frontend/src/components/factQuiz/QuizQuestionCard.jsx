import {
    Button,
    Stack,
    Typography,
    LinearProgress,
    Box,
    Card,
    CardContent,
} from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import PropTypes from 'prop-types'
import shuffleArray from '../../utils/shuffleArray'
import { useEffect, useState } from 'react'

function QuizQuestionCard({
    question,
    questionId,
    totalQuestions,
    selectedOptionsIds,
    onOptionSelected,
    canAnswer,
    correctAnswers,
}) {
    const [options, setOptions] = useState([])

    // Use useEffect to only re-render the card component when question changes
    // to avoid re-shuffling the options on answer
    useEffect(() => setOptions(shuffleArray(question.options)), [question])

    return (
        <>
            <Card elevation={5}>
                <CardContent>
                    <Stack
                        spacing={2}
                        marginTop={1}
                        direction="column"
                        alignItems={'center'}
                        sx={{
                            marginX: {
                                xs: 2,
                                sm: 10,
                                md: 20,
                            },
                        }}
                    >
                        <Typography
                            variant="h2"
                            textAlign="center"
                            paddingY={6}
                        >
                            {question.id + '. ' + question.content}
                        </Typography>

                        {question.introduction}
                        {options.map((option) => (
                            <Stack
                                key={option.id}
                                direction="row"
                                alignItems="center"
                                gap={1}
                                sx={{
                                    width: '100%',
                                }}
                            >
                                <Button
                                    variant={
                                        selectedOptionsIds.has(option.id)
                                            ? 'contained'
                                            : 'outlined'
                                    }
                                    onClick={() => onOptionSelected(option.id)}
                                    disabled={!canAnswer}
                                    sx={{
                                        width: '100%',
                                        margin: 'auto',
                                    }}
                                >
                                    <Typography>{option.name}</Typography>
                                </Button>
                                {correctAnswers && (
                                    <>
                                        {correctAnswers.includes(option.id) ? (
                                            <CheckRoundedIcon
                                                data-testid={`correct-answer-${option.id}`}
                                                color={
                                                    selectedOptionsIds.has(
                                                        option.id
                                                    )
                                                        ? 'success'
                                                        : 'iconGray'
                                                }
                                            />
                                        ) : (
                                            <ClearRoundedIcon
                                                data-testid={`wrong-answer-${option.id}`}
                                                color={
                                                    selectedOptionsIds.has(
                                                        option.id
                                                    )
                                                        ? 'error'
                                                        : 'iconGray'
                                                }
                                            />
                                        )}
                                    </>
                                )}
                            </Stack>
                        ))}
                        <Typography variant="h2" padding={2}>
                            {questionId}/{totalQuestions}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
            <Box
                sx={{
                    padding: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={(questionId * 100) / totalQuestions}
                    style={{
                        width: '80%',
                    }}
                    aria-label="progressbar"
                />
            </Box>
        </>
    )
}

const questionProps = PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    options: PropTypes.array,
    introduction: PropTypes.string,
})

QuizQuestionCard.propTypes = {
    question: questionProps.isRequired,
    questionId: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    selectedOptionsIds: PropTypes.object,
    onOptionSelected: PropTypes.func,
    canAnswer: PropTypes.bool,
    correctAnswers: PropTypes.array,
}

export default QuizQuestionCard
