import { createTheme } from '@mui/material'
import { LinkBehavior } from './components/LinkBehavior'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#006600' /* MUI default */,
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
            nav_sm: 415,
            nav_xs: 340,
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
