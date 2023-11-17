import {
    Typography,
    Container,
    Button,
    Stack,
    Box,
    Paper,
    InputBase,
    IconButton,
    FormControl,
    FormHelperText,
    Skeleton,
} from '@mui/material'
import * as React from 'react'
import { useTitle } from '../hooks/useTitle'
import GroupDialog from '../components/GroupDialog'

export const LandingPage = () => {
    const [groupToken, setGroupToken] = React.useState('')
    const [isValid, setIsValid] = React.useState(true)
    const [joinedToGroup, setJoinedToGroup] = React.useState(false)

    const handleTextFieldChange = (event) => {
        setGroupToken(event.target.value.toUpperCase())
        setIsValid(true)
        setJoinedToGroup(false)
    }

    const handleSubmit = () => {
        if (groupToken === '') {
            setIsValid(false)
            return
        }
        fetch(`/api/group/${groupToken}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Verkkoyhteysvirhe')
                }
                return response.json()
            })
            .then((data) => {
                if (data.group_token) {
                    localStorage.setItem('groupToken', groupToken)
                    window.dispatchEvent(new Event('setGroupToken'))
                    setGroupToken('')
                    setJoinedToGroup(true)
                } else {
                    setIsValid(false)
                }
            })
    }
    useTitle('Ilmastokompassi')
    return (
        <Container>
            <Stack
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                }}
                spacing={5}
                paddingTop={10}
            >
                <Stack
                    paddingTop={2}
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    justifyContent={'space-evenly'}
                    alignItems={'center'}
                >
                    <Box>
                        <Typography variant="h4" align="left">
                            Tervetuloa Ilmastokompassiin!
                        </Typography>
                        <Typography variant="h6" align="left">
                            Ilmastokompassi on ilmastonmuutokseen liittyvä
                            oppimisalusta, joka tarjoaa oppimateriaalia
                            ilmastonmuutoksesta ja sen hillinnästä.
                            Ilmastokompassi on suunnattu erityisesti
                            yläkoululaisille ja lukiolaisille, mutta soveltuu
                            myös muille ilmastonmuutoksesta kiinnostuneille.
                        </Typography>
                    </Box>
                    <Box>
                        <Skeleton variant="circular" width={250} height={250} />
                    </Box>
                </Stack>
                <Box paddingTop={2}>
                    <Stack>
                        <Stack
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                            direction={'row'}
                            spacing={4}
                        >
                            <FormControl error={!isValid} variant="outlined">
                                <Paper
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <InputBase
                                        id="input-group-token"
                                        label="Ryhmätunnus"
                                        variant="outlined"
                                        placeholder="Syötä ryhmätunnus"
                                        value={groupToken}
                                        onChange={handleTextFieldChange}
                                    />
                                    <IconButton
                                        id="btn-join-group"
                                        type="button"
                                        onClick={handleSubmit}
                                    >
                                        <Typography>Liity</Typography>
                                    </IconButton>
                                </Paper>
                                {!isValid && (
                                    <FormHelperText>
                                        Ryhmään liittyminen epäonnistui!
                                    </FormHelperText>
                                )}
                                {joinedToGroup && (
                                    <FormHelperText>
                                        Ryhmään liittyminen onnistui!
                                    </FormHelperText>
                                )}
                                {isValid && !joinedToGroup && (
                                    <FormHelperText>
                                        <br></br>
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <GroupDialog />
                        </Stack>
                    </Stack>
                </Box>
                <Stack
                    paddingTop={2}
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={2}
                    justifyContent={'space-evenly'}
                >
                    <Button
                        style={{
                            width: 300,
                            height: 150,
                            fontSize: '20px',
                        }}
                        variant="contained"
                        color="secondary"
                        href={`/kyselyt`}
                    >
                        Ilmastoroolikysely
                    </Button>
                    <Button
                        style={{
                            width: 300,
                            height: 150,
                            fontSize: '20px',
                        }}
                        variant="contained"
                        disabled
                    >
                        Oppimisvisa
                    </Button>
                </Stack>
            </Stack>
        </Container>
    )
}
