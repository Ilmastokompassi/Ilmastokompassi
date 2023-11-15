import {
    Button,
    Container,
    Card,
    CardContent,
    Stack,
    Typography,
    Box,
    Icon,
} from '@mui/material'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

function QuizQuestionCard({
    question,
    selectedOptionsIds,
    onOptionSelected,
    alwaysCol,
    canAnswer = true,
    correctAnswers,
}) {
    const cardStyles = {
        width: '80%',
        maxWidth: '800px',
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        padding: '5px',
        overflowY: 'auto',
    }

    const QuestionBox = styled(Box)`
        display: flex;
        justify-content: center;
        gap: 10px;
    `

    const QuestionButton = styled(Button)`
        width: 100%;
        // Apply default border styles here if needed

        // Override styles for correct and incorrect answers
        border-color: ${({ isSelected, isCorrect }) => {
            if (isSelected) {
                return isCorrect ? 'green' : 'red'
            }
            return 'default' // default border color when unselected
        }};

        // Override styles for disabled buttons
        &:disabled {
            border-color: ${({ isCorrect }) =>
                isCorrect ? 'green' : 'default'};
            // Keep other disabled styles or override them as needed
        }

        // Add other styles for the button here
    `

    const options = question.options

    console.log('correct', correctAnswers)

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
                        <QuestionBox key={option.id}>
                            <QuestionButton
                                variant={
                                    selectedOptionsIds.has(option.id)
                                        ? 'contained'
                                        : 'outlined'
                                }
                                onClick={() => onOptionSelected(option.id)}
                                disabled={!canAnswer}
                            >
                                <Typography>{option.name}</Typography>
                            </QuestionButton>
                            {correctAnswers &&
                            correctAnswers.includes(option.id) &&
                            selectedOptionsIds.has(option.id) ? (
                                <Icon
                                    sx={{
                                        color: 'green',
                                        fontSize: '2rem',
                                    }}
                                >
                                    <CheckRoundedIcon />
                                </Icon>
                            ) : correctAnswers &&
                              selectedOptionsIds.has(option.id) ? (
                                <Icon
                                    sx={{
                                        color: 'red',
                                        fontSize: '2rem',
                                    }}
                                >
                                    <ClearRoundedIcon />
                                </Icon>
                            ) : null}
                        </QuestionBox>
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
    correctAnswers: PropTypes.array,
}

export default QuizQuestionCard
