import { RouterProvider } from 'react-router-dom'
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { router } from './router'
import { theme } from './theme'

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <RouterProvider
                    router={router}
                    fallbackElement={<CircularProgress />}
                />
            </ThemeProvider>
        </>
    )
}
