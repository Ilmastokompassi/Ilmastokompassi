import useSWR from 'swr'
import { SummaryProfile } from '../components/SummaryProfile'
import { Typography, Container, Stack, Button } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import SummaryPie from '../components/SummaryPie'

export const SummaryPage = () => {
    const { userId: userParamId } = useParams()
    const userId = parseInt(userParamId)

    const { data: data } = useSWR(`/api/summary/${userId}`)
    const answerCount = data?.count
    const totalQuestions = data?.total_questions_count
    const summary = data?.summary

    // Create list and push profiles with calculated scores
    let summaryList = []
    for (let profile in summary) {
        summaryList.push([profile, summary[profile]])
    }

    // Sort the list according to scores and remove everything except profile id
    summaryList.sort((a, b) => b[1] - a[1])
    const piedata = [...summaryList]
    summaryList = summaryList.map((x) => parseInt(x[0]))
    console.log('Summary List:', summaryList)

    // Sort profile list for pie chart
    console.log('Original Pie Data:', [...piedata])
    console.log('Pie Data:', piedata)

    // Fetch profiles from api
    const { data: profiledata } = useSWR('/api/profiles')
    const profileList = profiledata

    let pieChartData = []

    if (profileList) {
        const profileNameMapping = {}
        profileList.forEach((profile) => {
            profileNameMapping[profile.id] = profile.name
        })

        // Create pie chart data and fetch
        pieChartData = piedata.map((x) => ({
            id: x[0],
            value: x[1],
            label: profileNameMapping[x[0]],
        }))
        // Sort profiles according to summaryList index, so that the profile with
        // Greatest score is first in list and so on
        profileList.sort(
            (a, b) => summaryList.indexOf(a.id) - summaryList.indexOf(b.id)
        )
    }

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
                {!profileList ? ( // Render profile only after fetching from api
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
                            title={profileList[0].name}
                            description={profileList[0].description}
                        />
                        <SummaryPie data={pieChartData} />
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
