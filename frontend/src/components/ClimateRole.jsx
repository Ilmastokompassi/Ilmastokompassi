import { Card, CardContent, Box } from '@mui/material'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

export const ClimateRole = ({ description }) => {
    return (
        <Card variant="inline">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowWrap: 'break-word',
                }}
            >
                <CardContent>
                    <Typography>{description}</Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

ClimateRole.propTypes = {
    description: PropTypes.string.isRequired,
}
