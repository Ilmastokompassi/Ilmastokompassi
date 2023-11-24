import { Typography, Box, CardContent, CardHeader, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import RoleImage from './RoleImage'
import { theme } from '../theme'

export const SummaryRole = ({ index, title, description }) => {
    return (
        <>
            <Box
                sx={{
                    display: { xs: 'flex', md: 'flex' },
                    flexDirection: 'column',
                    paddingBottom: '40px',
                    overflowWrap: 'break-word',
                    alignItems: 'center',

                    [theme.breakpoints.up('md')]: {
                        justifyContent: 'space-between',
                        alignItems: 'stretch',
                        flexDirection: 'row-reverse',
                        ...(index % 2 === 0 && {
                            flexDirection: 'row',
                        }),
                    },
                }}
            >
                <Stack paddingBottom={'20px'} padding={'10px'}>
                    <RoleImage title={title} />
                </Stack>
                <Stack>
                    <CardHeader
                        sx={{ textAlign: 'left' }}
                        titleTypographyProps={{
                            variant: 'h5',
                        }}
                        title={title + '!'}
                    ></CardHeader>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography>{description}</Typography>
                    </CardContent>
                </Stack>
            </Box>
        </>
    )
}
SummaryRole.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired, // You can adjust the PropTypes as needed
    description: PropTypes.string.isRequired,
}
