import { Button, Card, CardContent, Stack } from '@mui/material'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

function QuestionCard({ question, selectedOption, onOptionSelected }) {
    const cardStyles = {
        width: '80%',
        maxWidth: '800px',
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        padding: '5px',
        overflowY: 'auto',
    }

    const options = [
        'Täysin eri mieltä',
        'Jokseenkin eri mieltä',
        'En samaa enkä eri mieltä',
        'Jokseenkin samaa mieltä',
        'Täysin samaa mieltä',
    ]

    return (
        <Card sx={cardStyles}>
            <CardContent>
                <Typography variant="h1" textAlign="center" fontSize={18}>
                    {question.id + '. ' + question.content}
                </Typography>
                <Stack spacing={2} marginTop={4}>
                    {options.map((option, index) => (
                        <Button
                            key={index}
                            variant={
                                selectedOption == option
                                    ? 'contained'
                                    : 'outlined'
                            }
                            onClick={() => onOptionSelected(option)}
                        >
                            {option}
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
    selectedOption: PropTypes.string,
    onOptionSelected: PropTypes.func,
}

export default QuestionCard
