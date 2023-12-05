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
    questionId,
    totalQuestions,
    handleSubmit,
}) {
    const options = question.options

    return (
        <>
            <Card elevation={5}>
                <CardContent>
                    <Stack>
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
                                xs: 'column',
                                sm: 'column',
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
                            questionId={questionId}
                            totalQuestions={totalQuestions}
                            handleSubmit={handleSubmit}
                        />
                    </Stack>
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
                    value={(questionId * 100) / totalQuestions}
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
    questionId: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}

export default SurveyQuestionCard
