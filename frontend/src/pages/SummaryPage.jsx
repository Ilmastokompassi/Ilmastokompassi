import useSWR from 'swr'
import { SummaryProfile } from '../components/SummaryProfile'
import { Typography, Container, Stack, Button, Box, Card } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import SummaryDoughnut from '../components/SummaryDoughnut'

export const SummaryPage = () => {
    const { userId: userParamId } = useParams()
    const userId = parseInt(userParamId)

    // Fetch all profiles from api
    const { data: profileData, isLoading: isLoadingProfiles } =
        useSWR('/api/profiles')

    // Fetch result summary from api
    const { data: summaryData, isLoading: isLoadingSummary } = useSWR(
        `/api/summary/${userId}`
    )

    let totalScore = 0
    Object.entries(summaryData?.summary || {}).forEach(([_, value]) => {
        totalScore += value
    })

    /* Turn the result key-value pairs into an array of objects with respective profile details
       e.g. { 1: 50, 2: 50, ..} => 
        [
            { id: 1, score: 25%, name: .., description: ..}, 
            { id: 2, score: 25%, name: .., description: ..}, 
            ..
        ]
    */
    const profileResults = Object.entries(summaryData?.summary || {}).map(
        (result) => ({
            score: (result[1] / totalScore) * 100,
            // Include matching climate profile id, name and desc
            ...profileData?.find(
                (profile) => profile.id == parseInt(result[0])
            ),
        })
    )

    // Get the top profile result
    const topProfileResult = profileResults?.reduce(
        (max, result) => (max.score > result.score ? max : result),
        {}
    )

    // Create pie chart data and fetch
    const doughnutChartData = profileResults?.map((result) => ({
        id: result.id,
        value: result.score,
        label: result.name,
    }))

    const answerCount = summaryData?.count
    const totalQuestions = summaryData?.total_questions_count

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
                                    Olet vastannut {answerCount}/
                                    {totalQuestions} kysymykseen ja alta löydät
                                    oman ilmastoprofiilisi!
                                </Typography>

                        <SummaryProfile
                            title={topProfileResult.name}
                            description={topProfileResult.description}
                        />
                        <Box width={{ xs: '100vw', sm: '100vw', md: '30vw' }}>
                            <SummaryDoughnut data={doughnutChartData} />
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
                  </Card>
              </Box>
          </Container>
      )
  }
