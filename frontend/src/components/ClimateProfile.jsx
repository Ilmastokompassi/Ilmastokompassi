import { Card, CardContent, CardHeader, Box } from '@mui/material'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

export const ClimateProfile = ({ name, description }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    overflowWrap: 'break-word',
                }}
            >
                <CardHeader
                    sx={{ textAlign: 'center' }}
                    titleTypographyProps={{
                        variant: 'h2',
                        sx: { fontSize: '2em' },
                    }}
                    title={name}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography>{description}</Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

ClimateProfile.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}
