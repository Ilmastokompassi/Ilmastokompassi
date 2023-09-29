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
            <Stack spacing={3}>
                <Typography variant="h1">Climatprofile</Typography>
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
                            }}
                        >
                            <Skeleton
                                variant="circular"
                                width={250}
                                height={250}
                            />
                            <ClimateProfile
                                id={profile.id}
                                description={profile.description}
                                title={profile.title}
                            />
                        </Box>
                    ))}
            </Stack>
        </Container>
    )
}
