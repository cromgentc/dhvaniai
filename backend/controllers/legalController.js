import LegalPage from '../models/LegalPage.js'
import { sanitizeContent, slugify } from '../utils/sanitizeContent.js'

const allowedStatuses = ['Draft', 'Published']

function cleanPayload(body, userEmail = 'admin') {
  const slug = slugify(body.slug || body.title)

  return {
    title: String(body.title || '').trim(),
    slug,
    shortDescription: String(body.shortDescription || '').trim(),
    seoTitle: String(body.seoTitle || '').trim(),
    metaDescription: String(body.metaDescription || '').trim(),
    content: sanitizeContent(body.content || ''),
    status: allowedStatuses.includes(body.status) ? body.status : 'Draft',
    updatedBy: userEmail,
  }
}

function handleError(res, error) {
  if (error.name === 'ValidationError') {
    const message = Object.values(error.errors).map((item) => item.message).join(', ')
    return res.status(400).json({ success: false, message })
  }

  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: 'A legal page with this slug already exists.' })
  }

  return res.status(500).json({ success: false, message: 'Unable to process legal page request.' })
}

export async function createLegalPage(req, res) {
  try {
    const payload = cleanPayload(req.body, req.user?.email)
    payload.createdBy = req.user?.email || 'admin'

    if (!payload.title || !payload.content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' })
    }

    const exists = await LegalPage.findOne({ slug: payload.slug })
    if (exists) {
      return res.status(409).json({ success: false, message: 'A legal page with this slug already exists.' })
    }

    const page = await LegalPage.create(payload)
    return res.status(201).json({ success: true, message: 'Legal page created successfully', data: page })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function getAllLegalPages(req, res) {
  const { q = '', status = '' } = req.query
  const filter = {}

  if (allowedStatuses.includes(status)) filter.status = status

  if (q) {
    filter.$or = [
      { title: new RegExp(q, 'i') },
      { slug: new RegExp(q, 'i') },
      { shortDescription: new RegExp(q, 'i') },
      { seoTitle: new RegExp(q, 'i') },
    ]
  }

  const pages = await LegalPage.find(filter).sort({ updatedAt: -1 })
  return res.json({ success: true, data: pages })
}

export async function getLegalPageBySlug(req, res) {
  const page = await LegalPage.findOne({ slug: slugify(req.params.slug), status: 'Published' })

  if (!page) {
    return res.status(404).json({ success: false, message: 'Published legal page not found' })
  }

  return res.json({ success: true, data: page })
}

export async function updateLegalPage(req, res) {
  try {
    const payload = cleanPayload(req.body, req.user?.email)

    if (!payload.title || !payload.content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' })
    }

    const duplicate = await LegalPage.findOne({ slug: payload.slug, _id: { $ne: req.params.id } })
    if (duplicate) {
      return res.status(409).json({ success: false, message: 'A legal page with this slug already exists.' })
    }

    const page = await LegalPage.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true })
    if (!page) {
      return res.status(404).json({ success: false, message: 'Legal page not found' })
    }

    return res.json({ success: true, message: 'Legal page updated successfully', data: page })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function deleteLegalPage(req, res) {
  const page = await LegalPage.findByIdAndDelete(req.params.id)

  if (!page) {
    return res.status(404).json({ success: false, message: 'Legal page not found' })
  }

  return res.json({ success: true, message: 'Legal page deleted successfully' })
}

export async function updateLegalPageStatus(req, res) {
  const { status } = req.body

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid legal page status' })
  }

  const page = await LegalPage.findByIdAndUpdate(
    req.params.id,
    { status, updatedBy: req.user?.email || 'admin' },
    { new: true, runValidators: true },
  )

  if (!page) {
    return res.status(404).json({ success: false, message: 'Legal page not found' })
  }

  return res.json({ success: true, message: `Legal page ${status.toLowerCase()}`, data: page })
}
