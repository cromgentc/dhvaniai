import Lead from '../models/Lead.js'

const requiredFields = ['fullName', 'email', 'mobile', 'companyName', 'service', 'budget', 'message', 'consent']

export async function createLead(req, res) {
  try {
    const missingField = requiredFields.find((field) => req.body[field] === undefined || req.body[field] === '')

    if (missingField) {
      return res.status(400).json({ success: false, message: `${missingField} is required` })
    }

    const existingLead = await Lead.findOne({
      email: String(req.body.email).toLowerCase(),
      mobile: req.body.mobile,
      service: req.body.service,
    })

    if (existingLead) {
      return res.status(409).json({
        success: false,
        message: 'A lead with this email, mobile, and selected service already exists.',
      })
    }

    const lead = await Lead.create(req.body)

    return res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      data: lead,
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map((item) => item.message).join(', ')
      return res.status(400).json({ success: false, message })
    }

    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Duplicate lead detected.' })
    }

    return res.status(500).json({ success: false, message: 'Unable to submit lead right now.' })
  }
}

export async function getAllLeads(req, res) {
  const { q = '', status = '', type = '' } = req.query
  const filter = {}

  if (status) {
    filter.status = status
  }

  if (['enterprise', 'vendor', 'freelancer'].includes(type)) {
    filter.registrationType = type
  }

  if (q) {
    filter.$or = [
      { fullName: new RegExp(q, 'i') },
      { email: new RegExp(q, 'i') },
      { mobile: new RegExp(q, 'i') },
      { service: new RegExp(q, 'i') },
      { registrationType: new RegExp(q, 'i') },
      { source: new RegExp(q, 'i') },
    ]
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 })
  return res.json({ success: true, data: leads })
}

export async function getLeadById(req, res) {
  const lead = await Lead.findById(req.params.id)

  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found' })
  }

  return res.json({ success: true, data: lead })
}

export async function updateLeadStatus(req, res) {
  const { status } = req.body

  if (!['New', 'Contacted', 'Converted', 'Rejected'].includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid lead status' })
  }

  const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true, runValidators: true })

  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found' })
  }

  return res.json({ success: true, message: 'Lead status updated', data: lead })
}

export async function deleteLead(req, res) {
  const lead = await Lead.findByIdAndDelete(req.params.id)

  if (!lead) {
    return res.status(404).json({ success: false, message: 'Lead not found' })
  }

  return res.json({ success: true, message: 'Lead deleted successfully' })
}
