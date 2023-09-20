import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import { render, screen, waitFor } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { QuestionPage } from '../pages/QuestionPage'
import { BrowserRouter } from 'react-router-dom'

fetchMock.enableMocks()

beforeEach(async () => {
    fetchMock.resetMocks()

    fetchMock.mockResponseOnce(JSON.stringify({ length: 1 }))
    fetchMock.mockResponseOnce(
        JSON.stringify({
            question: 'How is the weather today?',
            options: ['Rainy', 'Sunny', 'Cloudy'],
        })
    )

    await act(async () => {
        render(
            <BrowserRouter>
                <QuestionPage />
            </BrowserRouter>
        )
    })

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)))
})

test('renders question heading', async () => {
    await waitFor(() => {
        expect(
            screen.getByText('How is the weather today?')
        ).toBeInTheDocument()
    })
})

test('renders question options', async () => {
    await waitFor(() => {
        expect(screen.getByText('Rainy')).toBeInTheDocument()
        expect(screen.getByText('Sunny')).toBeInTheDocument()
        expect(screen.getByText('Cloudy')).toBeInTheDocument()
    })
})
