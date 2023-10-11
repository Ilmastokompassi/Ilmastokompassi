import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'

export default function FormDialog() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                <Typography className="survey-option">
                    Teen kyselyn ryhmässä
                </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose}>
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
                        id="group_token"
                        label="Ryhmän tunnus"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>EIKU</Button>
                    <Button onClick={handleClose}>Liity ryhmään</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
