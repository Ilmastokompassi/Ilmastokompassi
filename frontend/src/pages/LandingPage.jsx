import {
    Typography,
    Container,
    Button,
    Stack,
    Card,
    CardContent,
    Box,
    Paper,
    InputBase,
    IconButton,
    FormControl,
    FormHelperText,
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
    const cardStyles = {
        width: '80%',
        maxWidth: '800px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderRadius: '16px',
        padding: '5px',
        overflowY: 'auto',
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
        <Container
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                overflow: 'hidden',
            }}
        >
            <Stack direction="column" alignItems="center">
                <Typography
                    variant="h2"
                    align="center"
                    paddingBottom={'80px'}
                    sx={{
                        fontSize: {
                            xs: '2em',
                            sm: '3em',
                            md: '4em',
                        },
                    }}
                >
                    Tervetuloa Ilmastokompassiin!
                </Typography>
                <Card sx={cardStyles}>
                    <CardContent>
                        <Stack>
                            <Box alignSelf="center" paddingTop={2}>
                                <Stack>
                                    <Typography>
                                        Liity tästä ryhmään syöttämällä
                                        ryhmätunnus
                                    </Typography>
                                    <Stack
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}
                                        direction={'row'}
                                        spacing={4}
                                    >
                                        <FormControl
                                            error={!isValid}
                                            variant="outlined"
                                        >
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
                                                    value={groupToken}
                                                    onChange={
                                                        handleTextFieldChange
                                                    }
                                                />
                                                <IconButton
                                                    id="btn-join-group"
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    <Typography>
                                                        Liity
                                                    </Typography>
                                                </IconButton>
                                            </Paper>
                                            {!isValid && (
                                                <FormHelperText>
                                                    Ryhmään liittyminen
                                                    epäonnistui!
                                                </FormHelperText>
                                            )}
                                            {joinedToGroup && (
                                                <FormHelperText>
                                                    Ryhmään liittyminen
                                                    onnistui!
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                        <GroupDialog />
                                    </Stack>
                                </Stack>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    alignItems: 'center',
                                    paddingBottom: '40px',
                                    paddingTop: '40px',
                                }}
                            >
                                <Button
                                    style={{
                                        width: 250,
                                        height: 60,
                                        fontSize: '20px',
                                    }}
                                    variant="contained"
                                    color="secondary"
                                    href={`/kyselyt`}
                                >
                                    Ilmastoprofiilikysely
                                </Button>
                                <Button
                                    style={{
                                        width: 250,
                                        height: 60,
                                        fontSize: '20px',
                                    }}
                                    variant="contained"
                                    color="disabled"
                                >
                                    Oppimisvisa
                                </Button>
                            </Box>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Container>
    )
}
