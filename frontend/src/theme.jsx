import { createTheme } from '@mui/material'
import { LinkBehavior } from './components/LinkBehavior'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#006600' /* MUI default */,
        },
    },
    components: {
        MuiLink: {
            defaultProps: { component: LinkBehavior },
        },
        MuiButtonBase: {
            defaultProps: { LinkComponent: LinkBehavior },
        },
    },
})
