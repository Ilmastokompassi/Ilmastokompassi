import { Button } from '@mui/material'
import PropTypes from 'prop-types'

function QuestionButton({ option, selectedOption, onClick }) {
    return (
        <Button
            variant={selectedOption === option ? 'contained' : 'outlined'}
            onClick={() => onClick(option)}
        >
            {option}
        </Button>
    )
}

QuestionButton.propTypes = {
    option: PropTypes.string.isRequired,
    selectedOption: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default QuestionButton
