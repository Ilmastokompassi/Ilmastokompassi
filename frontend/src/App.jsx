import { useState, useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [content, setContent] = useState([])
  useEffect(() => {
    const getContent = async() => {
      const res = await axios("http://localhost:5000/apitest")
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

export default App
