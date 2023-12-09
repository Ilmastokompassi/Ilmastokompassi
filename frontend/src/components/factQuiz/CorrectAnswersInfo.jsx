import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CorrectAnswersInfo = ({
    options,
    correctAnswers,
    selectedOptionsIds,
}) => {
    const correctOptions = options.filter((option) =>
        correctAnswers.includes(option.id)
    )

    let correctUserAnswersCount = 0
    selectedOptionsIds.forEach((optionId) => {
        if (correctAnswers.includes(optionId)) {
            correctUserAnswersCount += 1
        }
    })

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="correct-answers-content"
            >
                Oikeat vastaukset
            </AccordionSummary>
            <AccordionDetails id="correct-answers-content">
                Olet valinnut oikein {correctUserAnswersCount}{' '}
                {correctUserAnswersCount === 1 ? 'vastauksen' : 'vastausta'}:
                <ul style={{ listStylePosition: 'inside' }}>
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
    selectedOptionsIds: PropTypes.instanceOf(Set),
}

export default CorrectAnswersInfo
