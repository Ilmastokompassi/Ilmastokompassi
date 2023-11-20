import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ClimateRole } from '../../components/ClimateRole'

test('renders heading', () => {
    render(<ClimateRole id={1} name="Profiili_1" description="Kuvaus_1" />)

    expect(screen.getByText('Profiili_1')).toBeInTheDocument()
    expect(screen.getByText('Kuvaus_1')).toBeInTheDocument()
})
