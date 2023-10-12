import * as React from 'react'
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

    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value)
    }

    const handleSubmit = () => {
        // Call function to submit group name to database with 'token' as its name
        console.log(`Submitting group name: ${groupName}`)
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
