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
        setGroupName(event.target.value)
    }

    const handleSubmit = () => {
        fetch('/api/new-group', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: groupName }),
        })
            .then((response) => response.json())
            .then(() => {
                setOpen(false)
                window.alert('Ryhmä luotu onnistuneesti!')
                navigate('/survey/')
            })
            .catch((error) => console.error(error))
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Luo ryhmä
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Luo uusi ryhmä</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Syötä haluamasi uuden ryhmän tunnus ja paina
                        &quot;Luo&quot;.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ryhmän tunnus"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={groupName}
                        onChange={handleGroupNameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Peruuta</Button>
                    <Button onClick={handleSubmit} color="primary">
                        Luo
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
