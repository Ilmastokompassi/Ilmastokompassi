import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from '@mui/material'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const consistentWidthStyle = {
    width: '80%',
    maxWidth: '800px',
}

const CorrectAnswersInfo = ({ options, correctAnswers }) => {
    const apuapu = options
        .filter((option) => correctAnswers.includes(option.id))
        .map((option) => option.name)

    return (
        <Accordion style={consistentWidthStyle}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography>Oikeat vastaukset</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <ul>
                    {apuapu.map((option) => (
                        <li key={option.id}>{option}</li>
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
