import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import QuestionCard from '../../components/QuestionCard'

beforeEach(async () => {
    const fakeQuestion = {
        id: 1,
        content: 'How is the weather today?'
    }

    render(<QuestionCard question={fakeQuestion} onOptionSelected={null} />)
})

test('renders question heading', () => {
    expect(screen.getByText('1. How is the weather today?')).toBeInTheDocument()
})

test('renders the default question options', () => {
    expect(screen.getByText('Täysin eri mieltä')).toBeInTheDocument()
    expect(screen.getByText('Jokseenkin eri mieltä')).toBeInTheDocument()
    expect(screen.getByText('En samaa enkä eri mieltä')).toBeInTheDocument()
    expect(screen.getByText('Jokseenkin samaa mieltä')).toBeInTheDocument()
    expect(screen.getByText('Täysin samaa mieltä')).toBeInTheDocument()
})