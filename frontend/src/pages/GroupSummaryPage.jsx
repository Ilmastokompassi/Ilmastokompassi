import useSWR from 'swr'
import { Typography, Container, Stack, Box, Card } from '@mui/material'
import { useTitle } from '../hooks/useTitle'
import { SummaryRole } from '../components/SummaryRole'
import SummaryDoughnut from '../components/SummaryDoughnut'

export const GroupSummaryPage = () => {
    // Fetch group token from url
    const groupToken = window.location.pathname.split('/').pop()

    // Fetch all roles from api
    const { data: roleData, isLoading: isLoadingroles } = useSWR('/api/roles')

    const { data: allrolesData, isLoading: isLoadingAllrolesData } = useSWR(
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

    const groupSummaryScores = Object.entries(allrolesData?.score || {})

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

    useTitle('Ilmastoprofiili - Tulokset')
    return (
        <Container>
            <Box paddingY={5}>
                <Card>
                    <Stack
                        spacing={4}
                        paddingTop={'30px'}
                        paddingBottom={'50px'}
                        padding={'20px'}
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
                        {isLoadingroles || isLoadingAllrolesData ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                {allrolesData.response_amount < 5 ? (
                                    <Typography variant="body1">
                                        Näet tässä ryhmän {groupToken} tulokset,
                                        kun vähintään viisi henkilöä on
                                        vastannut kyselyyn. Nyt kyselyyn on
                                        vastannut {allrolesData.response_amount}{' '}
                                        henkilöä.
                                    </Typography>
                                ) : (
                                    <>
                                        {highestScoreroles.length > 1 && (
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
                                        {highestScoreroles.map(
                                            (role, index) => (
                                                <SummaryRole
                                                    key={role.id}
                                                    index={index}
                                                    title={role.name}
                                                    description={
                                                        role.description
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
                                            {allrolesData.response_amount}{' '}
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
                                                data={groupRoleData}
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
