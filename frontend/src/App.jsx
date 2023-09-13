import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Navbar from './components/Navbar'

function App() {
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
            <Navbar />
            <p>{content}</p>
        </>
    )
}

export default App
