import { render, } from "@testing-library/react"
import { SWRConfig } from 'swr'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { routes } from '../../router'
import { theme } from '../../theme'

// Helper intended for integration tests that require a specific route.
export default function renderWithRoute(route = "/") {
    // Create in-memory router with initial route
    const testRouter = createMemoryRouter(routes, {
        initialEntries: [route]
    })

    render(
        <ThemeProvider theme={theme}>
            <SWRConfig value={{
                dedupingInterval: 0,
                fetcher: (resource, init) =>
                    fetch(resource, init).then((res) => res.json())
            }}>
                <RouterProvider router={testRouter} />
            </SWRConfig>
        </ThemeProvider>
    )
}