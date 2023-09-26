import { Typography, Container, Stack } from '@mui/material'
import { useEffect } from 'react'
import { ClimateProfile } from '../components/ClimateProfile'

export const ClimateProfilePage = () => {
    useEffect(() => {
        document.title = 'Ilmastoprofiilit'
    }, [])

    const profileList = [
        { id: 1, title: 'Profiili 1', description: 'Kuvaus' },
        { id: 2, title: 'Profiili 2', description: 'Kuvaus' },
        { id: 3, title: 'Profiili 3', description: 'Kuvaus' },
        { id: 4, title: 'Profiili 4', description: 'Kuvaus' },
    ]

    return (
        <Container>
            <Stack spacing={3}>
                <Typography variant="h1">Climatechangeprofile</Typography>
                {profileList.map(
                    (profile) => (
                        console.log('profile', profile),
                        (
                            <ClimateProfile
                                key={profile.id}
                                title={profile.title}
                                description={profile.description}
                            />
                        )
                    )
                )}
            </Stack>
        </Container>
    )
}
