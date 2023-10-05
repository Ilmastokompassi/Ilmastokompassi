import { Container } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const SummaryPage = () => {
    const { userId: userParamId } = useParams()
    const [answerCount, setAnswerCount] = useState(0)
    const totalQuestions = 33

    const userId = parseInt(userParamId)

    useEffect(() => {
        document.title = 'Oma ilmastoprofiili'

        // Let's assume that the user_id is 1, replace it as per your use case

        // Fetch the count of answered questions from the API
        fetch(`/api/answers/count/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setAnswerCount(data.count)
            })
            .catch((error) => {
                console.error('Error fetching the data', error)
            })
    })

    return (
        <Container>
            Olet vastannut {answerCount}/{totalQuestions} kysymykseen ja alta
            löydät oman ilmastoprofiilisi!
        </Container>
    )
}
