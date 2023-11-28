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
    const [isValid, setIsValid] = React.useState(true)
    const navigate = useNavigate()

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value.toUpperCase())
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
                    window.dispatchEvent(new Event('setGroupToken'))
                    navigate(`/yhteenveto/ryhma/${groupToken}`)
                    setOpen(false)
                } else {
                    setIsValid(false)
                }
            })
    }

    return (
        <div>
            <Button
                data-testid="open-group-summary-dialog"
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(true)}
            >
                Ryhmän jakauma
            </Button>
            <Dialog
                data-testid="group-summary"
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
                        error={!isValid}
                        helperText={isValid ? '' : 'Virheellinen ryhmätunnus'}
                        autoFocus
                        margin="dense"
                        label="Ryhmätunnus"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={groupToken}
                        onChange={handleGroupNameChange}
                        data-testid="group-token"
                    />
                </DialogContent>
                <DialogActions>
                    <Button data-testid="cancel" onClick={() => setOpen(false)}>
                        Takaisin
                    </Button>
                    <Button
                        data-testid="open-group-summary"
                        onClick={handleSubmit}
                    >
                        Siirry
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
