import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { Background } from './Background'
import { Footer } from './Footer'

export const Layout = () => (
    <>
        <Background />
        <NavigationBar />
        <Outlet />
        <Footer />
    </>
)
