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
import JoinGroup from '../components/JoinGroup'
import { useState, useEffect } from 'react'

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
                <Stack
                    spacing={4}
                    paddingTop={'30px'}
                    paddingBottom={'50px'}
                    padding={'20px'}
                    alignItems={'center'}
                >
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h1"
                                margin={3}
                                sx={{
                                    fontSize: {
                                        xs: '2em', // Smaller font size for extra small screens
                                        sm: '3em', // Slightly bigger for small screens
                                    },
                                    textAlign: 'center',
                                }}
                            >
                                Ilmastoroolikysely
                            </Typography>
                            <Typography marginBottom={3} variant="body1">
                                Kyselyn kysymykset liittyvät ilmastonmuutokseen
                                liittyviin asenteisiisi. Voit vastata kyselyyn
                                painamalla &quot;Aloita&quot; painiketta. Kun
                                olet vastannut kyselyyn saat selville, mikä
                                neljästä ilmastoroolista kuvastaa sinua.
                            </Typography>
                            <Typography marginBottom={2} variant="h6">
                                Vastaaminen ryhmässä
                            </Typography>
                            <Typography marginBottom={2} variant="body1">
                                Voitte vertailla kyselyistä saatuja tuloksia jos
                                teette sivuston kyselyjä ryhmänä. Ryhmäsi
                                tulokset tulevat näkyviin, kun viisi ryhmän
                                jäsentä ovat vastanneet kyselyyn. Ryhmään
                                liittyviä toiminnallisuuksia, kuten tuloksia,
                                pääset tarkastelemaan oikean yläkulman
                                painikkeesta.
                            </Typography>
                            {!groupToken && <JoinGroup />}
                            <Stack
                                alignItems={'center'}
                                paddingTop={7}
                                paddingBottom={4}
                            >
                                <Button
                                    style={{
                                        width: 200,
                                        height: 100,
                                        fontSize: '20px',
                                    }}
                                    id="btn-survey-alone"
                                    data-testid="btn-start-survey"
                                    variant="contained"
                                    href="/kysymys/1"
                                    color="secondary"
                                >
                                    Aloita
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography>
                                Tällä hetkellä pääset katsomaan ilmastorooleja
                                yläpalkista. Jatkossa ne löytyvät täältä.
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </Container>
    )
}
