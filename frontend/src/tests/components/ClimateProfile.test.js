import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ClimateRole } from '../../components/ClimateRole'

test('renders description', () => {
    render(<ClimateRole id={1} description="Kuvaus_1" />)

    expect(screen.getByText('Kuvaus_1')).toBeInTheDocument()
})
