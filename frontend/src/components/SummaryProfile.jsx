import { Typography, Box, CardContent, CardHeader, Stack } from '@mui/material'
import PropTypes from 'prop-types'
import ProfileImage from './ProfileImage'
import { theme } from '../theme'

export const SummaryProfile = ({ index, title, description }) => {
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
                    <ProfileImage title={title} />
                </Stack>
                <Stack>
                    <CardHeader
                        sx={{ textAlign: 'left' }}
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
                </Stack>
            </Box>
        </>
    )
}
SummaryProfile.propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired, // You can adjust the PropTypes as needed
    description: PropTypes.string.isRequired,
}
