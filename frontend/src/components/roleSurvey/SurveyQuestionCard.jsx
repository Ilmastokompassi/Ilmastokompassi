import {
    Button,
    Box,
    Container,
    Stack,
    Typography,
    Card,
    CardContent,
    LinearProgress,
} from '@mui/material'
import RoleQuestionButtons from './RoleQuestionButtons'
import PropTypes from 'prop-types'

function SurveyQuestionCard({
    question,
    selectedOptionsIds,
    onOptionSelected,
    totalQuestions,
    handleSubmit,
}) {
    const options = question.options

    return (
        <>
            <Card elevation={5}>
                <CardContent>
                    <Container
                        sx={{
                            minHeight: {
                                xs: '260px',
                                sm: '280px',
                            },
                            paddingX: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <Typography variant="h2" paddingY={6}>
                            {question.id + '. ' + question.content + '.'}
                        </Typography>
                    </Container>

                    <Stack
                        spacing={2}
                        marginTop={1}
                        direction={{
                            xs: 'column-reverse',
                            sm: 'column-reverse',
                            md: 'row',
                        }}
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
                                sx={{
                                    minHeight: {
                                        xs: '46px',
                                        sm: '82px',
                                    },
                                }}
                                onClick={() => onOptionSelected(option.id)}
                            >
                                <Typography>{option.name}</Typography>
                            </Button>
                        ))}
                    </Stack>
                    {/* Buttons */}
                    <RoleQuestionButtons
                        questionId={question.id}
                        totalQuestions={totalQuestions}
                        handleSubmit={handleSubmit}
                    />
                </CardContent>
            </Card>
            <Box
                sx={{
                    paddingTop: 2,
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <LinearProgress
                    variant="determinate"
                    value={(question.id * 100) / totalQuestions}
                    style={{ width: '80%' }}
                    aria-label="progressbar"
                />
            </Box>
        </>
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
    totalQuestions: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default SurveyQuestionCard
