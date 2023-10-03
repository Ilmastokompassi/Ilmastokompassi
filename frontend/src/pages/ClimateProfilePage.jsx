import { Typography, Container, Stack, Skeleton, Box } from '@mui/material'
import { useEffect } from 'react'
import { ClimateProfile } from '../components/ClimateProfile'
import { theme } from '../theme'
import useSWR from 'swr'

export const ClimateProfilePage = () => {
    useEffect(() => {
        document.title = 'Ilmastoprofiilit'
    }, [])

    const { data } = useSWR('/api/profiles')
    const profileList = data

    return (
        <Container>
            <Stack spacing={3} paddingBottom={'50px'}>
                <Typography
                    variant="h1"
                    fontSize={'4em'}
                    align="center"
                    paddingTop={'40px'}
                >
                    Ilmastoprofiilit
                </Typography>
                {profileList &&
                    profileList.map((profile) => (
                        <Box
                            key={profile.id}
                            sx={{
                                display: { xs: 'flex', md: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                [theme.breakpoints.up('md')]: {
                                    justifyContent: 'space-between',
                                    alignItems: 'stretch',
                                    flexDirection: 'row',
                                    ...(profile.id % 2 === 0 && {
                                        flexDirection: 'row-reverse',
                                    }),
                                },
                                paddingBottom: '40px',
                            }}
                        >
                            <Box paddingBottom={'20px'} padding={'10px'}>
                                <Skeleton
                                    variant="rectangular"
                                    width={250}
                                    height={250}
                                />
                            </Box>
                            <Box padding={'10px'}>
                                <ClimateProfile
                                    description={profile.description}
                                    name={profile.name}
                                />
                            </Box>
                        </Box>
                    ))}
            </Stack>
        </Container>
    )
}
