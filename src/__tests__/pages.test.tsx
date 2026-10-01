import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HomePage, JobsPage, ResourcesPage, CommunityPage, LegalPage } from '../pages'
import { jobs, resources, posts, legalSteps } from '../data'

function renderWithRouter(ui: React.ReactElement, { initialEntries = ['/'] } = {}) {
  return render(<MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>)
}

// ---------------------------------------------------------------------------
// HomePage
// ---------------------------------------------------------------------------
describe('HomePage', () => {
  it('renders the main heading', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByRole('heading', { name: /fresh start/i })).toBeInTheDocument()
  })

  it('renders the "Find fair-chance work" CTA link', () => {
    renderWithRouter(<HomePage />)
    const cta = screen.getByRole('link', { name: /find fair-chance work/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/jobs')
  })

  it('renders the "Join the community" CTA link', () => {
    renderWithRouter(<HomePage />)
    const cta = screen.getByRole('link', { name: /join the community/i })
    expect(cta).toBeInTheDocument()
    expect(cta).toHaveAttribute('href', '/community')
  })

  it('renders the hero stats: 2,400+ members, 180 open roles, 64% placed', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByText('2,400+')).toBeInTheDocument()
    expect(screen.getByText('Members')).toBeInTheDocument()
    expect(screen.getByText('180')).toBeInTheDocument()
    expect(screen.getByText('Open roles')).toBeInTheDocument()
    expect(screen.getByText('64%')).toBeInTheDocument()
    expect(screen.getByText('Placed')).toBeInTheDocument()
  })

  it('renders the mini-feed items', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByText(/Marcus just got hired as a CDL driver/i)).toBeInTheDocument()
    expect(screen.getByText(/New expungement clinic added in Texas/i)).toBeInTheDocument()
    expect(screen.getByText(/12 fair-chance jobs posted this week/i)).toBeInTheDocument()
  })

  it('renders the features section heading', () => {
    renderWithRouter(<HomePage />)
    expect(
      screen.getByRole('heading', { name: /everything you need to land on your feet/i }),
    ).toBeInTheDocument()
  })

  it('renders 6 feature cards', () => {
    renderWithRouter(<HomePage />)
    const featureLinks = screen
      .getAllByRole('link')
      .filter((el) => el.classList.contains('card') || el.closest('.card'))
    // At minimum the 6 feature cards should exist as links
    const cardLinks = screen.getAllByRole('link', { name: /fair-chance jobs|reentry resources|peer community|legal support|wellness|verified employers/i })
    expect(cardLinks.length).toBeGreaterThanOrEqual(6)
  })

  it('feature card "Fair-chance jobs" links to /jobs', () => {
    renderWithRouter(<HomePage />)
    const card = screen.getByRole('link', { name: /fair-chance jobs/i })
    expect(card).toHaveAttribute('href', '/jobs')
  })

  it('feature card "Legal support" links to /legal', () => {
    renderWithRouter(<HomePage />)
    const card = screen.getByRole('link', { name: /legal support/i })
    expect(card).toHaveAttribute('href', '/legal')
  })

  it('feature card "Peer community" links to /community', () => {
    renderWithRouter(<HomePage />)
    const card = screen.getByRole('link', { name: /peer community/i })
    expect(card).toHaveAttribute('href', '/community')
  })

  it('eyebrow label "Reentry, made human" is present', () => {
    renderWithRouter(<HomePage />)
    expect(screen.getByText(/Reentry, made human/i)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// JobsPage
// ---------------------------------------------------------------------------
describe('JobsPage', () => {
  it('renders the page heading', () => {
    renderWithRouter(<JobsPage />)
    expect(
      screen.getByRole('heading', { name: /fair-chance jobs hiring now/i }),
    ).toBeInTheDocument()
  })

  it('renders all jobs from data', () => {
    renderWithRouter(<JobsPage />)
    jobs.forEach((job) => {
      expect(screen.getByText(job.title)).toBeInTheDocument()
    })
  })

  it('renders company names for all jobs', () => {
    renderWithRouter(<JobsPage />)
    jobs.forEach((job) => {
      expect(screen.getByText(new RegExp(job.company))).toBeInTheDocument()
    })
  })

  it('renders two-letter uppercase initials for each job logo', () => {
    renderWithRouter(<JobsPage />)
    jobs.forEach((job) => {
      const initials = job.company.slice(0, 2).toUpperCase()
      expect(screen.getByText(initials)).toBeInTheDocument()
    })
  })

  it('renders the correct number of job articles', () => {
    renderWithRouter(<JobsPage />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(jobs.length)
  })

  it('renders all tags for each job', () => {
    renderWithRouter(<JobsPage />)
    jobs.forEach((job) => {
      job.tags.forEach((tag) => {
        // Multiple jobs may share the same tag label; ensure at least one is present
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0)
      })
    })
  })

  it('renders pay information for each job', () => {
    renderWithRouter(<JobsPage />)
    jobs.forEach((job) => {
      expect(screen.getByText(job.pay)).toBeInTheDocument()
    })
  })

  it('renders an "Apply" button for each job', () => {
    renderWithRouter(<JobsPage />)
    const applyButtons = screen.getAllByRole('button', { name: /apply/i })
    expect(applyButtons).toHaveLength(jobs.length)
  })

  it('renders the eyebrow "Job board" label', () => {
    renderWithRouter(<JobsPage />)
    expect(screen.getByText(/Job board/i)).toBeInTheDocument()
  })

  it('renders location text for the first job', () => {
    renderWithRouter(<JobsPage />)
    expect(screen.getByText(/Columbus, OH/i)).toBeInTheDocument()
  })

  // Boundary / regression: pay tag and location for Remote job are displayed
  it('renders Remote location for the Customer Support Rep job', () => {
    renderWithRouter(<JobsPage />)
    const article = screen.getByText('Customer Support Rep').closest('article')!
    // Both job-meta and the tag say "Remote"; at least one should appear in the article
    expect(within(article).getAllByText(/^remote$/i).length).toBeGreaterThan(0)
  })
})

// ---------------------------------------------------------------------------
// ResourcesPage
// ---------------------------------------------------------------------------
describe('ResourcesPage', () => {
  it('renders the page heading', () => {
    renderWithRouter(<ResourcesPage />)
    expect(
      screen.getByRole('heading', { name: /support for every part of reentry/i }),
    ).toBeInTheDocument()
  })

  it('renders all resources from data', () => {
    renderWithRouter(<ResourcesPage />)
    resources.forEach((r) => {
      expect(screen.getByText(r.title)).toBeInTheDocument()
    })
  })

  it('renders all resource descriptions', () => {
    renderWithRouter(<ResourcesPage />)
    resources.forEach((r) => {
      expect(screen.getByText(r.desc)).toBeInTheDocument()
    })
  })

  it('renders all category labels', () => {
    renderWithRouter(<ResourcesPage />)
    resources.forEach((r) => {
      // multiple resources could share a category so use getAllByText
      expect(screen.getAllByText(r.category).length).toBeGreaterThan(0)
    })
  })

  it('renders the correct number of resource articles', () => {
    renderWithRouter(<ResourcesPage />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(resources.length)
  })

  it('renders a "Learn more" button for each resource', () => {
    renderWithRouter(<ResourcesPage />)
    const learnMoreButtons = screen.getAllByRole('button', { name: /learn more/i })
    expect(learnMoreButtons).toHaveLength(resources.length)
  })

  it('renders the eyebrow "Resources" label', () => {
    renderWithRouter(<ResourcesPage />)
    expect(screen.getAllByText(/^Resources$/i).length).toBeGreaterThan(0)
  })

  // Regression: Finance category renders
  it('renders Fair-Chance Banking with Finance category', () => {
    renderWithRouter(<ResourcesPage />)
    expect(screen.getByText('Fair-Chance Banking')).toBeInTheDocument()
    expect(screen.getByText('Finance')).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// CommunityPage
// ---------------------------------------------------------------------------
describe('CommunityPage', () => {
  it('renders the page heading', () => {
    renderWithRouter(<CommunityPage />)
    expect(
      screen.getByRole('heading', { name: /you're not doing this alone/i }),
    ).toBeInTheDocument()
  })

  it('renders all posts from data', () => {
    renderWithRouter(<CommunityPage />)
    posts.forEach((p) => {
      expect(screen.getByText(p.author)).toBeInTheDocument()
    })
  })

  it('renders post bodies', () => {
    renderWithRouter(<CommunityPage />)
    posts.forEach((p) => {
      expect(screen.getByText(p.body)).toBeInTheDocument()
    })
  })

  it('renders initials for each post avatar', () => {
    renderWithRouter(<CommunityPage />)
    posts.forEach((p) => {
      expect(screen.getByText(p.initials)).toBeInTheDocument()
    })
  })

  it('renders like counts for each post', () => {
    renderWithRouter(<CommunityPage />)
    posts.forEach((p) => {
      expect(screen.getByText(p.likes.toString())).toBeInTheDocument()
    })
  })

  it('renders reply counts for each post', () => {
    renderWithRouter(<CommunityPage />)
    posts.forEach((p) => {
      expect(screen.getByText(p.replies.toString())).toBeInTheDocument()
    })
  })

  it('renders time strings for each post', () => {
    renderWithRouter(<CommunityPage />)
    posts.forEach((p) => {
      expect(screen.getByText(p.time)).toBeInTheDocument()
    })
  })

  it('renders the correct number of post articles', () => {
    renderWithRouter(<CommunityPage />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(posts.length)
  })

  it('renders the eyebrow "Community" label', () => {
    renderWithRouter(<CommunityPage />)
    expect(screen.getAllByText(/^Community$/i).length).toBeGreaterThan(0)
  })

  // Regression: first post content is visible
  it('first post contains CDL mention', () => {
    renderWithRouter(<CommunityPage />)
    expect(screen.getByText(/CDL/i)).toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// LegalPage
// ---------------------------------------------------------------------------
describe('LegalPage', () => {
  it('renders the page heading', () => {
    renderWithRouter(<LegalPage />)
    expect(
      screen.getByRole('heading', { name: /clearing your record, step by step/i }),
    ).toBeInTheDocument()
  })

  it('renders all legal steps from data', () => {
    renderWithRouter(<LegalPage />)
    legalSteps.forEach((s) => {
      expect(screen.getByText(s.title)).toBeInTheDocument()
    })
  })

  it('renders all legal step descriptions', () => {
    renderWithRouter(<LegalPage />)
    legalSteps.forEach((s) => {
      expect(screen.getByText(s.desc)).toBeInTheDocument()
    })
  })

  it('renders step numbers 01–04', () => {
    renderWithRouter(<LegalPage />)
    legalSteps.forEach((s) => {
      expect(screen.getByText(s.step)).toBeInTheDocument()
    })
  })

  it('renders the "Talk to a free legal clinic" CTA section', () => {
    renderWithRouter(<LegalPage />)
    expect(
      screen.getByRole('heading', { name: /talk to a free legal clinic/i }),
    ).toBeInTheDocument()
  })

  it('renders the "Find a clinic" link pointing to /resources', () => {
    renderWithRouter(<LegalPage />)
    const link = screen.getByRole('link', { name: /find a clinic/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/resources')
  })

  it('renders the eyebrow "Legal support" label', () => {
    renderWithRouter(<LegalPage />)
    expect(screen.getAllByText(/legal support/i).length).toBeGreaterThan(0)
  })

  it('renders the correct number of step articles (4 articles for 4 steps)', () => {
    renderWithRouter(<LegalPage />)
    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(legalSteps.length)
  })

  // Regression: "free help" appears in the lede text
  it('lede mentions free help', () => {
    renderWithRouter(<LegalPage />)
    expect(screen.getByText(/free help/i)).toBeInTheDocument()
  })
})