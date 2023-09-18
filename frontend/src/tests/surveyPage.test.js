import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { SurveyPage } from '../pages/SurveyPage'
import { BrowserRouter } from 'react-router-dom'

test('renders heading', () => {
    render(
        <BrowserRouter>
            <SurveyPage />
        </BrowserRouter>
    )

    screen.getByText('Miten haluat tehdä kyselyn?')
})

test('renders buttons and links', () => {
    render(
        <BrowserRouter>
            <SurveyPage />
        </BrowserRouter>
    )

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(1)

    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBe(1)
})

test('Survey start link', () => {
    render(
        <BrowserRouter>
            <SurveyPage />
        </BrowserRouter>
    )

    const link = screen.queryByTestId('btn-start-survey')
    expect(link.href).toMatch(/\/question\/1$/)
})
