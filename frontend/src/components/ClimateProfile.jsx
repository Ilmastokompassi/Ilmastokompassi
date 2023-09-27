import { Card, CardContent, CardHeader, Box } from '@mui/material'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import PropTypes from 'prop-types'

export const ProfileContainer = styled.div`
    margin: 30px;
`

export const ClimateProfile = ({ id, title, description }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'row',
                ...(id % 2 === 0 && {
                    flexDirection: 'row-reverse',
                }),
                justifyContent: 'space-between',
                width: '70%',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                    sx={{ textAlign: 'center' }}
                    titleTypographyProps={{ variant: 'h2' }}
                    title={title}
                />
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography>{description}</Typography>
                </CardContent>
            </Box>
        </Card>
    )
}

ClimateProfile.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}
