import { render, screen } from '@testing-library/react'
import Navbar from '../../components/Navbar'
import { BrowserRouter } from 'react-router-dom'

beforeEach(() => {
    render(
        <BrowserRouter>
            <Navbar />
        </BrowserRouter>
    )
})

test('Find both ilmastokompassi', () => {
    const links = screen.getAllByText('Ilmastokompassi')

    expect(links.length).toBe(2)

    links.forEach((link) => {
        expect(link['href']).toBe('http://localhost/')
    })
})

test('Find both survey links', () => {
    const largeScreenLink = screen.getByText('Ilmastoroolikysely', {
        selector: 'a',
    })

    expect(largeScreenLink['href']).toMatch(/\/ilmastoroolikysely$/)

    const smallScreenText = screen.getByText('Ilmastoroolikysely', {
        selector: 'p',
    })
    const smallScreenLink = smallScreenText.parentElement
    expect(smallScreenLink['href']).toMatch(/\/ilmastoroolikysely$/)
})

test('Find both faq links', () => {
    const largeScreenLink = screen.getByText('FAQ', {
        selector: 'a',
    })

    expect(largeScreenLink['href']).toMatch(/\/faq$/)

    const smallScreenText = screen.getByText('FAQ', {
        selector: 'p',
    })
    const smallScreenLink = smallScreenText.parentElement
    expect(smallScreenLink['href']).toMatch(/\/faq$/)
})
