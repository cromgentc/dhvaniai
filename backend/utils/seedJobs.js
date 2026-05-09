import Job from '../models/Job.js'

const deadline = new Date()
deadline.setDate(deadline.getDate() + 45)

const defaultJobs = [
  {
    title: 'AI Data Operations Executive',
    slug: 'ai-data-operations-executive',
    department: 'Data Collection',
    location: 'Noida',
    workMode: 'Hybrid',
    jobType: 'Full-time',
    experienceLevel: 'Entry Level',
    minExperience: 0,
    maxExperience: 2,
    salaryMin: 250000,
    salaryMax: 420000,
    openings: 8,
    skills: ['Data Collection', 'Excel', 'Communication', 'Quality Review'],
    shortDescription: 'Coordinate AI data collection workflows, vendor follow-ups, quality checks, and daily delivery reporting.',
    fullDescription: 'You will support enterprise AI data collection projects across speech, image, document, and language datasets while coordinating contributors and internal QA teams.',
    responsibilities: 'Track daily data collection targets.\nCoordinate with vendors and freelancers.\nValidate submissions against project guidelines.\nPrepare delivery reports and escalation notes.',
    requirements: 'Strong communication skills.\nComfortable with spreadsheets and project trackers.\nAttention to detail and deadline ownership.',
    education: 'Graduate in any discipline. Technical or analytics exposure is preferred.',
    benefits: 'Learning budget, performance incentives, flexible hybrid setup, and fast growth path.',
    applicationDeadline: deadline,
    status: 'Urgent Hiring',
    postedBy: 'system',
  },
  {
    title: 'React Frontend Developer',
    slug: 'react-frontend-developer',
    department: 'Technology',
    location: 'Remote',
    workMode: 'Remote',
    jobType: 'Full-time',
    experienceLevel: 'Mid Level',
    minExperience: 2,
    maxExperience: 5,
    salaryMin: 600000,
    salaryMax: 1200000,
    openings: 2,
    skills: ['React', 'Tailwind CSS', 'API Integration', 'Framer Motion'],
    shortDescription: 'Build polished enterprise dashboards, public pages, and internal tools for AI and data operations.',
    fullDescription: 'Own frontend interfaces across customer-facing and admin products with high attention to performance, accessibility, and interaction design.',
    responsibilities: 'Build reusable React components.\nIntegrate REST APIs.\nCollaborate with backend and operations teams.\nImprove dashboard performance and UX.',
    requirements: 'Strong React fundamentals.\nExperience with Tailwind CSS.\nAbility to translate business workflows into clean interfaces.',
    education: 'B.Tech, MCA, or equivalent practical experience.',
    benefits: 'Remote work, modern stack, mentorship, paid leaves, and growth-oriented projects.',
    applicationDeadline: deadline,
    status: 'Open',
    postedBy: 'system',
  },
]

export async function seedJobs() {
  await Promise.all(defaultJobs.map((job) => Job.updateOne({ slug: job.slug }, { $setOnInsert: job }, { upsert: true })))
}
