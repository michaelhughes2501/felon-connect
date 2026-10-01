import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

// App includes BrowserRouter, so no extra wrapper needed.

describe('App – routing', () => {
  it('renders the home page by default', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /fresh start/i })).toBeInTheDocument()
  })

  it('navigates to the Jobs page when the Jobs nav link is clicked', async () => {
    render(<App />)
    // The nav link label is exactly "Jobs"; use the nav element to scope the query
    const header = screen.getByRole('banner')
    await userEvent.click(within(header).getByRole('link', { name: /^jobs$/i }))
    expect(
      screen.getByRole('heading', { name: /fair-chance jobs hiring now/i }),
    ).toBeInTheDocument()
  })

  it('navigates to the Resources page', async () => {
    render(<App />)
    const header = screen.getByRole('banner')
    await userEvent.click(within(header).getByRole('link', { name: /^resources$/i }))
    expect(
      screen.getByRole('heading', { name: /support for every part of reentry/i }),
    ).toBeInTheDocument()
  })

  it('navigates to the Community page', async () => {
    render(<App />)
    const header = screen.getByRole('banner')
    await userEvent.click(within(header).getByRole('link', { name: /^community$/i }))
    expect(
      screen.getByRole('heading', { name: /you're not doing this alone/i }),
    ).toBeInTheDocument()
  })

  it('navigates to the Legal page', async () => {
    render(<App />)
    const header = screen.getByRole('banner')
    await userEvent.click(within(header).getByRole('link', { name: /^legal$/i }))
    expect(
      screen.getByRole('heading', { name: /clearing your record/i }),
    ).toBeInTheDocument()
  })
})

describe('Nav – brand', () => {
  it('renders the brand name "Felon Connect"', () => {
    render(<App />)
    // The brand NavLink contains the text "Felon Connect"
    expect(screen.getByText('Felon Connect')).toBeInTheDocument()
  })

  it('brand link points to /', () => {
    render(<App />)
    // Find the brand anchor – it wraps "Felon Connect"
    const brandLink = screen.getByText('Felon Connect').closest('a')
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('renders all five navigation links', () => {
    render(<App />)
    const header = screen.getByRole('banner')
    const linkLabels = ['Home', 'Jobs', 'Resources', 'Community', 'Legal']
    linkLabels.forEach((label) => {
      expect(within(header).getByRole('link', { name: new RegExp(`^${label}$`, 'i') })).toBeInTheDocument()
    })
  })
})

describe('Nav – mobile toggle', () => {
  it('toggle button has aria-label "Toggle menu"', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument()
  })

  it('toggle button starts with aria-expanded="false"', () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('clicking toggle changes aria-expanded to "true"', async () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
  })

  it('clicking toggle twice returns aria-expanded to "false"', async () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    await userEvent.click(toggle)
    await userEvent.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it('nav-links container has "closed" class when menu is not open', () => {
    render(<App />)
    // The nav element wrapping the links should have class "closed" initially
    const navLinks = document.querySelector('.nav-links')
    expect(navLinks).toHaveClass('closed')
  })

  it('nav-links container loses "closed" class when toggle is clicked', async () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    await userEvent.click(toggle)
    const navLinks = document.querySelector('.nav-links')
    expect(navLinks).not.toHaveClass('closed')
  })

  it('clicking a nav link closes the mobile menu', async () => {
    render(<App />)
    const toggle = screen.getByRole('button', { name: /toggle menu/i })
    await userEvent.click(toggle)
    // Menu is open, click a link
    const jobsLink = screen.getByRole('link', { name: /^jobs$/i })
    await userEvent.click(jobsLink)
    // Menu should be closed again
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('Footer', () => {
  it('renders "Made for second chances."', () => {
    render(<App />)
    expect(screen.getByText('Made for second chances.')).toBeInTheDocument()
  })

  it('renders the current year in the copyright notice', () => {
    render(<App />)
    const year = new Date().getFullYear().toString()
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument()
  })

  it('copyright text includes "Felon Connect"', () => {
    render(<App />)
    const year = new Date().getFullYear()
    expect(
      screen.getByText(new RegExp(`${year}.*Felon Connect`, 'i')),
    ).toBeInTheDocument()
  })
})