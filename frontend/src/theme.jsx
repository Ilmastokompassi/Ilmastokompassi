import { createTheme } from '@mui/material'
import { LinkBehavior } from './components/LinkBehavior'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2' /* MUI default */,
        },
    },
    components: {
        MuiLink: {
            defaultProps: { component: LinkBehavior }
        },
        MuiButtonBase: {
            defaultProps: { LinkComponent: LinkBehavior }
        }
    }
})