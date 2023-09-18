import Stack from '@mui/material/Stack'
import { Button } from '@mui/material'

function Survey() {
    return (
        <div>
            <h1>How often do you use this app?</h1>
            <Stack spacing={2}>
                <Button>Kerran vuodessa</Button>
                <Button>Kerran kuukaudessa</Button>
                <Button>Kerran viikossa</Button>
            </Stack>
        </div>
    )
}

export default Survey
