import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Briefcase,
  BookOpen,
  Users,
  Scale,
  Heart,
  MessageCircle,
  MapPin,
  Sparkles,
  ShieldCheck,
  HandHeart,
  type LucideIcon,
} from 'lucide-react'
import { jobs, resources, posts, legalSteps } from './data'

export function HomePage() {
  return (
    <>
      <section className="container hero">
        <div>
          <span className="eyebrow">
            <Sparkles size={13} /> Reentry, made human
          </span>
          <h1>
            A fresh start <span className="grad">starts with a connection.</span>
          </h1>
          <p>
            Felon Connect links people returning home with fair-chance jobs, housing,
            legal help, and a community that has been there. No judgment — just a path forward.
          </p>
          <div className="hero-cta">
            <Link to="/jobs" className="btn btn-primary">
              Find fair-chance work <ArrowRight size={16} />
            </Link>
            <Link to="/community" className="btn btn-ghost">
              Join the community
            </Link>
          </div>
        </div>

        <div className="hero-art">
          <div className="stat-row">
            <div className="stat">
              <div className="num">2,400+</div>
              <div className="lbl">Members</div>
            </div>
            <div className="stat">
              <div className="num">180</div>
              <div className="lbl">Open roles</div>
            </div>
            <div className="stat">
              <div className="num">64%</div>
              <div className="lbl">Placed</div>
            </div>
          </div>
          <div className="mini-feed">
            <div className="mini-item">
              <span className="dot" style={{ background: '#5fe0c0' }} />
              Marcus just got hired as a CDL driver
            </div>
            <div className="mini-item">
              <span className="dot" style={{ background: '#f6c453' }} />
              New expungement clinic added in Texas
            </div>
            <div className="mini-item">
              <span className="dot" style={{ background: '#4f8cff' }} />
              12 fair-chance jobs posted this week
            </div>
          </div>
        </div>
      </section>

      <section className="container page" style={{ paddingTop: '1.5rem' }}>
        <div className="section-head">
          <h2 className="page-title">Everything you need to land on your feet</h2>
          <p className="lede">
            Built with reentry organizations and people with lived experience.
          </p>
        </div>
        <div className="grid grid-3">
          <FeatureCard
            to="/jobs"
            Icon={Briefcase}
            title="Fair-chance jobs"
            desc="Employers who hire on skills and character, not your record."
          />
          <FeatureCard
            to="/resources"
            Icon={BookOpen}
            title="Reentry resources"
            desc="Housing, benefits, recovery, and education — all in one place."
          />
          <FeatureCard
            to="/community"
            Icon={Users}
            title="Peer community"
            desc="Mentors and members who get it, ready to share what worked."
          />
          <FeatureCard
            to="/legal"
            Icon={Scale}
            title="Legal support"
            desc="Step-by-step help with expungement and record sealing."
          />
          <FeatureCard
            to="/resources"
            Icon={HandHeart}
            title="Wellness & support"
            desc="Peer recovery groups and mental-health navigation."
          />
          <FeatureCard
            to="/jobs"
            Icon={ShieldCheck}
            title="Verified employers"
            desc="Every listing is screened for fair-chance commitments."
          />
        </div>
      </section>
    </>
  )
}

function FeatureCard({
  to,
  Icon,
  title,
  desc,
}: {
  to: string
  Icon: LucideIcon
  title: string
  desc: string
}) {
  return (
    <Link to={to} className="card interactive" style={{ textDecoration: 'none' }}>
      <div className="card-icon">
        <Icon size={20} />
      </div>
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  )
}

export function JobsPage() {
  return (
    <section className="container page">
      <div className="section-head">
        <span className="eyebrow">
          <Briefcase size={13} /> Job board
        </span>
        <h1 className="page-title">Fair-chance jobs hiring now</h1>
        <p className="lede">
          Every employer here has committed to considering applicants with records.
        </p>
      </div>
      <div className="list">
        {jobs.map((job) => (
          <article className="job" key={job.id}>
            <div className="job-logo" style={{ background: job.color }}>
              {job.company.slice(0, 2).toUpperCase()}
            </div>
            <div className="job-main">
              <h3>{job.title}</h3>
              <div className="job-meta">
                {job.company} · <MapPin size={12} style={{ verticalAlign: -1 }} /> {job.location} · {job.type}
              </div>
              <div className="tags">
                {job.tags.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
                <span className="tag amber">{job.pay}</span>
              </div>
            </div>
            <button className="btn btn-primary">
              Apply <ArrowRight size={15} />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ResourcesPage() {
  return (
    <section className="container page">
      <div className="section-head">
        <span className="eyebrow">
          <BookOpen size={13} /> Resources
        </span>
        <h1 className="page-title">Support for every part of reentry</h1>
        <p className="lede">
          Curated programs that work with people who have a record.
        </p>
      </div>
      <div className="grid grid-3">
        {resources.map((r) => (
          <article className="card interactive" key={r.id}>
            <span className="tag" style={{ marginBottom: '0.7rem', display: 'inline-block' }}>
              {r.category}
            </span>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <div style={{ marginTop: '0.9rem' }}>
              <button className="btn btn-ghost" style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}>
                Learn more <ArrowRight size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function CommunityPage() {
  return (
    <section className="container page">
      <div className="section-head">
        <span className="eyebrow">
          <Users size={13} /> Community
        </span>
        <h1 className="page-title">You're not doing this alone</h1>
        <p className="lede">Real stories and real questions from members on the journey.</p>
      </div>
      <div className="list" style={{ maxWidth: 720 }}>
        {posts.map((p) => (
          <article className="post" key={p.id}>
            <div className="post-head">
              <div className="avatar" style={{ background: p.color }}>
                {p.initials}
              </div>
              <div>
                <div className="post-author">{p.author}</div>
                <div className="post-time">{p.time}</div>
              </div>
            </div>
            <p style={{ margin: 0, color: 'var(--text)' }}>{p.body}</p>
            <div className="post-actions">
              <span>
                <Heart size={15} /> {p.likes}
              </span>
              <span>
                <MessageCircle size={15} /> {p.replies}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function LegalPage() {
  return (
    <section className="container page">
      <div className="section-head">
        <span className="eyebrow">
          <Scale size={13} /> Legal support
        </span>
        <h1 className="page-title">Clearing your record, step by step</h1>
        <p className="lede">
          Expungement can reopen doors. Here's how the process works — and where to get free help.
        </p>
      </div>
      <div className="grid grid-2">
        {legalSteps.map((s) => (
          <article className="card" key={s.step}>
            <div
              className="card-icon"
              style={{ background: 'rgba(95,224,192,0.14)', color: 'var(--accent)' }}
            >
              {s.step}
            </div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </article>
        ))}
      </div>
      <div className="card" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <Scale size={28} style={{ color: 'var(--primary)' }} />
        <div style={{ flex: 1, minWidth: 220 }}>
          <h3>Talk to a free legal clinic</h3>
          <p>We'll match you with a partner clinic in your state.</p>
        </div>
        <Link to="/resources" className="btn btn-primary">
          Find a clinic <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}
