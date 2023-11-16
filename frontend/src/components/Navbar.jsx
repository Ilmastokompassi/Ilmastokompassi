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
import { theme } from '../theme'
import GroupIcon from '@mui/icons-material/Group'
import ClimComp from '../assets/climcomp.png'

const pages = [
    { name: 'Kyselyt', route: '/kyselyt', id: 'survey' },
    { name: 'Ilmastoprofiilit', route: '/profiilit', id: 'profiles' },
]

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)
    const [groupToken, setGroupToken] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    React.useEffect(() => {
        const refreshToken = () => {
            setGroupToken(localStorage.getItem('groupToken'))
        }

        refreshToken()
        window.addEventListener('setGroupToken', refreshToken)
        return () => {
            window.removeEventListener('setGroupToken', refreshToken)
        }
    }, [])

    const Logo = () => {
        return (
            <Typography component={NavLink} to="/">
                <img
                    src={ClimComp}
                    alt="logo"
                    style={{
                        height: 'auto',
                        maxWidth: '100%',
                        maxHeight: '48px',
                    }}
                />
            </Typography>
        )
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            alignItems: 'center',
                            mr: 1,
                        }}
                    >
                        <Logo />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        id="navbar-brand-large"
                        component={NavLink}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Ilmastokompassi
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                            id="hamburger"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
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
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    component={NavLink}
                                    to={page.route}
                                    key={page.name}
                                    id={page.id + '-hamburger'}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {page.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            display: { nav_sm: 'flex', xs: 'none', md: 'none' },
                            alignItems: 'center',
                            mr: 1,
                        }}
                    >
                        <Logo />
                    </Box>
                    <Typography
                        variant="h6"
                        noWrap
                        component={NavLink}
                        id="navbar-brand-small"
                        sx={{
                            fontSize: '20px',
                            [theme.breakpoints.down('nav_sm')]: {
                                fontSize: '14px',
                            },
                            mr: 2,
                            display: 'flex',
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            [theme.breakpoints.up('md')]: {
                                display: 'none',
                            },
                        }}
                    >
                        Ilmastokompassi
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                component={NavLink}
                                to={page.route}
                                key={page.name}
                                id={page.id}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                            id="btn-show-group-info"
                        >
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                                <GroupIcon />
                            </Avatar>
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
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
                                key="groupToken"
                                id="group-token"
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
                                        key="GroupSummary"
                                        id="btn-group-summary"
                                        onClick={() => {
                                            handleCloseUserMenu()
                                        }}
                                        component={NavLink}
                                        to={`/yhteenveto/ryhma/${groupToken}`}
                                    >
                                        Ryhmän tiedot
                                    </MenuItem>
                                    <MenuItem
                                        key="leaveGroup"
                                        id="btn-leave-group"
                                        onClick={() => {
                                            localStorage.removeItem(
                                                'groupToken'
                                            )
                                            setGroupToken(null)
                                            handleCloseUserMenu()
                                        }}
                                    >
                                        Poistu ryhmästä
                                    </MenuItem>
                                </Box>
                            ) : null}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
