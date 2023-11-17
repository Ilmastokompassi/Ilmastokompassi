import { createTheme } from '@mui/material'
import { LinkBehavior } from './components/LinkBehavior'

export const theme = createTheme({
    palette: {
        primary: {
            main: '#27632a',
        },
        secondary: {
            main: '#3949ab',
        },
        contrastThreshold: 4.5,
    },

    typography: {
        h6: {
            fontWeight: 'normal',
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
