import ContactSettings from '../models/ContactSettings.js'
import SocialLink from '../models/SocialLink.js'

const defaultContact = {
  email: 'hello@dhvani.ai',
  phone: '+91 98765 43210',
  address: 'Noida, Uttar Pradesh, India',
  googleMapUrl: 'https://www.google.com/maps/search/?api=1&query=Noida%2C%20Uttar%20Pradesh%2C%20India',
  supportEmail: 'hello@dhvani.ai',
  salesEmail: 'hello@dhvani.ai',
}

function handleError(res, error) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: Object.values(error.errors).map((item) => item.message).join(', ') })
  }
  if (error.code === 11000) return res.status(409).json({ success: false, message: 'Social platform already exists.' })
  return res.status(500).json({ success: false, message: 'Unable to process settings request.' })
}

async function getContactDocument() {
  let contact = await ContactSettings.findOne().sort({ createdAt: 1 })
  if (!contact) contact = await ContactSettings.create(defaultContact)
  return contact
}

export async function getPublicContact(req, res) {
  const contact = await getContactDocument()
  return res.json({ success: true, data: contact })
}

export async function updateContact(req, res) {
  try {
    const payload = {
      email: String(req.body.email || '').trim(),
      phone: String(req.body.phone || '').trim(),
      address: String(req.body.address || '').trim(),
      googleMapUrl: String(req.body.googleMapUrl || '').trim(),
      supportEmail: String(req.body.supportEmail || '').trim(),
      salesEmail: String(req.body.salesEmail || '').trim(),
      updatedBy: req.user?.email || 'admin',
    }

    if (!payload.email || !payload.phone || !payload.address) {
      return res.status(400).json({ success: false, message: 'Email, phone, and address are required.' })
    }
    if (payload.googleMapUrl && !/^https?:\/\/.+/i.test(payload.googleMapUrl)) {
      return res.status(400).json({ success: false, message: 'Valid Google Maps URL is required.' })
    }

    const existing = await getContactDocument()
    const contact = await ContactSettings.findByIdAndUpdate(existing._id, payload, { new: true, runValidators: true })
    return res.json({ success: true, message: 'Contact settings updated', data: contact })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function getPublicSocialLinks(req, res) {
  const links = await SocialLink.find({ status: 'Active' }).sort({ sortOrder: 1, platformName: 1 })
  return res.json({ success: true, data: links })
}

export async function getAdminSocialLinks(req, res) {
  const links = await SocialLink.find().sort({ sortOrder: 1, platformName: 1 })
  return res.json({ success: true, data: links })
}

export async function createSocialLink(req, res) {
  try {
    const link = await SocialLink.create({ ...req.body, createdBy: req.user?.email || 'admin', updatedBy: req.user?.email || 'admin' })
    return res.status(201).json({ success: true, message: 'Social link created', data: link })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function updateSocialLink(req, res) {
  try {
    const link = await SocialLink.findByIdAndUpdate(req.params.id, { ...req.body, updatedBy: req.user?.email || 'admin' }, { new: true, runValidators: true })
    if (!link) return res.status(404).json({ success: false, message: 'Social link not found' })
    return res.json({ success: true, message: 'Social link updated', data: link })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function deleteSocialLink(req, res) {
  const link = await SocialLink.findByIdAndDelete(req.params.id)
  if (!link) return res.status(404).json({ success: false, message: 'Social link not found' })
  return res.json({ success: true, message: 'Social link deleted' })
}

export async function updateSocialLinkStatus(req, res) {
  if (!['Active', 'Inactive'].includes(req.body.status)) return res.status(400).json({ success: false, message: 'Invalid status' })
  const link = await SocialLink.findByIdAndUpdate(req.params.id, { status: req.body.status, updatedBy: req.user?.email || 'admin' }, { new: true, runValidators: true })
  if (!link) return res.status(404).json({ success: false, message: 'Social link not found' })
  return res.json({ success: true, message: 'Social link status updated', data: link })
}
