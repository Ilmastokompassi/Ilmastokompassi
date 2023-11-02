import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

export default function FormDialog() {
    const [open, setOpen] = React.useState(false)
    const [token, setToken] = React.useState('')
    const navigate = useNavigate()

    const handleTextFieldChange = (event) => {
        setToken(event.target.value.toUpperCase())
    }
    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        if (token === '') {
            alert('Syötä ryhmätunnus.')
            return
        } else if (token.length > 10) {
            alert('Ryhmätunnus ei voi olla yli 10 merkkiä pitkä.')
            return
        } else if (!/^[A-Z0-9]+$/.test(token)) {
            alert('Ryhmätunnus voi sisältää vain isoja kirjaimia ja numeroita.')
            return
        }
        fetch(`/api/group/${token}`, {
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
                    localStorage.setItem('groupToken', token)
                    window.dispatchEvent(new Event('setGroupToken'))
                    navigate('/kysymys/1')
                    setOpen(false)
                } else {
                    alert('Ryhmätunnusta ei löytynyt.')
                }
            })
    }

    return (
        <>
            <Button
                id="btn-join-group-dialog"
                variant="contained"
                onClick={handleClickOpen}
                color="secondary"
            >
                <Typography className="survey-option">
                    Teen kyselyn ryhmässä
                </Typography>
            </Button>
            <Dialog id="dialog-join-group" open={open} onClose={handleClose}>
                <DialogTitle>Teen kyselyn ryhmässä</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Syötä tähän saamasi ryhmätunnus. Jos haluat luoda
                        ryhmätunnuksen, voit luoda sen &quot;Luo ryhmä&quot;
                        painikkeesta.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="input-join-group-token"
                        label="Ryhmätunnus"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleTextFieldChange}
                        value={token}
                    />
                </DialogContent>
                <DialogActions>
                    <Button id="btn-cancel-group-joining" onClick={handleClose}>
                        EIKU
                    </Button>
                    <Button id="btn-join-group-token" onClick={handleSubmit}>
                        Kyselyyn
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
