import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { NavLink } from 'react-router-dom'
import GroupIcon from '@mui/icons-material/Group'
import ClimComp from '../assets/climcomp.png'
import { Stack, useMediaQuery, useTheme } from '@mui/material'

const pages = [
    { name: 'Ilmastoroolikysely', route: '/ilmastoroolikysely', id: 'survey' },
    { name: 'Ilmastoroolit', route: '/ilmastoroolit', id: 'roles' },
    { name: 'FAQ', route: '/faq', id: 'faq' },
]

const Logo = () => (
    <Typography
        variant={{ xs: 'h6', md: 'h5' }}
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
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const handleCloseNavMenu = () => setAnchorElNav(null)
    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
    return (
        <>
            <IconButton
                aria-controls="appbar-navigation-menu"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                data-testid="navigation-hamburger"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="appbar-navigation-menu"
                data-testid="appbar-navigation-menu"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                {pages.map((page) => (
                    <MenuItem
                        key={page.id}
                        component={NavLink}
                        to={page.route}
                        data-testid={page.id + '-navigation-menu-item'}
                        onClick={handleCloseNavMenu}
                    >
                        {page.name}
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

const GroupMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [groupToken, setGroupToken] = React.useState(null)

    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
    const handleCloseUserMenu = () => setAnchorElUser(null)

    React.useEffect(() => {
        const refreshToken = () =>
            setGroupToken(localStorage.getItem('groupToken'))

        refreshToken()
        window.addEventListener('setGroupToken', refreshToken)
        return () => {
            window.removeEventListener('setGroupToken', refreshToken)
        }
    }, [])

    return (
        <>
            <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}
                data-testid="show-group-menu"
                aria-controls="appbar-group-menu"
                aria-haspopup="true"
            >
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <GroupIcon />
                </Avatar>
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="appbar-group-menu"
                data-testid="appbar-group-menu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    data-testid="current-group-token"
                    onClick={handleCloseUserMenu}
                    disableRipple
                    disableTouchRipple
                    sx={{
                        cursor: 'default',
                        '&:hover': {
                            backgroundColor: 'inherit',
                        },
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            cursor: 'default',
                        }}
                    >
                        {groupToken
                            ? `Ryhmätunnus: ${groupToken}`
                            : 'Et ole ryhmässä'}
                    </Typography>
                </MenuItem>
                {groupToken ? (
                    <Box>
                        <MenuItem
                            data-testid="open-group-summary"
                            onClick={() => {
                                handleCloseUserMenu()
                            }}
                            component={NavLink}
                            to={`/yhteenveto/ryhma/${groupToken}`}
                        >
                            Ryhmän tulokset
                        </MenuItem>
                        <MenuItem
                            data-testid="leave-group"
                            onClick={() => {
                                localStorage.removeItem('groupToken')
                                setGroupToken(null)
                                window.dispatchEvent(new Event('setGroupToken'))
                                handleCloseUserMenu()
                            }}
                        >
                            Poistu ryhmästä
                        </MenuItem>
                    </Box>
                ) : null}
            </Menu>
        </>
    )
}

function ResponsiveAppBar() {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    {/* Mobile */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        flexGrow={1}
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
export default ResponsiveAppBar
