import { Button, IconButton, Stack, Typography } from '@mui/material'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import PropTypes from 'prop-types'

export default function RoleQuestionButtons({
    questionId,
    totalQuestions,
    handleSubmit,
}) {
    const isLastQuestion = questionId === totalQuestions

    return (
        <Stack alignItems="center" paddingTop={6}>
            <Stack
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                spacing={4}
                paddingY={1}
            >
                <IconButton
                    data-testid="previous-question"
                    aria-label="previous question"
                    href={`/kysymys/${questionId - 1}`}
                    disabled={questionId <= 1}
                >
                    <ArrowCircleLeftIcon fontSize="large" />
                </IconButton>
                {isLastQuestion ? (
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSubmit}
                    >
                        <Typography>Lopeta kysely</Typography>
                    </Button>
                ) : (
                    <Typography data-testid="current-progress" variant="h2">
                        {questionId}/{totalQuestions}
                    </Typography>
                )}
                <IconButton
                    data-testid="next-question"
                    aria-label="next question"
                    href={`/kysymys/${questionId + 1}`}
                    disabled={!totalQuestions || questionId >= totalQuestions}
                >
                    <ArrowCircleRightIcon fontSize="large" />
                </IconButton>
            </Stack>
        </Stack>
    )
}

RoleQuestionButtons.propTypes = {
    questionId: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    handleSubmit: PropTypes.func.isRequired,
}
