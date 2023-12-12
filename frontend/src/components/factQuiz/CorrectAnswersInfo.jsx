import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CorrectAnswersInfo = ({ options, correctAnswers }) => {
    const correctOptions = options.filter((option) =>
        correctAnswers.includes(option.id)
    )

    return (
        <Accordion elevation={5}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="correct-answers-content"
            >
                Oikeat vastaukset
            </AccordionSummary>
            <AccordionDetails id="correct-answers-content">
                <ul
                    style={{
                        listStylePosition: 'inside',
                        textAlign: 'left',
                    }}
                >
                    {correctOptions.map((option) => (
                        <li key={option.id}>{option.name}</li>
                    ))}
                </ul>
            </AccordionDetails>
        </Accordion>
    )
}

const optionProps = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
})

CorrectAnswersInfo.propTypes = {
    options: PropTypes.arrayOf(optionProps).isRequired,
    correctAnswers: PropTypes.array,
}

export default CorrectAnswersInfo
