import Application from '../models/Application.js'
import Job from '../models/Job.js'
import { sanitizeContent, slugify } from '../utils/sanitizeContent.js'

const jobStatuses = ['Open', 'Closed', 'Draft', 'Urgent Hiring']
const applicationStatuses = ['New', 'Shortlisted', 'Interview', 'Selected', 'Rejected']

function csvToSkills(value) {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean)
  return String(value || '').split(',').map((item) => item.trim()).filter(Boolean)
}

function cleanJobPayload(body, email = 'admin') {
  return {
    title: String(body.title || '').trim(),
    slug: slugify(body.slug || body.title),
    department: String(body.department || '').trim(),
    location: String(body.location || '').trim(),
    workMode: body.workMode || 'On-site',
    jobType: body.jobType || 'Full-time',
    experienceLevel: String(body.experienceLevel || '').trim(),
    minExperience: Number(body.minExperience || 0),
    maxExperience: Number(body.maxExperience || 0),
    salaryMin: Number(body.salaryMin || 0),
    salaryMax: Number(body.salaryMax || 0),
    openings: Number(body.openings || 1),
    skills: csvToSkills(body.skills),
    shortDescription: sanitizeContent(body.shortDescription || ''),
    fullDescription: sanitizeContent(body.fullDescription || ''),
    responsibilities: sanitizeContent(body.responsibilities || ''),
    requirements: sanitizeContent(body.requirements || ''),
    education: sanitizeContent(body.education || ''),
    benefits: sanitizeContent(body.benefits || ''),
    applicationDeadline: body.applicationDeadline,
    status: jobStatuses.includes(body.status) ? body.status : 'Draft',
    postedBy: email,
  }
}

function handleError(res, error) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: Object.values(error.errors).map((item) => item.message).join(', ') })
  }
  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: 'Duplicate record detected.' })
  }
  return res.status(500).json({ success: false, message: 'Unable to process request.' })
}

export async function getOpenJobs(req, res) {
  const { q = '', department = '', jobType = '', location = '', experienceLevel = '', workMode = '', status = '' } = req.query
  const filter = { status: { $in: ['Open', 'Urgent Hiring'] } }

  if (department) filter.department = department
  if (jobType) filter.jobType = jobType
  if (location) filter.location = location
  if (experienceLevel) filter.experienceLevel = experienceLevel
  if (workMode) filter.workMode = workMode
  if (['Open', 'Urgent Hiring'].includes(status)) filter.status = status
  if (q) {
    filter.$or = [
      { title: new RegExp(q, 'i') },
      { skills: new RegExp(q, 'i') },
      { location: new RegExp(q, 'i') },
      { department: new RegExp(q, 'i') },
    ]
  }

  const jobs = await Job.find(filter).sort({ status: -1, createdAt: -1 })
  return res.json({ success: true, data: jobs })
}

export async function getJobBySlug(req, res) {
  const job = await Job.findOne({ slug: slugify(req.params.slug), status: { $in: ['Open', 'Urgent Hiring'] } })
  if (!job) return res.status(404).json({ success: false, message: 'Open job not found' })
  return res.json({ success: true, data: job })
}

export async function createJob(req, res) {
  try {
    const payload = cleanJobPayload(req.body, req.user?.email)
    if (!payload.title || !payload.department || !payload.fullDescription || !payload.shortDescription) {
      return res.status(400).json({ success: false, message: 'Title, department, short description, and full description are required.' })
    }
    const job = await Job.create(payload)
    return res.status(201).json({ success: true, message: 'Job created successfully', data: job })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function getAllJobs(req, res) {
  const { q = '', status = '', department = '' } = req.query
  const filter = {}
  if (jobStatuses.includes(status)) filter.status = status
  if (department) filter.department = department
  if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { slug: new RegExp(q, 'i') }, { location: new RegExp(q, 'i') }, { skills: new RegExp(q, 'i') }]
  const jobs = await Job.find(filter).sort({ updatedAt: -1 })
  return res.json({ success: true, data: jobs })
}

export async function updateJob(req, res) {
  try {
    const payload = cleanJobPayload(req.body, req.user?.email)
    const duplicate = await Job.findOne({ slug: payload.slug, _id: { $ne: req.params.id } })
    if (duplicate) return res.status(409).json({ success: false, message: 'A job with this slug already exists.' })
    const job = await Job.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    if (!job) return res.status(404).json({ success: false, message: 'Job not found' })
    return res.json({ success: true, message: 'Job updated successfully', data: job })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function deleteJob(req, res) {
  const job = await Job.findByIdAndDelete(req.params.id)
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' })
  return res.json({ success: true, message: 'Job deleted successfully' })
}

export async function updateJobStatus(req, res) {
  const { status } = req.body
  if (!jobStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Invalid job status' })
  const job = await Job.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' })
  return res.json({ success: true, message: 'Job status updated', data: job })
}

export async function applyToJob(req, res) {
  try {
    const job = await Job.findById(req.body.jobId)
    if (!job || !['Open', 'Urgent Hiring'].includes(job.status)) {
      return res.status(404).json({ success: false, message: 'This job is not open for applications.' })
    }
    const application = await Application.create({ ...req.body, jobTitle: job.title })
    return res.status(201).json({ success: true, message: 'Application submitted successfully', data: application })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function getAllApplications(req, res) {
  const { q = '', status = '', jobTitle = '' } = req.query
  const filter = {}
  if (applicationStatuses.includes(status)) filter.status = status
  if (jobTitle) filter.jobTitle = new RegExp(jobTitle, 'i')
  if (q) filter.$or = [{ fullName: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }, { mobile: new RegExp(q, 'i') }]
  const applications = await Application.find(filter).sort({ appliedAt: -1 })
  return res.json({ success: true, data: applications })
}

export async function getApplicationById(req, res) {
  const application = await Application.findById(req.params.id)
  if (!application) return res.status(404).json({ success: false, message: 'Application not found' })
  return res.json({ success: true, data: application })
}

export async function updateApplicationStatus(req, res) {
  const { status } = req.body
  if (!applicationStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Invalid application status' })
  const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })
  if (!application) return res.status(404).json({ success: false, message: 'Application not found' })
  return res.json({ success: true, message: 'Application status updated', data: application })
}

export async function deleteApplication(req, res) {
  const application = await Application.findByIdAndDelete(req.params.id)
  if (!application) return res.status(404).json({ success: false, message: 'Application not found' })
  return res.json({ success: true, message: 'Application deleted successfully' })
}
