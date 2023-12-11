import { Button, Stack, Typography, Card, CardContent } from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import PropTypes from 'prop-types'

const ResultIcon = ({ correctAnswers, selectedOptionsIds, optionId }) =>
    correctAnswers.includes(optionId) ? (
        <CheckRoundedIcon
            data-testid={`correct-answer-${optionId}`}
            color={selectedOptionsIds.has(optionId) ? 'success' : 'iconGray'}
        />
    ) : (
        <ClearRoundedIcon
            data-testid={`wrong-answer-${optionId}`}
            color={selectedOptionsIds.has(optionId) ? 'error' : 'iconGray'}
        />
    )

const QuizQuestionCard = ({
    question,
    totalQuestions,
    selectedOptionsIds,
    onOptionSelected,
    correctAnswers,
}) => (
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
                {question.options.map((option) => (
                    <Stack
                        data-testid={`answer-${option.id}`}
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
                        {correctAnswers && (
                            <ResultIcon
                                correctAnswers={correctAnswers}
                                selectedOptionsIds={selectedOptionsIds}
                                optionId={option.id}
                            />
                        )}
                    </Stack>
                ))}
                <Typography variant="h2" paddingY={2}>
                    {question.id}/{totalQuestions}
                </Typography>
            </Stack>
        </CardContent>
    </Card>
)

ResultIcon.propTypes = {
    correctAnswers: PropTypes.array.isRequired,
    selectedOptionsIds: PropTypes.instanceOf(Set).isRequired,
    optionId: PropTypes.number.isRequired,
}

const questionProps = PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    options: PropTypes.array,
    introduction: PropTypes.string,
})

QuizQuestionCard.propTypes = {
    question: questionProps.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    selectedOptionsIds: PropTypes.instanceOf(Set).isRequired,
    onOptionSelected: PropTypes.func,
    correctAnswers: PropTypes.array,
}

export default QuizQuestionCard
