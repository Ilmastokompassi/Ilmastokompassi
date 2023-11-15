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

const FactInfoBox = ({ content }) => {
    return (
        <Accordion style={consistentWidthStyle}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>Selitykset</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {content.map((line, index) => (
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

FactInfoBox.propTypes = {
    content: PropTypes.array,
}

export default FactInfoBox
