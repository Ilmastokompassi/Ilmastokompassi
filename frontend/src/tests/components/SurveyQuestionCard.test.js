import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SurveyQuestionCard from '../../components/roleSurvey/SurveyQuestionCard'

beforeEach(async () => {
    const fakeQuestion = {
        id: 1,
        content: 'How is the weather today?',
        options: [
            { id: 1, name: 'Täysin eri mieltä' },
            { id: 2, name: 'Jokseenkin eri mieltä' },
            { id: 3, name: 'En samaa enkä eri mieltä' },
            { id: 4, name: 'Jokseenkin samaa mieltä' },
            { id: 5, name: 'Täysin samaa mieltä' },
        ],
    }

    render(
        <SurveyQuestionCard question={fakeQuestion} onOptionSelected={null} />
    )
})

test('renders question heading', () => {
    expect(
        screen.getByText('1. How is the weather today?.')
    ).toBeInTheDocument()
})

test('renders the default question options', () => {
    expect(screen.getByText('Täysin eri mieltä')).toBeInTheDocument()
    expect(screen.getByText('Jokseenkin eri mieltä')).toBeInTheDocument()
    expect(screen.getByText('En samaa enkä eri mieltä')).toBeInTheDocument()
    expect(screen.getByText('Jokseenkin samaa mieltä')).toBeInTheDocument()
    expect(screen.getByText('Täysin samaa mieltä')).toBeInTheDocument()
})
