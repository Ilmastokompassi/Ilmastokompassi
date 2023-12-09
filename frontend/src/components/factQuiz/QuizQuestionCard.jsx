import { Button, Stack, Typography, Card, CardContent } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import PropTypes from 'prop-types'
import shuffleArray from '../../utils/shuffleArray'
import { useEffect, useState } from 'react'

const QuizQuestionCard = ({
    question,
    questionId,
    totalQuestions,
    selectedOptionsIds,
    onOptionSelected,
    correctAnswers,
}) => {
    const [options, setOptions] = useState([])

    // Use useEffect to only re-render the card component when question changes
    // to avoid re-shuffling the options on answer
    useEffect(() => setOptions(shuffleArray(question.options)), [question])

    const renderResultIcon = (optionId) =>
        correctAnswers.includes(optionId) ? (
            <CheckRoundedIcon
                data-testid={`correct-answer-${optionId}`}
                color={
                    selectedOptionsIds.has(optionId) ? 'success' : 'iconGray'
                }
            />
        ) : (
            <ClearRoundedIcon
                data-testid={`wrong-answer-${optionId}`}
                color={selectedOptionsIds.has(optionId) ? 'error' : 'iconGray'}
            />
        )

    return (
        <Card elevation={5}>
            <CardContent>
                <Stack
                    spacing={2}
                    marginTop={1}
                    direction="column"
                    alignItems="center"
                    marginX={{
                        xs: 2,
                        sm: 10,
                        md: 20,
                    }}
                >
                    <Typography variant="h2" textAlign="center" paddingY={6}>
                        {question.id + '. ' + question.content}
                    </Typography>

                    {question.introduction}
                    {options.map((option) => (
                        <Stack
                            key={option.id}
                            direction="row"
                            alignItems="center"
                            gap={1}
                            width="100%"
                        >
                            <Button
                                variant={
                                    selectedOptionsIds.has(option.id)
                                        ? 'contained'
                                        : 'outlined'
                                }
                                onClick={() => onOptionSelected(option.id)}
                                disabled={Boolean(correctAnswers)}
                                sx={{
                                    width: '100%',
                                    margin: 'auto',
                                }}
                            >
                                <Typography>{option.name}</Typography>
                            </Button>
                            {correctAnswers && renderResultIcon(option.id)}
                        </Stack>
                    ))}
                    <Typography variant="h2" paddingY={2}>
                        {questionId}/{totalQuestions}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
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
    selectedOptionsIds: PropTypes.instanceOf(Set),
    onOptionSelected: PropTypes.func,
    correctAnswers: PropTypes.array,
}

export default QuizQuestionCard
