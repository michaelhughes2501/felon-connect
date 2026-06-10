export type Job = {
  id: number
  title: string
  company: string
  location: string
  type: string
  pay: string
  tags: string[]
  color: string
}

export type Resource = {
  id: number
  title: string
  desc: string
  category: string
}

export type Post = {
  id: number
  author: string
  initials: string
  time: string
  body: string
  likes: number
  replies: number
  color: string
}

export const jobs: Job[] = [
  {
    id: 1,
    title: 'Warehouse Associate',
    company: 'Northgate Logistics',
    location: 'Columbus, OH',
    type: 'Full-time',
    pay: '$19–22/hr',
    tags: ['Fair-chance', 'No degree'],
    color: '#4f8cff',
  },
  {
    id: 2,
    title: 'Line Cook',
    company: 'Second Plate Kitchen',
    location: 'Austin, TX',
    type: 'Full-time',
    pay: '$18/hr + tips',
    tags: ['Fair-chance', 'Training provided'],
    color: '#5fe0c0',
  },
  {
    id: 3,
    title: 'CDL Truck Driver',
    company: 'Open Road Freight',
    location: 'Remote / Regional',
    type: 'Contract',
    pay: '$1,400/wk',
    tags: ['Fair-chance', 'Benefits'],
    color: '#f6c453',
  },
  {
    id: 4,
    title: 'Junior Welder',
    company: 'Ironworks Fab Co.',
    location: 'Pittsburgh, PA',
    type: 'Apprenticeship',
    pay: '$17–24/hr',
    tags: ['Apprenticeship', 'No degree'],
    color: '#ff6b6b',
  },
  {
    id: 5,
    title: 'Customer Support Rep',
    company: 'Brightline Solutions',
    location: 'Remote',
    type: 'Full-time',
    pay: '$20/hr',
    tags: ['Remote', 'Fair-chance'],
    color: '#a78bfa',
  },
]

export const resources: Resource[] = [
  { id: 1, title: 'Housing First Network', desc: 'Transitional and supportive housing programs that accept records.', category: 'Housing' },
  { id: 2, title: 'Expungement Clinics', desc: 'Free legal help to seal or clear eligible convictions.', category: 'Legal' },
  { id: 3, title: 'Skill-Up Vocational Grants', desc: 'Funded trade certifications in HVAC, welding, and CDL.', category: 'Education' },
  { id: 4, title: 'Peer Recovery Support', desc: 'Mentors and group support for staying grounded after release.', category: 'Wellness' },
  { id: 5, title: 'Benefits Navigator', desc: 'Walkthrough for SNAP, Medicaid, and ID document recovery.', category: 'Benefits' },
  { id: 6, title: 'Fair-Chance Banking', desc: 'Second-chance checking accounts with no credit barriers.', category: 'Finance' },
]

export const posts: Post[] = [
  {
    id: 1,
    author: 'Marcus T.',
    initials: 'MT',
    time: '2h ago',
    body: 'Six months out and I just got my CDL. To anyone still inside or fresh out — it is possible. Stack the small wins.',
    likes: 142,
    replies: 28,
    color: '#5fe0c0',
  },
  {
    id: 2,
    author: 'Dana R.',
    initials: 'DR',
    time: '5h ago',
    body: 'Anyone in the Austin area know a landlord who works with records? Got a job lined up, just need a place close to the bus line.',
    likes: 37,
    replies: 14,
    color: '#f6c453',
  },
  {
    id: 3,
    author: 'James K.',
    initials: 'JK',
    time: '1d ago',
    body: 'Finished the expungement clinic paperwork today. The volunteers walked me through every form. Sharing the link in the resources tab.',
    likes: 89,
    replies: 9,
    color: '#4f8cff',
  },
]

export const legalSteps = [
  { step: '01', title: 'Check eligibility', desc: 'Find out which convictions can be sealed or expunged in your state.' },
  { step: '02', title: 'Gather records', desc: 'Pull your case numbers, disposition dates, and court of jurisdiction.' },
  { step: '03', title: 'File the petition', desc: 'Submit the correct forms — clinics can review them with you for free.' },
  { step: '04', title: 'Attend the hearing', desc: 'Show up prepared; we provide a checklist and practice questions.' },
]
