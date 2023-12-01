import { Button, Container, Stack, Typography } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import PropTypes from 'prop-types'
import shuffleArray from '../../utils/shuffleArray'
import { useEffect, useState } from 'react'

function QuizQuestionCard({
    question,
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
            <Container sx={{ padding: 2 }}>
                <Typography variant="h6" textAlign="center" paddingBottom={2}>
                    {question.id + '. ' + question.content}
                </Typography>

                {question.introduction}

                <Stack spacing={2} marginTop={1} direction="column">
                    {options.map((option) => (
                        <Stack
                            key={option.id}
                            direction="row"
                            alignItems="center"
                            gap={1}
                        >
                            <Button
                                fullWidth
                                variant={
                                    selectedOptionsIds.has(option.id)
                                        ? 'contained'
                                        : 'outlined'
                                }
                                onClick={() => onOptionSelected(option.id)}
                                disabled={!canAnswer}
                            >
                                {option.name}
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
                </Stack>
            </Container>
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
    selectedOptionsIds: PropTypes.object,
    onOptionSelected: PropTypes.func,
    canAnswer: PropTypes.bool,
    correctAnswers: PropTypes.array,
}

export default QuizQuestionCard
