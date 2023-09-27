import { useEffect } from 'react'
import useSWR from 'swr'

export const LandingPage = () => {
    const { data } = useSWR('/api/test-content')
    const content = data?.content

    useEffect(() => {
        document.title = 'Ilmastokompassi'
    }, [])

    return (
        <>
            <p>{content}</p>
        </>
    )
}
