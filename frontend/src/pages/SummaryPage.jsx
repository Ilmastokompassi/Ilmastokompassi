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
    // Filter out zero scores
    const filteredSummaryScores = summaryScores.filter((score) => score[1] > 0)

    const roleResults = createRoleResultsFromScores(
        filteredSummaryScores,
        roleData
    )

    // Get the top role result(s)
    const maxScore = roleResults.reduce(
        (max, result) => (max.score > result.score ? max : result),
        {}
    ).score

    const highestScoreRoles = roleResults.filter(
        (result) => result.score === maxScore
    )

    const groupSummaryScores = Object.entries(allRolesData?.score || {})
    // Filter out zero scores
    const filteredGroupSummaryScores = groupSummaryScores.filter(
        (score) => score[1] > 0
    )

    const groupRoleResults = createRoleResultsFromScores(
        filteredGroupSummaryScores,
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

    useTitle('Ilmastorooli - Tulokset')
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
                                textAlign: 'center',
                                p: '20px',
                            }}
                        >
                            Ilmastoroolisi
                        </Typography>
                        {isLoadingRoles ||
                        isLoadingSummary ||
                        isLoadingAllRolesData ? (
                            <p>Loading...</p>
                        ) : filteredSummaryScores.length === 0 ? (
                            <>
                                <Typography variant="h3">
                                    Ei tarpeeksi dataa tulosten näyttämiseen
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    aria-label="move to survey"
                                    href={`/ilmastoroolikysely`}
                                >
                                    Siirry tästä kyselyyn!
                                </Button>
                            </>
                        ) : answerCount > 0 ? (
                            <>
                                <Typography variant="h2" textAlign={'center'}>
                                    Olet vastannut {answerCount}/
                                    {totalQuestions} kysymykseen ja niiden
                                    perusteella sinun ilmastoroolisi on...
                                </Typography>
                                {highestScoreRoles.length > 1 && (
                                    <Typography variant="h3">
                                        Sinulla on useita rooleja, jotka
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
                                <Typography variant="h2">
                                    Eri roolien välinen jakauma
                                </Typography>
                                <SummaryDoughnut data={doughnutChartData} />
                                {groupToken !== null && (
                                    <>
                                        <Typography variant="h3">
                                            Ryhmän {groupToken} jakauma.
                                            Kyselyyn on vastannut{' '}
                                            {allRolesData.response_amount}{' '}
                                            henkilöä.
                                        </Typography>

                                        {allRolesData.response_amount < 5 ? (
                                            <Typography variant="body1">
                                                Näet tässä ryhmäsi tulokset, kun
                                                vähintään viisi henkilöä ovat
                                                vastanneet kyselyyn. Nyt
                                                kyselyyn on vastannut{' '}
                                                {allRolesData.response_amount}{' '}
                                                henkilöä.
                                            </Typography>
                                        ) : (
                                            <SummaryDoughnut
                                                data={groupRoleData}
                                            />
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
                                    href={`/ilmastoroolikysely`}
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
