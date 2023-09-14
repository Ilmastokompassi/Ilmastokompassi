import axios from 'axios'
import { useEffect, useState } from 'react'

export const LandingPage = () => {
    const [content, setContent] = useState([])

    useEffect(() => {
        const getContent = async () => {
            const res = await axios('http://localhost:5000/apitest')
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
