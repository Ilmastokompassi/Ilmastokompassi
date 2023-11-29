import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PropTypes from 'prop-types'

const QuizSummaryAccordion = ({ questionText, correctAnswers }) => {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{questionText}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul>
                    {correctAnswers.map((answer, index) => (
                        <li key={index}>
                            <Typography>{answer}</Typography>
                        </li>
                    ))}
                </ul>
            </AccordionDetails>
        </Accordion>
    )
}

QuizSummaryAccordion.propTypes = {
    questionText: PropTypes.string.isRequired,
    correctAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default QuizSummaryAccordion
