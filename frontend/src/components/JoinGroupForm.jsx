import { Button, Stack, TextField, Snackbar } from '@mui/material'
import { useState } from 'react'
import Alert from '@mui/material/Alert'

const JoinGroupForm = () => {
    const [groupToken, setGroupToken] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [open, setOpen] = useState(false)

    const handleTextFieldChange = (event) => {
        setGroupToken(event.target.value.toUpperCase())
        setIsValid(true)
    }
    const handleClose = (reason) => {
        if (reason !== 'clickaway') {
            setOpen(false)
        }
    }

    const handleSubmit = () => {
        if (groupToken === '') {
            setIsValid(false)
            return
        }
        fetch(`/api/groups/${groupToken}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.group_token) {
                    localStorage.setItem('groupToken', groupToken)
                    window.dispatchEvent(new Event('setGroupToken'))
                    setGroupToken('')
                    setOpen(true)
                } else {
                    setIsValid(false)
                }
            })
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit()
        }
    }

    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-evenly"
                alignItems="center"
                spacing={2}
            >
                <TextField
                    data-testid="group-token-input"
                    label="Ryhmätunnus"
                    placeholder="Syötä ryhmätunnus"
                    error={!isValid}
                    helperText={!isValid && 'Ryhmään liittyminen epäonnistui.'}
                    value={groupToken}
                    onChange={handleTextFieldChange}
                    size="small"
                    onKeyDown={handleKeyDown}
                />
                <Button
                    data-testid="join-group"
                    onClick={handleSubmit}
                    color="secondary"
                    variant="contained"
                >
                    Liity ryhmään
                </Button>
            </Stack>
            <Snackbar
                open={open}
                autoHideDuration={4500}
                onClose={(_, reason) => handleClose(reason)}
            >
                <Alert
                    variant="filled"
                    color="primary"
                    onClose={() => setOpen(false)}
                >
                    Ryhmään liittyminen onnistui! Löydät ryhmään liittyvät
                    toiminnot oikean yläkulman kuvakkeesta.
                </Alert>
            </Snackbar>
        </>
    )
}

export default JoinGroupForm
