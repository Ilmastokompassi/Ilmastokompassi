import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import ListItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import GroupIcon from '@mui/icons-material/Group'
import PersonIcon from '@mui/icons-material/Person'
import { NavLink } from 'react-router-dom'
import ClimComp from '../assets/climcomp.png'

const pages = [
    { name: 'Ilmastoroolikysely', route: '/ilmastoroolikysely', id: 'survey' },
    { name: 'Ilmastoroolit', route: '/ilmastoroolit', id: 'roles' },
    { name: 'FAQ', route: '/faq', id: 'faq' },
]

const Logo = () => (
    <Typography
        variant="h6"
        component={NavLink}
        to="/"
        fontFamily="monospace"
        fontWeight="bold"
        color="inherit"
        sx={{ textDecoration: 'none' }}
        data-testid="logo"
    >
        <Stack direction="row" alignItems="center">
            <img src={ClimComp} alt="logo" height={48} width={48} />
            Ilmastokompassi
        </Stack>
    </Typography>
)

const NavigationMenu = () => {
    const [anchorElement, setAnchorElement] = React.useState(null)

    return (
        <>
            <IconButton
                aria-controls="navigation-menu"
                aria-haspopup="true"
                onClick={(event) => setAnchorElement(event.currentTarget)}
                color="inherit"
                data-testid="navigation-hamburger"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="navigation-menu"
                data-testid="navigation-menu"
                anchorEl={anchorElement}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElement)}
                onClose={() => setAnchorElement(null)}
            >
                {pages.map((page) => (
                    <MenuItem
                        key={page.id}
                        component={NavLink}
                        to={page.route}
                        data-testid={page.id + '-navigation-menu-item'}
                        onClick={() => setAnchorElement(null)}
                    >
                        {page.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

const GroupMenu = () => {
    const [anchorElement, setAnchorElement] = React.useState(null)
    const [groupToken, setGroupToken] = React.useState(null)

    const refreshToken = () => setGroupToken(localStorage.getItem('groupToken'))

    React.useEffect(() => {
        refreshToken()
        window.addEventListener('setGroupToken', refreshToken)

        return () => window.removeEventListener('setGroupToken', refreshToken)
    }, [])

    return (
        <>
            <IconButton
                onClick={(event) => setAnchorElement(event.currentTarget)}
                data-testid="show-group-menu"
                aria-controls="group-menu"
                aria-haspopup="true"
                color="inherit"
            >
                {groupToken ? <GroupIcon /> : <PersonIcon />}
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="group-menu"
                data-testid="group-menu"
                anchorEl={anchorElement}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElement)}
                onClose={() => setAnchorElement(null)}
            >
                <ListItem
                    data-testid="current-group-token"
                    role="menuitem"
                    sx={{ fontWeight: 'bold' }}
                >
                    {groupToken
                        ? `Ryhmätunnus: ${groupToken}`
                        : 'Et ole ryhmässä'}
                </ListItem>
                {groupToken && (
                    <>
                        <MenuItem
                            data-testid="open-group-summary"
                            onClick={() => setAnchorElement(null)}
                            component={NavLink}
                            to={'/yhteenveto/ryhma/' + groupToken}
                        >
                            Ryhmän tulokset
                        </MenuItem>
                        <MenuItem
                            data-testid="leave-group"
                            onClick={() => {
                                localStorage.removeItem('groupToken')
                                setGroupToken(null)
                                window.dispatchEvent(new Event('setGroupToken'))
                                setAnchorElement(null)
                            }}
                        >
                            Poistu ryhmästä
                        </MenuItem>
                    </>
                )}
            </Menu>
        </>
    )
}

const NavigationBar = () => {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <Stack
                        direction="row"
                        alignItems="center"
                        flexGrow={1}
                        spacing={1}
                        justifyContent="space-between"
                    >
                        {isDesktop ? (
                            <>
                                <Logo />
                                <Box flexGrow={1}>
                                    {pages.map((page) => (
                                        <Button
                                            key={page.name}
                                            component={NavLink}
                                            to={page.route}
                                            data-testid={
                                                page.id + '-navigation-button'
                                            }
                                            variant="contained"
                                            disableElevation
                                        >
                                            {page.name}
                                        </Button>
                                    ))}
                                </Box>
                                <GroupMenu />
                            </>
                        ) : (
                            <>
                                <NavigationMenu />
                                <Logo />
                                <GroupMenu />
                            </>
                        )}
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default NavigationBar
