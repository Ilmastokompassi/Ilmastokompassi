import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
} from '@mui/material'

export default function GroupSummaryDialog() {
    const [groupToken, setGroupName] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value.toUpperCase())
    }

    const handleSubmit = () => {
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
                    window.dispatchEvent(new Event('setGroupToken'))
                    navigate(`/yhteenveto/ryhma/${groupToken}`)
                    setOpen(false)
                } else {
                    alert('Ryhmätunnusta ei löytynyt.')
                }
            })
    }

    return (
        <div>
            <Button
                id="btn-group-summary-dialog"
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(true)}
            >
                Ryhmän jakauma
            </Button>
            <Dialog
                id="group-summary-dialog"
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Siirry katsomaan ryhmän jakaumaa</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Jos haluat siirtyä katsomaan ryhmäsi jakaumaa, kirjoita
                        ryhmätunnus:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ryhmätunnus"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={groupToken}
                        onChange={handleGroupNameChange}
                        id="input-group-token"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        id="btn-cancel-group-summary"
                        onClick={() => setOpen(false)}
                    >
                        EIKU
                    </Button>
                    <Button
                        id="btn-move-to-group-summary"
                        onClick={handleSubmit}
                        color="primary"
                    >
                        Siirry
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
