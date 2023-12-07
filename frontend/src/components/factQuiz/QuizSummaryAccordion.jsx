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
                <Typography textAlign={'center'}>Oikeat vastaukset</Typography>

                <ul>
                    {correctAnswers.map((answer, index) => (
                        <li key={index}>{answer}</li>
                    ))}
                </ul>
                <Typography paddingBottom={3} textAlign={'center'}>
                    Mistä tässä on kyse?
                </Typography>
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
