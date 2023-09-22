import { useParams } from 'react-router-dom'
import Question from '../components/Question'
import { useEffect } from 'react'

export function QuestionPage() {
    const { id } = useParams()
    useEffect(() => {
        document.title = 'Kysymykset'
    }, [])

    return (
        <>
            <Question questionId={id} />
        </>
    )
}
