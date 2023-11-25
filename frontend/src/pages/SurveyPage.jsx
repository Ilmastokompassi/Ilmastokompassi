import { useState, useEffect } from 'react'
import {
    Typography,
    Button,
    Stack,
    Box,
    Card,
    Container,
    CardContent,
    Snackbar,
    useMediaQuery,
} from '@mui/material'

import { useTitle } from '../hooks/useTitle'
import JoinGroup from '../components/JoinGroup'
import { forwardRef } from 'react'
import MuiAlert from '@mui/material/Alert'
import RolesAccordion from '../components/RolesAccordion'
import CreateGroupDialog from '../components/CreateGroupDialog'

export function SurveyPage() {
    const [groupToken, setGroupToken] = useState(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [componentMounted, setComponentMounted] = useState(false)

    const isMobile = useMediaQuery('(max-width:600px)')

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert ref={ref} variant="filled" {...props} />
    })

    useEffect(() => {
        const refreshToken = () => {
            const newGroupToken = localStorage.getItem('groupToken')
            if (componentMounted && newGroupToken && !groupToken) {
                setSnackbarOpen(true)
            }
            setGroupToken(newGroupToken)
        }

        refreshToken()
        window.addEventListener('setGroupToken', refreshToken)

        setComponentMounted(true)

        return () => {
            window.removeEventListener('setGroupToken', refreshToken)
        }
    }, [groupToken, componentMounted])

    useTitle('Ilmastoroolikysely')

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return
        }

        setSnackbarOpen(false)
    }

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
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4500}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{ top: isMobile ? 0 : 80 }}
            >
                <Alert
                    onClose={handleClose}
                    color={'primary'}
                    sx={{ width: '100%' }}
                >
                    Ryhmään liittyminen onnistui! Löydät ryhmään liittyvät
                    toiminnot oikeasta yläkulmasta.
                </Alert>
            </Snackbar>
            <RolesAccordion />
        </Container>
    )
}
