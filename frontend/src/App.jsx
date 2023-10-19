import { RouterProvider } from 'react-router-dom'
import { CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import { router } from './router'
import { theme } from './theme'
import { SWRConfig } from 'swr'

const swrConfig = {
    fetcher: (resource, init) =>
        fetch(resource, init).then((res) => res.json())
}

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <SWRConfig value={swrConfig}>
                    <CssBaseline />
                    <RouterProvider
                        router={router}
                        fallbackElement={<CircularProgress />}
                    />
                </SWRConfig>
            </ThemeProvider>
        </>
    )
}
