import {
    Typography,
    Button,
    Stack,
    Box,
    Card,
    Container,
    CardContent,
} from '@mui/material'

import { useState, useEffect } from 'react'
import { useTitle } from '../hooks/useTitle'
import JoinGroup from '../components/JoinGroup'
import RolesAccordion from '../components/RolesAccordion'
import CreateGroupDialog from '../components/CreateGroupDialog'

export function SurveyPage() {
    const [groupToken, setGroupToken] = useState(null)

    useEffect(() => {
        const refreshToken = () => {
            setGroupToken(localStorage.getItem('groupToken'))
        }

        refreshToken()
        window.addEventListener('setGroupToken', refreshToken)
        return () => {
            window.removeEventListener('setGroupToken', refreshToken)
        }
    }, [])

    useTitle('Ilmastoroolikysely')

    return (
        <Container>
            <Box paddingY={5}>
                <Card>
                    <CardContent>
                        <Box marginLeft={1} paddingY={2}>
                            <Typography variant="h4">
                                Ilmastoroolikysely
                            </Typography>
                            <Typography marginBottom={3}>
                                Kyselyn kysymykset liittyvät ilmastonmuutokseen
                                liittyviin asenteisiisi. Voit vastata kyselyyn
                                painamalla &quot;Aloita&quot; painiketta. Kun
                                olet vastannut kyselyyn saat selville, mikä
                                neljästä ilmastoroolista kuvastaa sinua. Voit
                                tutustua ilmastorooleihin sivuston alalaidasta.
                            </Typography>
                            <Typography variant="h6">
                                Vastaaminen ryhmässä
                            </Typography>
                            <Typography marginBottom={2}>
                                Voitte vertailla kyselyistä saatuja tuloksia jos
                                teette sivuston kyselyjä ryhmänä. Ryhmäsi
                                tulokset tulevat näkyviin, kun viisi ryhmän
                                jäsentä ovat vastanneet kyselyyn. Ryhmään
                                liittyviä toiminnallisuuksia, kuten tuloksia,
                                pääset tarkastelemaan oikean yläkulman
                                painikkeesta.
                            </Typography>
                            <Stack alignItems="center" spacing={2}>
                                {!groupToken && (
                                    <>
                                        <JoinGroup />
                                        <CreateGroupDialog />
                                    </>
                                )}
                                <Button
                                    style={{
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
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <RolesAccordion />
        </Container>
    )
}
