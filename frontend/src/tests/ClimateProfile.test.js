import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ClimateProfile } from '../components/ClimateProfile'
import { BrowserRouter } from 'react-router-dom'

test('renders heading', () => {
    render(
        <BrowserRouter>
            <ClimateProfile id={1} name="Profiili_1" description="Kuvaus_1" />
        </BrowserRouter>
    )
    screen.getByText('Profiili_1')
    screen.getByText('Kuvaus_1')
})
