import { Container } from '@mui/material'
import { useEffect } from 'react'
import useSWR from 'swr'

export const OwnClimateProfilePage = () => {
    useEffect(() => {
        document.title = 'Oma ilmastoprofiili'
    }, [])

    return (
        <Container>
            Olet vastannut kysymyksiin ja nyt voit nähdä oman ilmastoprofiilisi!
        </Container>
    )
}
