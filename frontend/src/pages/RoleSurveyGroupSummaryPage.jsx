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
        fetch(`/api/groups/${groupToken}`, {
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
    const { data: roleData, isLoading: isLoadingroles } =
        useSWR('/api/survey/roles')

    const { data: allRolesData, isLoading: isLoadingAllrolesData } = useSWR(
        `/api/groups/${groupToken}/score`,
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

    // These honestly should be part of the role data in the database, but that would
    // require a new column in the table and that feels like overkill at this point
    // They can also be found both here and in the individual summary page file
    const roleColor = {
        1: '#F2DC79',
        2: '#94CAEC',
        3: '#E58E67',
        4: '#6DB146',
    }

    const groupRoleData = groupRoleResults?.map((result) => ({
        id: result.id,
        value: result.score,
        label: result.name,
        color: roleColor[result.id],
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
        <Container component={Box} paddingY={6}>
            <Card>
                <CardContent>
                    <Stack
                        spacing={2}
                        paddingX={2}
                        paddingY={4}
                        alignItems="center"
                    >
                        <Typography variant="h1">
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
                                        {allRolesData.response_amount === 1 ? (
                                            <span>henkilö.</span>
                                        ) : (
                                            <span>henkilöä.</span>
                                        )}
                                    </Typography>
                                ) : (
                                    <>
                                        {highestScoreroles.length > 1 && (
                                            <Typography variant="h2">
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

                                        <Typography variant="h2">
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
