import {
    Button,
    Container,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import PropTypes from 'prop-types'

function QuizQuestionCard({
    question,
    selectedOptionsIds,
    onOptionSelected,
    canAnswer,
    correctAnswers,
}) {
    return (
        <Card sx={{ width: '100%', borderRadius: 2 }}>
            <CardContent>
                <Container sx={{ padding: 2 }}>
                    <Typography
                        sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h5' } }}
                        textAlign="center"
                    >
                        {question.id + '. ' + question.content}
                    </Typography>
                </Container>

                <Stack spacing={2} marginTop={1} direction="column">
                    {question.options.map((option) => (
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
                            {correctAnswers &&
                                selectedOptionsIds.has(option.id) && (
                                    <>
                                        {correctAnswers.includes(option.id) ? (
                                            <CheckRoundedIcon color="success" />
                                        ) : (
                                            <ClearRoundedIcon color="error" />
                                        )}
                                    </>
                                )}
                        </Stack>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}

const questionProps = PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    options: PropTypes.array,
})

QuizQuestionCard.propTypes = {
    question: questionProps.isRequired,
    selectedOptionsIds: PropTypes.object,
    onOptionSelected: PropTypes.func,
    canAnswer: PropTypes.bool,
    correctAnswers: PropTypes.array,
}

export default QuizQuestionCard
