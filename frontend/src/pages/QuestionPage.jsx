import { useParams } from 'react-router-dom'
import Question from '../components/Question'

export function QuestionPage() {
    const { id } = useParams()

    return (
        <>
            <Question questionId={id} />
        </>
    )
}
