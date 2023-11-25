import {
    Button,
    Container,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

function SurveyQuestionCard({
    question,
    selectedOptionsIds,
    onOptionSelected,
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
                    <Typography variant="h6" textAlign="center">
                        {question.id + '. ' + question.content}
                    </Typography>
                </Container>

                <Stack
                    spacing={2}
                    marginTop={1}
                    direction={{ xs: 'column', sm: 'column', md: 'row' }}
                >
                    {options.map((option) => (
                        <Button
                            key={option.id}
                            data-testid={`option-${option.id}`}
                            variant={
                                option.id === selectedOptionsIds
                                    ? 'contained'
                                    : 'outlined'
                            }
                            onClick={() => onOptionSelected(option.id)}
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

SurveyQuestionCard.propTypes = {
    question: questionProps.isRequired,
    selectedOptionsIds: PropTypes.number,
    onOptionSelected: PropTypes.func,
    alwaysCol: PropTypes.bool,
    canAnswer: PropTypes.bool,
}

export default SurveyQuestionCard
