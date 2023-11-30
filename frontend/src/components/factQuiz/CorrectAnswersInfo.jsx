import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const CorrectAnswersInfo = ({ options, correctAnswers, userAnswers }) => {
    const correctOptions = options.filter((option) =>
        correctAnswers.includes(option.id)
    )

    let correctUserAnswersCount = 0
    userAnswers.forEach((optionId) => {
        if (correctAnswers.includes(optionId)) {
            correctUserAnswersCount += 1
        }
    })

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography>Oikeat vastaukset</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Olet valinnut oikein {correctUserAnswersCount}
                </Typography>
                <ul>
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
    userAnswers: PropTypes.array,
}

export default CorrectAnswersInfo
