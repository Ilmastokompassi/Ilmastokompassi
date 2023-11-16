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
    const [isValid, setIsValid] = React.useState(true)
    const [alertMessage, setAlertMessage] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [groupIsMade, setGroupIsMade] = React.useState(false)
    const navigate = useNavigate()

    const handleGroupNameChange = (event) => {
        const newGroupName = event.target.value.toUpperCase()
        setGroupName(newGroupName)
        setIsValid(validateGroupName(newGroupName))
        setAlertMessage('Tarkista ryhmätunnus.')
    }

    const handleSubmit = () => {
        if (groupName === '') {
            setIsValid(false)
            setAlertMessage('Ryhmätunnus ei voi olla tyhjä.')
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
            .then((data) => {
                if (data.message === 'Group already exists') {
                    setIsValid(false)
                    setAlertMessage('Ryhmätunnus on jo käytössä.')
                    return
                }
                setGroupIsMade(true)
            })
            .catch((error) => console.error(error))
    }

    const moveToGroupSummaryPage = () => {
        fetch(`/api/group/${groupName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(() => {
                setOpen(false)
                navigate(`/yhteenveto/ryhma/${groupName}`)
            })
            .catch((error) => console.error(error))
    }

    const handleNew = () => {
        setGroupIsMade(false)
        setGroupName('')
    }

    const validateGroupName = (groupName) => {
        const regex = /^[A-Z0-9]{1,10}$/
        return regex.test(groupName)
    }

    return (
        <div>
            <Button
                id="btn-create-group-dialog"
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
            >
                Luo ryhmä
            </Button>
            {!groupIsMade ? (
                <Dialog
                    id="dialog-create-group"
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Luo uusi ryhmä</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ryhmätunnus voi sisältää vain isoja kirjaimia
                            väliltä A-Z, numeroita tai niiden yhdistelmiä.
                            Ryhmätunnus saa olla enintään 10 merkkiä pitkä.
                            Syötä haluamasi uusi ryhmätunnus ja paina
                            &quot;Luo&quot;.
                        </DialogContentText>
                        <TextField
                            error={!isValid}
                            helperText={isValid ? '' : alertMessage}
                            autoFocus
                            margin="dense"
                            label="Ryhmätunnus"
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
                            disabled={!isValid}
                        >
                            Luo
                        </Button>
                    </DialogActions>
                </Dialog>
            ) : (
                <Dialog
                    id="group-created-dialog"
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <DialogTitle>Ryhmä luotu onnistuneesti!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ryhmätunnus on {groupName}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            id="btn-group-created-ok"
                            onClick={() => setOpen(false)}
                        >
                            OK
                        </Button>
                        <Button
                            id="btn-create-group-token"
                            onClick={handleNew}
                            color="primary"
                        >
                            LUO UUSI RYHMÄ
                        </Button>
                        <Button
                            id="btn-ok-group-token"
                            onClick={moveToGroupSummaryPage}
                            color="primary"
                        >
                            SIIRRY KOONTIIN
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </div>
    )
}
