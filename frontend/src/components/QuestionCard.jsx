import { Button, Card, CardContent, Stack } from '@mui/material'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

function QuestionCard({ question, selectedOptionId, onOptionSelected }) {
    const cardStyles = {
        width: '80%',
        maxWidth: '800px',
        height: '50vh',
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        padding: '10px',
        marginTop: '50px',
        marginBottom: '20px',
        overflowY: 'auto',
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
                <Typography variant="h1" textAlign="center" fontSize={48}>
                    {question.id + '. ' + question.content}
                </Typography>
                <Stack spacing={2} marginTop={4}>
                    {options.map((option) => (
                        <Button
                            key={option.id}
                            variant={
                                option.id == selectedOptionId
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
