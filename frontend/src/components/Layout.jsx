import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { Background} from '../components/Background'

export const Layout = () => (
    <>
        <Background />
        <Navbar />
        <Outlet />
    </>
)
