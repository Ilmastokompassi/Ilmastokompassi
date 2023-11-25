import { createTheme } from '@mui/material'
import { LinkBehavior } from './components/LinkBehavior'

export const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none',
        },
    },
    palette: {
        primary: {
            main: '#27632a',
        },
        secondary: {
            main: '#3949ab',
        },
        contrastThreshold: 4.5,
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
