import useSWR from 'swr'
import { SummaryProfile } from '../components/SummaryProfile'
import { Typography, Container, Stack, Button, Box } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SummaryPie from '../components/SummaryPie'

export const SummaryPage = () => {

    const { userId: userParamId } = useParams()
    const userId = parseInt(userParamId)

    // Fetch all profiles from api
    const { data: profileData, isLoading: isLoadingProfiles } = useSWR('/api/profiles')

    // Fetch result summary from api
    const { data: summaryData, isLoading: isLoadingSummary } = useSWR(`/api/summary/${userId}`)

    const answerCount = summaryData?.count
    const totalQuestions = summaryData?.total_questions_count

    // Turn the result key-value pairs into an array of objects
    // e.g. {1: 50, 2: 50, ..} => [{id: 1, score: 50}, {id: 2, score: 50}, ..]
    const results = Object.entries(summaryData?.summary || {})
        .map((x) => ({
            id: parseInt(x[0]),
            score: x[1]
        }))

    // Get the top profile result
    const topResult = results?.reduce((max, result) => (max.score > result.score ? max : result), {})

    // Find the profile data for the top result
    const topProfile = profileData?.find(profile => profile.id == topResult.id)

    // Create pie chart data and fetch
    const pieChartData = results?.map((result) => ({
        id: result.id,
        value: result.score,
        label: profileData.find(profile => profile.id == result.id).name,
    }))

    useEffect(() => {
        document.title = 'Oma ilmastoprofiili'
    })
    return (
        <Container>
            <Stack spacing={3} paddingBottom={'50px'} alignItems={'center'}>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: {
                            xs: '2em', // Smaller font size for extra small screens
                            sm: '3em', // Slightly bigger for small screens
                            md: '4em', // Original size for medium screens and up
                        },
                        textAlign: 'center',
                        p: '20px',
                    }}
                >
                    Oma ilmastoprofiilisi
                </Typography>
                {isLoadingProfiles || isLoadingSummary ? (
                    <p>Loading...</p>
                ) : answerCount > 0 ? (
                    <>
                        <Typography
                            variant="h2"
                            sx={{
                                fontSize: {
                                    xs: '1.5em',
                                    sm: '1.75em',
                                    md: '2em',
                                },
                                textAlign: 'center',
                                p: '10px',
                            }}
                        >
                            Olet vastannut {answerCount}/{totalQuestions}{' '}
                            kysymykseen ja alta löydät oman ilmastoprofiilisi!
                        </Typography>

                        <SummaryProfile
                            title={topProfile.name}
                            description={topProfile.description}
                        />
                        <Box width={{ xs: '100vw', sm: '100vw', md: '30vw' }}>
                            <SummaryPie data={pieChartData} />
                        </Box>
                    </>
                ) : (
                    <>
                        <Typography>Et ole vielä vastannut kyselyyn</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            aria-label="move to survey"
                            href={`/survey`}
                        >
                            Siirry tästä kyselyyn!
                        </Button>
                    </>
                )}
            </Stack>
        </Container>
    )
}
