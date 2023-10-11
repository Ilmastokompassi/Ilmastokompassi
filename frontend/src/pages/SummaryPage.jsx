import useSWR from 'swr'

import {
    Typography,
    Container,
    Stack,
    Skeleton,
    Box,
    Card,
    CardContent,
    CardHeader,
    Button,
} from '@mui/material'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const SummaryPage = () => {
    const { userId: userParamId } = useParams()

    const userId = parseInt(userParamId)

    const { data: data } = useSWR(`/api/summary/${userId}`)

    const answerCount = data?.count
    const totalQuestions = data?.total_questions_count

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

                {answerCount > 0 ? (
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

                        <Box
                            sx={{
                                display: { xs: 'flex', md: 'flex' },
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: '40px',
                            }}
                        >
                            <Box paddingBottom={'20px'} padding={'10px'}>
                                <Skeleton
                                    variant="rectangular"
                                    width={250}
                                    height={250}
                                />
                            </Box>
                        </Box>
                        <Card variant="outlined" sx={{ width: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflowWrap: 'break-word',
                                }}
                            >
                                <CardHeader
                                    sx={{ textAlign: 'center' }}
                                    titleTypographyProps={{
                                        variant: 'h2',
                                        fontSize: {
                                            xs: '1.5em',
                                            sm: '1.75em',
                                            md: '2em',
                                        },
                                    }}
                                    title="Ilmastoasiantuntija"
                                ></CardHeader>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontSize: {
                                                xs: '0.9em',
                                                sm: '1em',
                                                md: '1.1em',
                                            },
                                            p: '10px',
                                        }}
                                    >
                                        Sinussa on potentiaalia
                                        ilmastoasiantuntijaksi.
                                        Ilmastoasiantuntijana olet kiinnostunut
                                        ilmastonmuutoksen tieteellisestä
                                        puolesta. Janoat saada tietää, kuinka
                                        ilmasto ja yhteiskunta toimivat yhdessä.
                                        Koet tieteeseen pohjautuvan
                                        päätöksenteon tärkeäksi ja näet uusien
                                        innovaatioiden välttämättömyyden
                                        matkallamme kohti planetaarisia rajoja
                                        kunnioittavaa elämää.
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
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
