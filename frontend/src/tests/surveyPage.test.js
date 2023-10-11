import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { SurveyPage } from '../pages/SurveyPage'
import { BrowserRouter } from 'react-router-dom'

describe('Survey page', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <SurveyPage />
            </BrowserRouter>
        )
    })

    test('renders heading', () => {
        screen.getByText('Miten haluat tehdä kyselyn?')
    })

    test('renders buttons and links', () => {
        const links = screen.getAllByRole('link')
        expect(links.length).toBe(1)

        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(2)
    })

    test('Survey start link', () => {
        const link = screen.queryByTestId('btn-start-survey')
        expect(link.href).toMatch(/\/question\/1$/)
    })
})