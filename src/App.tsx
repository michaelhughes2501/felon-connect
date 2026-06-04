import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { Home, Briefcase, BookOpen, Users, Scale } from 'lucide-react'

const nav = [
  { to: '/',         label: 'Home',       Icon: Home },
  { to: '/jobs',     label: 'Jobs',       Icon: Briefcase },
  { to: '/resources',label: 'Resources',  Icon: BookOpen },
  { to: '/community',label: 'Community',  Icon: Users },
  { to: '/legal',    label: 'Legal',      Icon: Scale },
]

function Placeholder({ title }: { title: string }) {
  return (
    <main style={{ padding: '2rem', maxWidth: 640, margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h1>
      <p style={{ color: '#666' }}>Coming soon.</p>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{
        display: 'flex', gap: '1rem', padding: '0.75rem 1.5rem',
        borderBottom: '1px solid #e5e7eb', background: '#fff',
      }}>
        <span style={{ fontWeight: 700, marginRight: 'auto', color: '#1d4ed8' }}>Felon Connect</span>
        {nav.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              textDecoration: 'none', fontSize: '0.875rem',
              color: isActive ? '#1d4ed8' : '#374151',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      <Routes>
        <Route path="/"          element={<Placeholder title="Welcome to Felon Connect" />} />
        <Route path="/jobs"      element={<Placeholder title="Job Board" />} />
        <Route path="/resources" element={<Placeholder title="Resources" />} />
        <Route path="/community" element={<Placeholder title="Community" />} />
        <Route path="/legal"     element={<Placeholder title="Legal Support" />} />
      </Routes>
    </BrowserRouter>
  )
}
