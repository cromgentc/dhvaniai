import AdminRecord from '../models/AdminRecord.js'
import User from '../models/User.js'

const allowedStatuses = ['Active', 'Pending', 'Approved', 'Rejected', 'Inactive']
const loginModules = {
  vendors: 'Vendor',
  'dc-team': 'QC Team',
}

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

async function syncLoginUser(module, payload, actorEmail, existingRecord = null) {
  const role = loginModules[module]
  if (!role) return null

  if (!/^\S+@\S+\.\S+$/.test(payload.emailOrId)) {
    throw new Error('Valid login email is required.')
  }

  if (!existingRecord?.userId && !payload.password) {
    throw new Error('Password is required to create login access.')
  }

  const existingUser = existingRecord?.userId ? await User.findById(existingRecord.userId).select('+passwordHash +passwordSalt') : await User.findOne({ email: payload.emailOrId.toLowerCase() }).select('+passwordHash +passwordSalt')
  const user = existingUser || new User({
    email: payload.emailOrId,
    role,
    status: 'Active',
    createdBy: actorEmail,
  })

  user.name = payload.name
  user.email = payload.emailOrId
  user.role = role
  user.status = payload.status === 'Inactive' ? 'Inactive' : 'Active'
  user.updatedBy = actorEmail
  if (payload.password) user.setPassword(payload.password)

  await user.save()
  return user._id
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
  payload.password = String(req.body.password || '')

  if (!module) return res.status(400).json({ success: false, message: 'Module is required' })
  if (!payload.name) return res.status(400).json({ success: false, message: 'Name is required' })
  const actorEmail = req.user?.email || 'system'
  let userId = null

  try {
    userId = await syncLoginUser(module, payload, actorEmail)
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
  delete payload.password

  const record = await AdminRecord.create({
    module,
    ...payload,
    userId,
    createdBy: actorEmail,
    updatedBy: actorEmail,
  })

  return res.status(201).json({ success: true, message: 'Record created successfully', data: record })
}

export async function updateAdminRecord(req, res) {
  const payload = cleanPayload(req.body)
  payload.password = String(req.body.password || '')

  if (!payload.name) return res.status(400).json({ success: false, message: 'Name is required' })
  const existingRecord = await AdminRecord.findOne({ _id: req.params.id, ...moduleFilter(req) })
  if (!existingRecord) return res.status(404).json({ success: false, message: 'Record not found' })
  const actorEmail = req.user?.email || 'system'
  let userId = existingRecord.userId

  try {
    userId = await syncLoginUser(existingRecord.module, payload, actorEmail, existingRecord)
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
  delete payload.password

  const record = await AdminRecord.findOneAndUpdate(
    { _id: req.params.id, ...moduleFilter(req) },
    { ...payload, userId, updatedBy: actorEmail },
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
