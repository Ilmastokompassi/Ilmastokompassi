import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import { act, screen } from '@testing-library/react'
import renderWithRoute from './utils/renderWithRoute'

fetchMock.enableMocks()

describe('Question page', () => {
    beforeEach(async () => {
        fetchMock.resetMocks()

        const fakeQuestions = [
            {
                id: 1,
                content: 'How is the weather today?'
            },
            {
                id: 2,
                content: 'Static typing is better than dynamic typing?'
            }
        ];

        // GET /api/question
        fetchMock.mockResponse(JSON.stringify(fakeQuestions))

        await act(async () =>
            renderWithRoute('/question/1')
        )
    })

    test('renders question heading', async () => {
        expect(await screen.findByText('1. How is the weather today?')).toBeInTheDocument()
    })

    test('renders move next button on the first page', async () => {
        const submitButton = await screen.findByRole('link', {
            name: /next question/i,
        })
        expect(submitButton).toBeInTheDocument()
    })
    test('renders previous question button on the first page', async () => {
        const submitButton = await screen.findByRole('link', {
            name: /previous question/i,
        })
        expect(submitButton).toBeInTheDocument()
    })
})