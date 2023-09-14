import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { LandingPage } from './pages/LandingPage'
import { MaterialPage } from './pages/MaterialPage'

// Defines the routes of the application
export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <LandingPage />,
            },
            {
                path: '/material',
                element: <MaterialPage />,
            },
        ],
    },
])
