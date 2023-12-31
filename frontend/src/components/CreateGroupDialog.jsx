import * as React from 'react'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Button,
    Typography,
} from '@mui/material'

export default function CreateGroupDialog() {
    const [groupName, setGroupName] = React.useState('')
    const [isValid, setIsValid] = React.useState(true)
    const [alertMessage, setAlertMessage] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [groupIsMade, setGroupIsMade] = React.useState(false)

    const validateGroupName = (groupName) => /^[A-Z0-9]{1,10}$/.test(groupName)

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
        fetch('/api/groups/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ groupToken: groupName.toUpperCase() }),
        }).then((response) => {
            if (response.status !== 201) {
                setIsValid(false)
                setAlertMessage('Ryhmätunnus on jo käytössä.')
                return
            }
            setGroupIsMade(true)
        })
    }

    const resetDialog = () => {
        setGroupIsMade(false)
        setGroupName('')
    }

    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            handleSubmit()
        }
    }

    return (
        <>
            <Button
                data-testid="open-create-group-dialog"
                variant="contained"
                color="secondary"
                onClick={() => setOpen(true)}
            >
                <Typography
                    component="div"
                    padding={0.5}
                    letterSpacing={1}
                    variant="button"
                >
                    LUO RYHMÄ
                </Typography>
            </Button>
            <Dialog
                data-testid="create-group-dialog"
                open={open}
                onClose={() => setOpen(false)}
            >
                {groupIsMade ? (
                    <>
                        <DialogTitle>
                            Ryhmä {groupName} luotu onnistuneesti!
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                - Kerro ryhmään osallistuville ryhmätunnuksen
                                liittymistä varten.
                            </DialogContentText>
                            <DialogContentText>
                                - Ryhmän luojana et ole vielä osana ryhmää. Jos
                                haluat tehdä kyselyjä ryhmässä, muistathan
                                liittyä.
                            </DialogContentText>
                            <DialogContentText>
                                - Ryhmään liittyviä toiminnallisuuksia pääset
                                tarkastelemaan oikean yläkulman painikkeesta.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                data-testid="ok"
                                onClick={() => setOpen(false)}
                            >
                                Ok
                            </Button>
                            <Button
                                data-testid="reset-dialog"
                                onClick={resetDialog}
                            >
                                Luo uusi ryhmä
                            </Button>
                            <Button
                                data-testid="open-group-summary"
                                href={'/yhteenveto/ryhma/' + groupName}
                            >
                                Ryhmän tulokset
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
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
                                helperText={!isValid && alertMessage}
                                autoFocus
                                margin="dense"
                                label="Ryhmätunnus"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={groupName}
                                onChange={handleGroupNameChange}
                                data-testid="group-token"
                                onKeyDown={(event) => handleKeyDown(event)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                data-testid="cancel"
                                onClick={() => setOpen(false)}
                            >
                                Takaisin
                            </Button>
                            <Button
                                data-testid="create-group"
                                onClick={handleSubmit}
                                color="primary"
                                disabled={!isValid}
                            >
                                Luo
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </>
    )
}
