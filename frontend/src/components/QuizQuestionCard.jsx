import {
    Button,
    Container,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

function QuizQuestionCard({
    question,
    selectedOptionsIds,
    onOptionSelected,
    alwaysCol,
    canAnswer = true,
}) {
    const cardStyles = {
        width: '80%',
        maxWidth: '800px',
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        padding: '5px',
        overflowY: 'auto',
    }

    const options = question.options

    return (
        <Card sx={cardStyles}>
            <CardContent>
                <Container
                    sx={{
                        minHeight: {
                            xs: '290px',
                            sm: '160px',
                        },
                        padding: '15px',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        sx={{ typography: { xs: 'h6', sm: 'h6', md: 'h5' } }}
                        textAlign="center"
                    >
                        {question.id + '. ' + question.content}
                    </Typography>
                </Container>

                <Stack
                    spacing={2}
                    marginTop={1}
                    direction={
                        alwaysCol
                            ? 'column'
                            : { xs: 'column', sm: 'column', md: 'row' }
                    }
                >
                    {options.map((option) => (
                        <Button
                            key={option.id}
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
    alwaysCol: PropTypes.bool,
    canAnswer: PropTypes.bool,
}

export default QuizQuestionCard
