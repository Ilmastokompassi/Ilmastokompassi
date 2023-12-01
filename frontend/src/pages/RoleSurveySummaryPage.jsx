import useSWR from 'swr'
import { SummaryRole } from '../components/roleSurvey/SummaryRole'
import {
    Typography,
    Container,
    Stack,
    Button,
    Box,
    Card,
    CardContent,
} from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTitle } from '../hooks/useTitle'
import SummaryDoughnut from '../components/roleSurvey/SummaryDoughnut'

export const RoleSurveySummaryPage = () => {
    const { userId: userParamId } = useParams()
    const userId = parseInt(userParamId)
    const groupToken = localStorage.getItem('groupToken')

    // Fetch all roles from api
    const { data: roleData, isLoading: isLoadingRoles } = useSWR('/api/roles')

    // Fetch individual summary from api.
    const { data: summaryData, isLoading: isLoadingSummary } = useSWR(
        `/api/summary/${userId}`
    )
    // Fetch group summary every 15 seconds.
    const { data: allRolesData, isLoading: isLoadingAllRolesData } = useSWR(
        `/api/group/${groupToken}/score`,
        { refreshInterval: 15000 }
    )

    /* Turn the result key-value pairs into an array of objects with respective climate role details
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

    // These honestly should be part of the role data in the database, but that would
    // require a new column in the table and that feels like overkill at this point
    const roleColor = (role) => {
        switch(role) {
            case 'Ilmastoasiantuntija': return'#E9E775'
            case 'Mielipidevaikuttaja': return '#50B8DC'
            case 'Kestävän elämäntavan etsijä': return '#DF8715'
            case 'Eettinen kuluttaja': return '#4CD865'
            default: return '#FFFFFF'
        }
    }

    // Create pie chart data and fetch
    const doughnutChartData = roleResults?.map((result) => ({
        id: result.id,
        value: result.score,
        label: result.name,
        color: roleColor(result.name),
    }))

    const groupRoleData = groupRoleResults?.map((result) => ({
        id: result.id,
        value: result.score,
        label: result.name,
        color: roleColor(result.name),
    }))

    const answerCount = summaryData?.count
    const totalQuestions = summaryData?.total_questions_count

    useTitle('Ilmastorooli - Tulokset')
    return (
        <Container component={Box} paddingY={4}>
            <Card>
                <CardContent>
                    <Stack
                        spacing={2}
                        paddingX={2}
                        paddingY={4}
                        alignItems="center"
                    >
                        <Typography variant="h4">Ilmastoroolisi</Typography>
                        {isLoadingRoles ||
                        isLoadingSummary ||
                        isLoadingAllRolesData ? (
                            <p>Loading...</p>
                        ) : filteredSummaryScores.length === 0 ? (
                            <>
                                <Typography variant="h5">
                                    Ei tarpeeksi dataa tulosten näyttämiseen
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    href="/ilmastoroolikysely"
                                >
                                    Siirry tästä kyselyyn!
                                </Button>
                            </>
                        ) : answerCount > 0 ? (
                            <>
                                <Typography variant="h5">
                                    Olet vastannut {answerCount}/
                                    {totalQuestions} kysymykseen ja niiden
                                    perusteella sinun ilmastoroolisi
                                    {highestScoreRoles.length > 1 ? (
                                        <span> ovat</span>
                                    ) : (
                                        <span> on</span>
                                    )}
                                    ...
                                </Typography>
                                <Stack spacing={2}>
                                    {highestScoreRoles.map((role) => (
                                        <SummaryRole
                                            key={role.id}
                                            role={role}
                                        />
                                    ))}
                                </Stack>
                                <Typography variant="h5">
                                    Eri roolien välinen jakauma
                                </Typography>
                                <SummaryDoughnut data={doughnutChartData} />
                                {groupToken && (
                                    <>
                                        <Typography variant="h5">
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
                                    href="/ilmastoroolikysely"
                                >
                                    Siirry tästä kyselyyn!
                                </Button>
                            </>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    )
}
