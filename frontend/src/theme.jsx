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
    components: {
        MuiLink: {
            defaultProps: { component: LinkBehavior },
        },
        MuiButtonBase: {
            defaultProps: { LinkComponent: LinkBehavior },
        },
    },
    typography: {
        fontFamily: 'inter',
    },
})

theme.typography.h1 = {
    [theme.breakpoints.down('sm')]: {
        fontSize: '2em',
        fontWeight: 'normal',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '3em',
        fontWeight: 'normal',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '4em',
        fontWeight: 'normal',
    },
}

theme.typography.h2 = {
    [theme.breakpoints.down('sm')]: {
        fontSize: '1em',
        fontWeight: 'normal',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.5em',
        fontWeight: 'normal',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.75em',
        fontWeight: 'normal',
    },
}

theme.typography.h3 = {
    [theme.breakpoints.down('sm')]: {
        fontSize: '1em',
        fontWeight: 'normal',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '1.25em',
        fontWeight: 'normal',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.5em',
        fontWeight: 'normal',
    },
}
