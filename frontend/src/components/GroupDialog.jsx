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

export default function GroupDialog() {
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
        fetch('/api/new-group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: groupName.toUpperCase() }),
        })
            .then((response) => response.json())
            .then(() => {
                setOpen(false)
                window.alert('Ryhmä luotu onnistuneesti!')
                navigate('/kyselyt/')
            })
            .catch((error) => console.error(error))
    }

    return (
        <div>
            <Button
                id="btn-create-group-dialog"
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(true)}
            >
                Luo ryhmä
            </Button>
            <Dialog
                id="dialog-create-group"
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle>Luo uusi ryhmä</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ryhmätunnus voi sisältää vain isoja kirjaimia, numeroita
                        tai niiden yhdistelmiä. Ryhmätunnus saa olla enintään 10
                        merkkiä pitkä. Syötä haluamasi uusi ryhmätunnus ja paina
                        &quot;Luo&quot;.
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
                        id="input-create-group-token"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        id="btn-cancel-group-creation"
                        onClick={() => setOpen(false)}
                    >
                        EIKU
                    </Button>
                    <Button
                        id="btn-create-group-token"
                        onClick={handleSubmit}
                        color="primary"
                    >
                        Luo
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
