import {
    Typography,
    Skeleton,
    Box,
    Card,
    CardContent,
    CardHeader,
} from '@mui/material'

import PropTypes from 'prop-types'

export const SummaryProfile = ({ title, description }) => {
    return (
        <>
            <Box
                sx={{
                    display: { xs: 'flex', md: 'flex' },
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: '40px',
                }}
            >
                <Box paddingBottom={'20px'} padding={'10px'}>
                    <Skeleton variant="rectangular" width={250} height={250} />
                </Box>
            </Box>
            <Card variant="outlined" sx={{ width: '100%' }}>
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
                            fontSize: {
                                xs: '1.5em',
                                sm: '1.75em',
                                md: '2em',
                            },
                        }}
                        title={title}
                    ></CardHeader>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography
                            variant="h3"
                            sx={{
                                fontSize: {
                                    xs: '0.9em',
                                    sm: '1em',
                                    md: '1.1em',
                                },
                                p: '10px',
                            }}
                        >
                            {description}
                        </Typography>
                    </CardContent>
                </Box>
            </Card>
        </>
    )
}
SummaryProfile.propTypes = {
    title: PropTypes.string.isRequired, // You can adjust the PropTypes as needed
    description: PropTypes.string.isRequired,
}
