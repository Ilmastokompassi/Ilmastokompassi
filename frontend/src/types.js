import PropTypes from 'prop-types'

export const RolePropTypes = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
})
