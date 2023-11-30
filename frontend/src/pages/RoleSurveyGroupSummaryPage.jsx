import useSWR from 'swr'
import {
    Typography,
    Container,
    Stack,
    Box,
    Card,
    CardContent,
} from '@mui/material'
import { useTitle } from '../hooks/useTitle'
import { SummaryRole } from '../components/roleSurvey/SummaryRole'
import SummaryDoughnut from '../components/roleSurvey/SummaryDoughnut'
import { useEffect } from 'react'

export const RoleSurveyGroupSummaryPage = () => {
    const groupToken = window.location.pathname.split('/').pop()
    useEffect(() => {
        fetch(`/api/group/${groupToken}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.group_token) {
                    window.location.href = '/ilmastoroolikysely'
                }
            })
    }, [groupToken])

    // Fetch all roles from api
    const { data: roleData, isLoading: isLoadingroles } = useSWR('/api/roles')

    const { data: allRolesData, isLoading: isLoadingAllrolesData } = useSWR(
        `/api/group/${groupToken}/score`,
        { refreshInterval: 15000 }
    )

    /* Turn the result key-value pairs into an array of objects with respective role details
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

    const groupSummaryScores = Object.entries(allRolesData?.score || {})

    const groupRoleResults = createRoleResultsFromScores(
        groupSummaryScores,
        roleData
    )

    const groupRoleData = groupRoleResults?.map((result) => ({
        id: result.id,
        value: result.score,
        label: result.name,
    }))

    const maxScore = groupRoleResults.reduce(
        (max, result) => (max.score > result.score ? max : result),
        {}
    ).score

    const highestScoreroles = groupRoleResults.filter(
        (result) => result.score === maxScore
    )

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
                        <Typography variant="h4">
                            Ryhmän {groupToken} ilmastorooli
                        </Typography>
                        {isLoadingroles || isLoadingAllrolesData ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {allRolesData.response_amount < 5 ? (
                                    <Typography>
                                        Näet tässä ryhmän {groupToken} tulokset,
                                        kun vähintään viisi henkilöä on
                                        vastannut kyselyyn. Nyt kyselyyn on
                                        vastannut {allRolesData.response_amount}{' '}
                                        henkilöä.
                                    </Typography>
                                ) : (
                                    <>
                                        {highestScoreroles.length > 1 && (
                                            <Typography variant="h5">
                                                Teillä on useita rooleja, jotka
                                                kuvastavat ryhmäänne!
                                            </Typography>
                                        )}
                                        {highestScoreroles.map((role) => (
                                            <SummaryRole
                                                key={role.id}
                                                role={role}
                                            />
                                        ))}

                                        <Typography variant="h5">
                                            Ryhmän {groupToken} jakauma.
                                            Kyselyyn on vastannut{' '}
                                            {allRolesData.response_amount}{' '}
                                            henkilöä.
                                        </Typography>
                                        <SummaryDoughnut data={groupRoleData} />
                                    </>
                                )}
                            </>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Container>
    )
}
