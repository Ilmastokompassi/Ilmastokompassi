import { Typography } from '@mui/material'
import { useEffect } from 'react'

export const MaterialPage = () => {
    useEffect(() => {
        document.title = 'Materiaalit'
    }, [])

    return (
        <>
            <Typography variant="h1">Material Page</Typography>
        </>
    )
}
