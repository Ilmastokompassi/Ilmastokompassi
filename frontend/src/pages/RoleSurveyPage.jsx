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
            <Stack paddingY={6} spacing={3}>
                <Card>
                    <CardContent>
                        <Stack spacing={4} padding={{ xs: 1 , md: 4 }} alignItems='center' >
                                <Typography variant="h3" align='center' >
                                    Ilmastoroolikysely
                                </Typography>
                            <Box>
                                <Typography align='center'>
                                    Testaa, minkälainen ilmastoroolihahmo
                                    kuvastaa juuri sinua. Koeta vastata
                                    mahdollisimman rehellisesti ja omana
                                    itsenäsi. Näin saat parhaan kuvauksen juuri
                                    sinulle sopivasta hahmosta. Pääset kyselyyn
                                    painamalla &quot;Aloita&quot; painiketta.
                                    Kun olet vastannut kysymyksiin, saat
                                    selville, mikä ilmastoroolihahmo kuvastaa
                                    sinua parhaiten. Voit tutustua hahmoihin
                                    lyhyesti alta.
                                </Typography>
                            </Box>
                                <Typography variant="h4" align='center'>
                                    Vastaaminen ryhmässä
                                </Typography>
                            <Box>
                                <Typography align='center'>
                                    Ilmastoroolikyselyn voi tehdä myös ryhmässä.
                                    Jokainen vastaaja saa oman roolin ja näkee
                                    anonyymin yhteenvedon ryhmässä esiintyneistä
                                    rooleista. Ryhmän tulokset tulevat näkyviin,
                                    kun vähintään viisi ryhmän jäsentä ovat
                                    vastanneet kyselyyn. Ryhmän yhteisiä
                                    tuloksia pääset tarkastelemaan myös sivuston
                                    oikean yläkulman painikkeesta. Mikäli teillä
                                    ei ole vielä valmiiksi luotua ryhmää, voit
                                    tehdä sen painamalla &quot;Luo ryhmä&quot;
                                    painiketta.
                                </Typography>
                            </Box>
                            <Stack alignItems="center" spacing={2} padding={3}>
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
