import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'

const QuizSummaryAccordion = ({ questionText, correctAnswers, infoText }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{questionText}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                Oikeat vastaukset:
                <ul>
                    {correctAnswers.map((answer, index) => (
                        <li key={index}>{answer}</li>
                    ))}
                </ul>
                {infoText.split('\n').map((line, index) => (
                    <Typography
                        key={index}
                        sx={{
                            paddingBottom: '1em',
                        }}
                    >
                        {line}
                    </Typography>
                ))}
            </AccordionDetails>
        </Accordion>
    )
}

QuizSummaryAccordion.propTypes = {
    questionText: PropTypes.string.isRequired,
    correctAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
    infoText: PropTypes.string,
}

export default QuizSummaryAccordion
