import axios from 'axios'
import { useEffect, useState } from 'react'

export const LandingPage = () => {
    const [content, setContent] = useState([])

    useEffect(() => {
        const getContent = async () => {
            const res = await axios('/api/test-content')
            setContent(res)
            setContent(res.data.content)
        }
        getContent()
    }, [])

    return (
        <>
            <p>{content}</p>
        </>
    )
}
