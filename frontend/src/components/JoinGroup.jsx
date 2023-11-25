import {
    Button,
    Stack,
    TextField,
    Snackbar,
    useMediaQuery,
} from '@mui/material'
import CreateGroupDialog from '../components/CreateGroupDialog'
import { useState, forwardRef } from 'react'
import MuiAlert from '@mui/material/Alert'


const JoinGroup = () => {
    const [groupToken, setGroupToken] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [open, setOpen] = useState(false)

    const handleTextFieldChange = (event) => {
        setGroupToken(event.target.value.toUpperCase())
        setIsValid(true)
    }
    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert ref={ref} variant="filled" {...props} />
    })
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    const isMobile = useMediaQuery('(max-width:600px)')

    const handleSubmit = () => {
        if (groupToken === '') {
            setIsValid(false)
            return
        }
        fetch(`/api/group/${groupToken}`, {
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
                    onKeyDown={(event) => {
                        handleKeyDown(event)
                    }}
                />
                <Button
                    data-testid="join-group"
                    onClick={handleSubmit}
                    color="secondary"
                    variant="contained"
                >
                    Liity ryhmään
                </Button>
                <Snackbar
                    open={open}
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
                        toiminnot oikean yläkulman kuvakkeesta.
                    </Alert>
                </Snackbar>
            </Stack>
        </>
    )
}

export default JoinGroup
