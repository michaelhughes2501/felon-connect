import { describe, it, expect } from 'vitest'
import { jobs, resources, posts, legalSteps } from '../data'
import type { Job, Resource, Post } from '../data'

describe('data.ts – jobs', () => {
  it('exports 5 jobs', () => {
    expect(jobs).toHaveLength(5)
  })

  it('every job has the required fields with correct types', () => {
    jobs.forEach((job: Job) => {
      expect(typeof job.id).toBe('number')
      expect(typeof job.title).toBe('string')
      expect(typeof job.company).toBe('string')
      expect(typeof job.location).toBe('string')
      expect(typeof job.type).toBe('string')
      expect(typeof job.pay).toBe('string')
      expect(Array.isArray(job.tags)).toBe(true)
      expect(typeof job.color).toBe('string')
    })
  })

  it('all job ids are unique', () => {
    const ids = jobs.map((j) => j.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('every job has at least one tag', () => {
    jobs.forEach((job) => {
      expect(job.tags.length).toBeGreaterThan(0)
    })
  })

  it('all job tags are non-empty strings', () => {
    jobs.forEach((job) => {
      job.tags.forEach((tag) => {
        expect(typeof tag).toBe('string')
        expect(tag.trim().length).toBeGreaterThan(0)
      })
    })
  })

  it('all job colors are valid hex strings', () => {
    jobs.forEach((job) => {
      expect(job.color).toMatch(/^#[0-9a-fA-F]{3,8}$/)
    })
  })

  it('company names are non-empty', () => {
    jobs.forEach((job) => {
      expect(job.company.trim().length).toBeGreaterThan(0)
    })
  })

  it('first job is the Warehouse Associate at Northgate Logistics', () => {
    expect(jobs[0].title).toBe('Warehouse Associate')
    expect(jobs[0].company).toBe('Northgate Logistics')
    expect(jobs[0].location).toBe('Columbus, OH')
    expect(jobs[0].type).toBe('Full-time')
    expect(jobs[0].pay).toBe('$19–22/hr')
    expect(jobs[0].tags).toEqual(['Fair-chance', 'No degree'])
  })

  it('last job is the Customer Support Rep', () => {
    expect(jobs[4].title).toBe('Customer Support Rep')
    expect(jobs[4].company).toBe('Brightline Solutions')
    expect(jobs[4].type).toBe('Full-time')
  })

  it('CDL Truck Driver job is Contract type', () => {
    const cdl = jobs.find((j) => j.title === 'CDL Truck Driver')
    expect(cdl).toBeDefined()
    expect(cdl!.type).toBe('Contract')
    expect(cdl!.location).toBe('Remote / Regional')
  })

  it('Junior Welder job is Apprenticeship type', () => {
    const welder = jobs.find((j) => j.title === 'Junior Welder')
    expect(welder).toBeDefined()
    expect(welder!.type).toBe('Apprenticeship')
  })

  it('company.slice(0,2).toUpperCase() produces two-character initials for all jobs', () => {
    jobs.forEach((job) => {
      const initials = job.company.slice(0, 2).toUpperCase()
      expect(initials).toHaveLength(2)
      expect(initials).toBe(initials.toUpperCase())
    })
  })
})

describe('data.ts – resources', () => {
  it('exports 6 resources', () => {
    expect(resources).toHaveLength(6)
  })

  it('every resource has the required fields with correct types', () => {
    resources.forEach((r: Resource) => {
      expect(typeof r.id).toBe('number')
      expect(typeof r.title).toBe('string')
      expect(typeof r.desc).toBe('string')
      expect(typeof r.category).toBe('string')
    })
  })

  it('all resource ids are unique', () => {
    const ids = resources.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('covers expected categories', () => {
    const categories = resources.map((r) => r.category)
    expect(categories).toContain('Housing')
    expect(categories).toContain('Legal')
    expect(categories).toContain('Education')
    expect(categories).toContain('Wellness')
    expect(categories).toContain('Benefits')
    expect(categories).toContain('Finance')
  })

  it('all descriptions are non-empty strings', () => {
    resources.forEach((r) => {
      expect(r.desc.trim().length).toBeGreaterThan(0)
    })
  })

  it('Housing First Network is present with correct data', () => {
    const housing = resources.find((r) => r.title === 'Housing First Network')
    expect(housing).toBeDefined()
    expect(housing!.category).toBe('Housing')
    expect(housing!.desc).toContain('records')
  })

  it('Expungement Clinics resource is in Legal category', () => {
    const clinic = resources.find((r) => r.title === 'Expungement Clinics')
    expect(clinic).toBeDefined()
    expect(clinic!.category).toBe('Legal')
  })
})

describe('data.ts – posts', () => {
  it('exports 3 posts', () => {
    expect(posts).toHaveLength(3)
  })

  it('every post has the required fields with correct types', () => {
    posts.forEach((p: Post) => {
      expect(typeof p.id).toBe('number')
      expect(typeof p.author).toBe('string')
      expect(typeof p.initials).toBe('string')
      expect(typeof p.time).toBe('string')
      expect(typeof p.body).toBe('string')
      expect(typeof p.likes).toBe('number')
      expect(typeof p.replies).toBe('number')
      expect(typeof p.color).toBe('string')
    })
  })

  it('all post ids are unique', () => {
    const ids = posts.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('initials are exactly 2 uppercase characters', () => {
    posts.forEach((p) => {
      expect(p.initials).toHaveLength(2)
      expect(p.initials).toBe(p.initials.toUpperCase())
    })
  })

  it('likes and replies are non-negative numbers', () => {
    posts.forEach((p) => {
      expect(p.likes).toBeGreaterThanOrEqual(0)
      expect(p.replies).toBeGreaterThanOrEqual(0)
    })
  })

  it('all post colors are valid hex strings', () => {
    posts.forEach((p) => {
      expect(p.color).toMatch(/^#[0-9a-fA-F]{3,8}$/)
    })
  })

  it('post bodies are non-empty', () => {
    posts.forEach((p) => {
      expect(p.body.trim().length).toBeGreaterThan(0)
    })
  })

  it('first post author is Marcus T. with initials MT', () => {
    expect(posts[0].author).toBe('Marcus T.')
    expect(posts[0].initials).toBe('MT')
    expect(posts[0].likes).toBe(142)
    expect(posts[0].replies).toBe(28)
  })

  it('second post is from Dana R. asking about Austin housing', () => {
    expect(posts[1].author).toBe('Dana R.')
    expect(posts[1].initials).toBe('DR')
    expect(posts[1].body).toContain('Austin')
  })
})

describe('data.ts – legalSteps', () => {
  it('exports 4 legal steps', () => {
    expect(legalSteps).toHaveLength(4)
  })

  it('every step has step, title, and desc fields', () => {
    legalSteps.forEach((s) => {
      expect(typeof s.step).toBe('string')
      expect(typeof s.title).toBe('string')
      expect(typeof s.desc).toBe('string')
    })
  })

  it('step numbers are sequential strings 01–04', () => {
    const stepNums = legalSteps.map((s) => s.step)
    expect(stepNums).toEqual(['01', '02', '03', '04'])
  })

  it('titles describe the expungement process in order', () => {
    expect(legalSteps[0].title).toBe('Check eligibility')
    expect(legalSteps[1].title).toBe('Gather records')
    expect(legalSteps[2].title).toBe('File the petition')
    expect(legalSteps[3].title).toBe('Attend the hearing')
  })

  it('all descriptions are non-empty', () => {
    legalSteps.forEach((s) => {
      expect(s.desc.trim().length).toBeGreaterThan(0)
    })
  })

  it('boundary: no step has an empty step number', () => {
    legalSteps.forEach((s) => {
      expect(s.step.trim().length).toBeGreaterThan(0)
    })
  })
})