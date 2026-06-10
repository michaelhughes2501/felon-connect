import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Home, Briefcase, BookOpen, Users, Scale, Menu, X, Link2 } from 'lucide-react'
import { HomePage, JobsPage, ResourcesPage, CommunityPage, LegalPage } from './pages'

const nav = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/jobs', label: 'Jobs', Icon: Briefcase },
  { to: '/resources', label: 'Resources', Icon: BookOpen },
  { to: '/community', label: 'Community', Icon: Users },
  { to: '/legal', label: 'Legal', Icon: Scale },
]

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav">
      <div className="container nav-inner">
        <NavLink to="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
          <span className="brand-mark">
            <Link2 size={18} />
          </span>
          Felon Connect
        </NavLink>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>

        <nav className={`nav-links ${open ? '' : 'closed'}`}>
          {nav.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container footer">
        <span>© {new Date().getFullYear()} Felon Connect · Reentry support, built with dignity.</span>
        <span>Made for second chances.</span>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/legal" element={<LegalPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
