import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { Background } from './Background'
import { Footer } from './Footer'
import { Box } from '@mui/material'

export const Layout = () => (
    <Box display="flex" flexDirection="column" minHeight="100vh">
        <Background />
        <NavigationBar />
        <Outlet />
        <Footer />
    </Box>
)
