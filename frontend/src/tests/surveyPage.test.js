import React from 'react'
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
