import { useState, useEffect } from 'react'
import {
    Typography,
    Button,
    Stack,
    Box,
    Card,
    Container,
    CardContent,
} from '@mui/material'

import { useTitle } from '../hooks/useTitle'
import RoleAccordion from '../components/roleSurvey/RoleAccordion'
import RoleSurveyLogo from '../assets/roolilogo.png'
import GroupAccordion from '../components/roleSurvey/GroupAccordion'
import useSWR from 'swr'

export function RoleSurveyPage() {
    const { data: roles } = useSWR('/api/survey/roles')

    const [groupToken, setGroupToken] = useState(null)
    const [componentMounted, setComponentMounted] = useState(false)

    useEffect(() => {
        const refreshToken = () => {
            const newGroupToken = localStorage.getItem('groupToken')
            setGroupToken(newGroupToken)
        }

        refreshToken()
        window.addEventListener('setGroupToken', refreshToken)

        setComponentMounted(true)

        return () => window.removeEventListener('setGroupToken', refreshToken)
    }, [groupToken, componentMounted])

    useTitle('Ilmastoroolikysely')

    return (
        <Container>
            <Stack paddingY={6} spacing={3}>
                <Card elevation={5}>
                    <CardContent>
                        <Stack
                            spacing={4}
                            padding={{ xs: 1, md: 4 }}
                            alignItems="center"
                        >
                            <Typography
                                variant="h1"
                                sx={{ fontSize: ['1.5rem', '2.5rem', '3rem'] }}
                                align="center"
                            >
                                Ilmastoroolikysely
                            </Typography>
                            <Typography align="center">
                                Testaa, minkälainen ilmastoroolihahmo kuvastaa
                                juuri sinua!
                            </Typography>
                            <Box
                                component="img"
                                src={RoleSurveyLogo}
                                alt="ilmastoroolien hahmot"
                                sx={{ width: ['70%', '60%', '50%'] }}
                                borderRadius={2}
                                boxShadow={5}
                            />

                            <Box>
                                <Typography align="center">
                                    Koeta vastata mahdollisimman rehellisesti ja
                                    omana itsenäsi. Näin saat parhaan kuvauksen
                                    juuri sinulle sopivasta hahmosta. Pääset
                                    kyselyyn painamalla &quot;Aloita&quot;
                                    painiketta. Kun olet vastannut kysymyksiin,
                                    saat selville, mikä ilmastoroolihahmo
                                    kuvastaa sinua parhaiten.
                                </Typography>
                            </Box>
                            <GroupAccordion />
                            <Button
                                size="large"
                                data-testid="start-survey"
                                variant="contained"
                                href="/kysymys/1"
                                color="secondary"
                            >
                                <Typography
                                    paddingY={2}
                                    paddingX={4}
                                    variant="h2"
                                    component="div"
                                    letterSpacing={2}
                                >
                                    ALOITA
                                </Typography>
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
                <Box>
                    {roles?.map((role) => (
                        <RoleAccordion key={role.id} role={role} />
                    ))}
                </Box>
            </Stack>
        </Container>
    )
}
