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
    const [groupName, setGroupName] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const navigate = useNavigate()

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value.toUpperCase())
    }

    const handleSubmit = () => {
        if (groupName === '') {
            window.alert('Ryhmätunnus ei voi olla tyhjä merkkijono.')
            return
        } else if (groupName.length > 10) {
            window.alert('Ryhmätunnus ei voi olla yli 10 merkkiä pitkä.')
            return
        } else if (!/^[A-Z0-9]+$/.test(groupName)) {
            window.alert(
                'Ryhmätunnus voi sisältää vain isoja kirjaimia ja numeroita.'
            )
            return
        }
        fetch(`/api/group/${groupName}/summary`, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then(() => {
                navigate(`/group/${groupName}/summary`)
                setOpen(false)
            })
            .catch((error) => console.error(error))
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
                        Jos haluat siirtyä katsomaan ryhmäsi jakumaa, kirjoita
                        ryhmätunnus:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ryhmäntunnus"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={groupName}
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
