import { RouterProvider } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import './App.css'
import { router } from './router'

export default function App() {
    return (
        <>
            <RouterProvider
                router={router}
                fallbackElement={<CircularProgress />}
            />
        </>
    )
}
