import { Typography } from '@mui/material'
import { useEffect } from 'react'

export const ClimateProfilePage = () => {
    useEffect(() => {
        document.title = 'Ilmastoprofiilit'
    }, [])

    return (
        <>
            <Typography variant="h1">Ilmastoprofiili sivu</Typography>
        </>
    )
}
