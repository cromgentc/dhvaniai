import AdminRecord from '../models/AdminRecord.js'

const allowedStatuses = ['Active', 'Pending', 'Approved', 'Rejected', 'Inactive']

function cleanPayload(body) {
  return {
    name: String(body.name || '').trim(),
    emailOrId: String(body.emailOrId || '').trim(),
    role: String(body.role || 'Vendor').trim(),
    project: String(body.project || '').trim(),
    language: String(body.language || '').trim(),
    status: allowedStatuses.includes(body.status) ? body.status : 'Active',
    score: String(body.score || '').trim(),
    notes: String(body.notes || '').trim(),
  }
}

function moduleFilter(req) {
  return { module: String(req.params.module || '').trim() }
}

export async function getAdminRecords(req, res) {
  const { q = '', status = '' } = req.query
  const filter = moduleFilter(req)

  if (!filter.module) return res.status(400).json({ success: false, message: 'Module is required' })
  if (allowedStatuses.includes(status)) filter.status = status
  if (q) {
    filter.$or = [
      { name: new RegExp(q, 'i') },
      { emailOrId: new RegExp(q, 'i') },
      { role: new RegExp(q, 'i') },
      { project: new RegExp(q, 'i') },
      { language: new RegExp(q, 'i') },
      { notes: new RegExp(q, 'i') },
    ]
  }

  const records = await AdminRecord.find(filter).sort({ createdAt: -1 })
  return res.json({ success: true, data: records })
}

export async function createAdminRecord(req, res) {
  const module = String(req.params.module || '').trim()
  const payload = cleanPayload(req.body)

  if (!module) return res.status(400).json({ success: false, message: 'Module is required' })
  if (!payload.name) return res.status(400).json({ success: false, message: 'Name is required' })

  const record = await AdminRecord.create({
    module,
    ...payload,
    createdBy: req.user?.email || 'system',
    updatedBy: req.user?.email || 'system',
  })

  return res.status(201).json({ success: true, message: 'Record created successfully', data: record })
}

export async function updateAdminRecord(req, res) {
  const payload = cleanPayload(req.body)

  if (!payload.name) return res.status(400).json({ success: false, message: 'Name is required' })

  const record = await AdminRecord.findOneAndUpdate(
    { _id: req.params.id, ...moduleFilter(req) },
    { ...payload, updatedBy: req.user?.email || 'system' },
    { new: true, runValidators: true },
  )

  if (!record) return res.status(404).json({ success: false, message: 'Record not found' })
  return res.json({ success: true, message: 'Record updated successfully', data: record })
}

export async function deleteAdminRecord(req, res) {
  const record = await AdminRecord.findOneAndDelete({ _id: req.params.id, ...moduleFilter(req) })
  if (!record) return res.status(404).json({ success: false, message: 'Record not found' })
  return res.json({ success: true, message: 'Record deleted successfully' })
}
