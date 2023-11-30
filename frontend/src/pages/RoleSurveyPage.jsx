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
import JoinGroupForm from '../components/JoinGroupForm'
import RoleAccordion from '../components/roleSurvey/RoleAccordion'
import CreateGroupDialog from '../components/CreateGroupDialog'
import useSWR from 'swr'

export function RoleSurveyPage() {
    const { data: roles } = useSWR('/api/roles')

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
            <Stack paddingY={4} spacing={2}>
                <Card>
                    <CardContent>
                        <Stack spacing={2} paddingY={2}>
                            <Box>
                                <Typography variant="h4">
                                    Ilmastoroolikysely
                                </Typography>
                                <Typography>
                                    Kyselyn kysymykset liittyvät
                                    ilmastonmuutokseen liittyviin asenteisiisi.
                                    Voit vastata kyselyyn painamalla
                                    &quot;Aloita&quot; painiketta. Kun olet
                                    vastannut kyselyyn saat selville, mikä
                                    neljästä ilmastoroolista kuvastaa sinua.
                                    Voit tutustua ilmastorooleihin sivuston
                                    alalaidasta.
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="h6">
                                    Vastaaminen ryhmässä
                                </Typography>
                                <Typography>
                                    Voitte vertailla kyselystä saatuja tuloksia,
                                    jos teette kyselyn ryhmänä.
                                    Ryhmäsi tulokset tulevat näkyviin, kun viisi
                                    ryhmän jäsentä ovat vastanneet kyselyyn.
                                    Ryhmään liittyviä toiminnallisuuksia, kuten
                                    tuloksia, pääset tarkastelemaan oikean
                                    yläkulman painikkeesta.
                                </Typography>
                            </Box>
                            <Stack alignItems="center" spacing={2}>
                                <JoinGroupForm />
                                <CreateGroupDialog />
                                <Button
                                    sx={{
                                        width: 200,
                                        height: 60,
                                    }}
                                    data-testid="start-survey"
                                    variant="contained"
                                    href="/kysymys/1"
                                    color="secondary"
                                >
                                    <Typography variant="h5" letterSpacing={2}>
                                        Aloita
                                    </Typography>
                                </Button>
                            </Stack>
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
