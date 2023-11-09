import useSWR from 'swr'
import { Typography, Container, Stack, Box, Card } from '@mui/material'
import { useTitle } from '../hooks/useTitle'
import { SummaryProfile } from '../components/SummaryProfile'
import SummaryDoughnut from '../components/SummaryDoughnut'

export const GroupSummaryPage = () => {
    // Fetch group token from url
    const groupToken = window.location.pathname.split('/').pop()

    // Fetch all profiles from api
    const { data: profileData, isLoading: isLoadingProfiles } =
        useSWR('/api/profiles')

    const { data: allProfilesData, isLoading: isLoadingAllProfilesData } =
        useSWR(`/api/group/${groupToken}/score`, { refreshInterval: 15000 })

    /* Turn the result key-value pairs into an array of objects with respective profile details
       e.g. { "1": 50, "2": 50, ..} => 
        [
            { id: 1, score: 25%, name: .., description: ..}, 
            { id: 2, score: 25%, name: .., description: ..}, 
            ..
        ]
    */

    const createProfileResultsFromScores = (scores, profiles) => {
        const totalScore = scores.reduce((acc, score) => acc + score[1], 0)

        return scores.map((score) => ({
            score: (score[1] / totalScore) * 100,
            // Include matching climate profile id, name and desc
            ...profiles?.find((profile) => profile.id == parseInt(score[0])),
        }))
    }

    const groupSummaryScores = Object.entries(allProfilesData?.score || {})

    const groupProfileResults = createProfileResultsFromScores(
        groupSummaryScores,
        profileData
    )

    const groupProfileData = groupProfileResults?.map((result) => ({
        id: result.id,
        value: result.score,
        label: result.name,
    }))

    const maxScore = groupProfileResults.reduce(
        (max, result) => (max.score > result.score ? max : result),
        {}
    ).score

    const highestScoreProfiles = groupProfileResults.filter(
        (result) => result.score === maxScore
    )

    useTitle('Ilmastoprofiili - Tulokset')
    return (
        <Container>
            <Box paddingY={5}>
                <Card>
                    <Stack
                        spacing={4}
                        paddingTop={'30px'}
                        paddingBottom={'50px'}
                        alignItems={'center'}
                    >
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
                            Ryhmän ilmastoprofiili
                        </Typography>
                        {isLoadingProfiles || isLoadingAllProfilesData ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {allProfilesData.response_amount < 5 ? (
                                    <Typography variant="body1">
                                        Näet tässä ryhmän {groupToken} tulokset,
                                        kun vähintään viisi henkilöä on
                                        vastannut kyselyyn. Nyt kyselyyn on
                                        vastannut{' '}
                                        {allProfilesData.response_amount}{' '}
                                        henkilöä.
                                    </Typography>
                                ) : (
                                    <>
                                        {highestScoreProfiles.length > 1 && (
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    fontSize: {
                                                        xs: '1em',
                                                        sm: '1.25em',
                                                        md: '1.5em',
                                                    },
                                                }}
                                            >
                                                Teillä on useita profiileja,
                                                jotka kuvastavat ryhmäänne!
                                            </Typography>
                                        )}
                                        {highestScoreProfiles.map(
                                            (profile, index) => (
                                                <SummaryProfile
                                                    key={profile.id}
                                                    index={index}
                                                    title={profile.name}
                                                    description={
                                                        profile.description
                                                    }
                                                />
                                            )
                                        )}

                                        <Typography
                                            variant="h2"
                                            sx={{
                                                fontSize: {
                                                    xs: '1em',
                                                    sm: '1.25em',
                                                    md: '1.5em',
                                                },
                                            }}
                                        >
                                            Ryhmän {groupToken} jakauma.
                                            Ryhmässä kyselyyn on vastannut{' '}
                                            {allProfilesData.response_amount}{' '}
                                            henkilöä.
                                        </Typography>
                                        <Box
                                            width={{
                                                xs: '60vw',
                                                sm: '50vw',
                                                md: '40vw',
                                            }}
                                        >
                                            <SummaryDoughnut
                                                data={groupProfileData}
                                            />
                                        </Box>
                                    </>
                                )}
                            </>
                        )}
                    </Stack>
                </Card>
            </Box>
        </Container>
    )
}
