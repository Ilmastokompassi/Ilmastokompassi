import useSWR from 'swr'
import { SummaryRole } from '../components/SummaryRole'
import { Typography, Container, Stack, Button, Box, Card } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import SummaryDoughnut from '../components/SummaryDoughnut'

export const SummaryPage = () => {
    const { userId: userParamId } = useParams()
    const userId = parseInt(userParamId)
    const groupToken = localStorage.getItem('groupToken')

    // Fetch all roles from api
    const { data: roleData, isLoading: isLoadingRoles } = useSWR('/api/roles')
    // Fetch result summary from api. Refreshes group stats every 15 seconds
    const { data: summaryData, isLoading: isLoadingSummary } = useSWR(
        `/api/summary/${userId}`
    )
    const { data: allRolesData, isLoading: isLoadingAllRolesData } = useSWR(
        `/api/group/${groupToken}/score`,
        { refreshInterval: 15000 }
    )

    /* Turn the result key-value pairs into an array of objects with respective role  details
       e.g. { "1": 50, "2": 50, ..} => 
        [
            { id: 1, score: 25%, name: .., description: ..}, 
            { id: 2, score: 25%, name: .., description: ..}, 
            ..
        ]
    */

    const createRoleResultsFromScores = (scores, roles) => {
        const totalScore = scores.reduce((acc, score) => acc + score[1], 0)

        return scores.map((score) => ({
            score: (score[1] / totalScore) * 100,
            // Include matching climate role id, name and desc
            ...roles?.find((role) => role.id == parseInt(score[0])),
        }))
    }

    // {"1": 50, "2": 50} => [["1", 50], ["2", 50]]
    const summaryScores = Object.entries(summaryData?.summary || {})

    const roleResults = createRoleResultsFromScores(summaryScores, roleData)

    // Get the top role result(s)
    const maxScore = roleResults.reduce(
        (max, result) => (max.score > result.score ? max : result),
        {}
    ).score

    const highestScoreRoles = roleResults.filter(
        (result) => result.score === maxScore
    )

    const groupSummaryScores = Object.entries(allRolesData?.score || {})

    const groupRoleResults = createRoleResultsFromScores(
        groupSummaryScores,
        roleData
    )

    // Create pie chart data and fetch
    const doughnutChartData = roleResults?.map((result) => ({
        id: result.id,
        value: result.score,
        label: result.name,
    }))

    const groupRoleData = groupRoleResults?.map((result) => ({
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
                        {isLoadingRoles ||
                        isLoadingSummary ||
                        isLoadingAllRolesData ? (
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
                                {highestScoreRoles.length > 1 && (
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
                                        Sinulla on useita profiileja, jotka
                                        kuvastavat sinua!
                                    </Typography>
                                )}
                                {highestScoreRoles.map((role, index) => (
                                    <SummaryRole
                                        key={role.id}
                                        index={index}
                                        title={role.name}
                                        description={role.description}
                                    />
                                ))}
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
                                    Eri profiilien välinen jakauma
                                </Typography>
                                <Box
                                    width={{
                                        xs: '60vw',
                                        sm: '50vw',
                                        md: '40vw',
                                    }}
                                >
                                    <SummaryDoughnut data={doughnutChartData} />
                                </Box>

                                {groupToken !== null && (
                                    <>
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
                                            Ryhmäsi {groupToken} jakauma
                                        </Typography>

                                        {allRolesData.response_amount < 5 ? (
                                            <Typography variant="body1">
                                                Näet tässä ryhmäsi tulokset, kun
                                                vähintään viisi henkilöä ovat
                                                vastanneet kyselyyn.
                                            </Typography>
                                        ) : (
                                            <>
                                                <Box
                                                    width={{
                                                        xs: '60vw',
                                                        sm: '50vw',
                                                        md: '40vw',
                                                    }}
                                                >
                                                    <SummaryDoughnut
                                                        data={groupRoleData}
                                                    />
                                                </Box>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <Typography>
                                    Et ole vielä vastannut kyselyyn
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    aria-label="move to survey"
                                    href={`/kyselyt`}
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
