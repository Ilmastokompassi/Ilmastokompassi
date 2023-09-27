import { Card, CardContent, CardHeader, Box } from '@mui/material'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import PropTypes from 'prop-types'

export const ProfileContainer = styled.div`
    margin: 30px;
`

export const ClimateProfile = ({ title, description }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                    titleTypographyProps={{ variant: 'h2' }}
                    title={title}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography>{description}</Typography>
                </CardContent>
            </Box>
            <WbSunnyIcon color="black" fontSize="large" />
        </Card>
    )
}

ClimateProfile.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}
