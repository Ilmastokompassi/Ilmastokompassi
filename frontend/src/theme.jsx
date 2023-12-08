import { createTheme, responsiveFontSizes } from '@mui/material'
import { LinkBehavior } from './components/LinkBehavior'

export const theme = responsiveFontSizes(
    createTheme({
        typography: {
            button: {
                textTransform: 'none',
            },
            body1: {
                fontSize: '1.4rem',
            },
            h1: {
                fontSize: '3rem',
                fontWeight: 'normal',
            },
            h2: {
                fontSize: '1.8rem',
                fontWeight: 'normal',
            },
            h3: {
                fontSize: '1.4rem',
                fontWeight: 'normal',
            },
            h4: {
                fontSize: '1.2rem',
                fontWeight: 'normal',
            },
            footer_link: {
                fontSize: '1.2rem',
                fontWeight: 'normal',
                color: '#ffffff',
            },
        },
        palette: {
            primary: {
                main: '#27632a',
            },
            secondary: {
                main: '#3949ab',
            },
            iconGray: {
                main: '#A9A9A9',
            },
            action: {
                disabled: '#3b3939',
            },
            actionAlt: {
                disabled: '#A9A9A9',
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
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 10,
                    },
                },
            },
        },
        background: { paper: '#FAFAF8' },
        contrastThreshold: 4.5,
    }),
    {
        /* https://mui.com/material-ui/customization/theming/#responsivefontsizes-theme-options-theme */
        factor: 2,
    }
)

export default theme
