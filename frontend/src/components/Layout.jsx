import { Outlet } from 'react-router-dom'
import NavigationBar from './NavigationBar'
import { Background } from './Background'

export const Layout = () => (
    <>
        <Background />
        <NavigationBar />
        <Outlet />
    </>
)
