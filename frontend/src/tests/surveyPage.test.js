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
        screen.getByText('Ilmastoroolikysely')
    })

    test('renders button and link', () => {
        const links = screen.getAllByRole('link')
        expect(links.length).toBe(2)
    })

    test('Survey start link', () => {
        const link = screen.queryByTestId('btn-start-survey')
        expect(link.href).toMatch(/\/kysymys\/1$/)
    })
})
