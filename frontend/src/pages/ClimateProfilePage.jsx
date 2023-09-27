import { Typography, Container, Stack, Skeleton, Box } from '@mui/material'
import { useEffect } from 'react'
import { ClimateProfile } from '../components/ClimateProfile'
import { theme } from '../theme'

export const ClimateProfilePage = () => {
    useEffect(() => {
        document.title = 'Ilmastoprofiilit'
    }, [])

    const profileList = [
        {
            id: 1,
            title: 'Profiili 1',
            description:
                'Kuvaus on tässä ole hyvä, Kiva kuvaus profiilille. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis et voluptatibus cum quidem natus aut distinctio exercitationem aspernatur numquam cumque adipisci iste, consequuntur, maiores ipsum nesciunt accusantium! Libero, porro alias? Olet tälläinen profiili, jos olet profiili 1!',
        },
        {
            id: 2,
            title: 'Profiili 2',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis et voluptatibus cum quidem natus aut distinctio exercitationem aspernatur numquam cumque adipisci iste, consequuntur, maiores ipsum nesciunt accusantium! Libero, porro alias?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis et voluptatibus cum quidem natus aut distinctio exercitationem aspernatur numquam cumque adipisci iste, consequuntur, maiores ipsum nesciunt accusantium! Libero, porro alias?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis et voluptatibus cum quidem natus aut distinctio exercitationem aspernatur numquam cumque adipisci iste, consequuntur, maiores ipsum nesciunt accusantium! Libero, porro alias?',
        },
        {
            id: 3,
            title: 'Profiili 3',
            description:
                'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam quas eligendi eos itaque. Excepturi nihil delectus nesciunt nam, saepe nobis accusantium non blanditiis vero laudantium assumenda ducimus illum incidunt. Totam.',
        },
        {
            id: 4,
            title: 'Profiili 4',
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis voluptatibus eligendi modi officia explicabo. Eos deserunt assumenda, reprehenderit eius voluptatibus ducimus rerum non quam nostrum necessitatibus iure excepturi numquam! Quis.',
        },
    ]

    return (
        <Container>
            <Stack spacing={3}>
                <Typography variant="h1">Climatprofile</Typography>
                {profileList.map((profile) => (
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
                        <Skeleton variant="circular" width={250} height={250} />
                        <ClimateProfile
                            id={profile.id}
                            title={profile.title}
                            description={profile.description}
                        />
                    </Box>
                ))}
            </Stack>
        </Container>
    )
}
