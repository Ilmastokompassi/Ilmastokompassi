import {
    Button,
    Container,
    Card,
    CardContent,
    Stack,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'

function QuestionCard({ question, selectedOptionId, onOptionSelected }) {
    const cardStyles = {
        width: '80%',
        maxWidth: '800px',
        backgroundColor: '#f9f9f9',
        borderRadius: '6px',
        padding: '5px',
        overflow: 'hidden', // Hide overflow content
    }

    const questionStyles = {
        maxHeight: 'none', // Reset max height for the question
        overflow: 'auto', // Enable vertical scrolling for the question
    }

    const optionsContainerStyles = {
        maxHeight: '300px', // Set a fixed height for the options container
        overflowY: 'auto', // Enable vertical scrolling for the options
    }

    const options = [
        { id: 1, name: 'Täysin eri mieltä' },
        { id: 2, name: 'Jokseenkin eri mieltä' },
        { id: 3, name: 'En samaa enkä eri mieltä' },
        { id: 4, name: 'Jokseenkin samaa mieltä' },
        { id: 5, name: 'Täysin samaa mieltä' },
    ]

    return (
        <Card sx={cardStyles}>
            <CardContent>
                <Container
                    sx={{
                        minHeight: {
                            nav_sm: '160px',
                            xs: '165px',
                            sm: '100px',
                        },
                        padding: '5px',
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h1"
                        textAlign="center"
                        fontSize={18}
                        sx={questionStyles}
                    >
                        {question.id + '. ' + question.content}
                    </Typography>
                </Container>

                <Stack spacing={2} marginTop={1} sx={optionsContainerStyles}>
                    {options.map((option) => (
                        <Button
                            key={option.id}
                            variant={
                                option.id === selectedOptionId
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
})

QuestionCard.propTypes = {
    question: questionProps.isRequired,
    selectedOptionId: PropTypes.number,
    onOptionSelected: PropTypes.func,
}

export default QuestionCard
