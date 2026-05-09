import User from '../models/User.js'

const allowedRoles = ['Admin', 'Manager', 'Vendor', 'QC Team']
const allowedStatuses = ['Active', 'Inactive']

function publicUser(user) {
  const manager = user.managerId
  const vendor = user.vendorId
  return {
    _id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    managerId: manager ? String(manager._id || manager) : '',
    vendorId: vendor ? String(vendor._id || vendor) : '',
    managerName: manager?.name || '',
    vendorName: vendor?.name || '',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

function appRole(req) {
  return req.user?.appRole || (req.user?.role === 'admin' ? 'Admin' : '')
}

function userId(req) {
  return req.user?.id
}

function scopedUserFilter(req) {
  const role = appRole(req)
  const id = userId(req)

  if (role === 'Admin') return {}
  if (role === 'Manager') return { $or: [{ _id: id }, { managerId: id }] }
  if (role === 'Vendor') return { $or: [{ _id: id }, { vendorId: id }] }
  return { _id: id }
}

function canCreateRole(actorRole, targetRole) {
  if (actorRole === 'Admin') return true
  if (actorRole === 'Manager') return ['Vendor', 'QC Team'].includes(targetRole)
  if (actorRole === 'Vendor') return targetRole === 'QC Team'
  return false
}

async function resolveAssignments(req, role, body) {
  const actorRole = appRole(req)
  const actorId = userId(req)
  let managerId = body.managerId || null
  let vendorId = body.vendorId || null

  if (role === 'Admin' || role === 'Manager') {
    managerId = null
    vendorId = null
  }

  if (actorRole === 'Manager' && role !== 'Manager') {
    managerId = actorId
    if (vendorId) {
      const vendor = await User.findOne({ _id: vendorId, role: 'Vendor', managerId: actorId })
      if (!vendor) throw new Error('Selected vendor is not under this manager.')
    }
  }

  if (actorRole === 'Vendor') {
    vendorId = actorId
    const vendor = await User.findById(actorId)
    managerId = vendor?.managerId || null
  }

  if (vendorId) {
    const vendor = await User.findOne({ _id: vendorId, role: 'Vendor' })
    if (!vendor) throw new Error('Selected vendor is invalid.')
    managerId = vendor.managerId || managerId
  }

  if (managerId) {
    const manager = await User.findOne({ _id: managerId, role: 'Manager' })
    if (!manager) throw new Error('Selected manager is invalid.')
  }

  return { managerId, vendorId }
}

async function ensureScopedAccess(req, targetUser) {
  const visible = await User.exists({ _id: targetUser._id, ...scopedUserFilter(req) })
  return Boolean(visible)
}

function handleError(res, error) {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: Object.values(error.errors).map((item) => item.message).join(', ') })
  }
  if (error.code === 11000) {
    return res.status(409).json({ success: false, message: 'A user with this email already exists.' })
  }
  return res.status(500).json({ success: false, message: 'Unable to process user request.' })
}

export async function createUser(req, res) {
  try {
    const { name, email, password, role = 'Manager', status = 'Active' } = req.body
    const actorRole = appRole(req)

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' })
    }
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role.' })
    }
    if (!canCreateRole(actorRole, role)) {
      return res.status(403).json({ success: false, message: 'You do not have permission to create this role.' })
    }

    const assignments = await resolveAssignments(req, role, req.body)

    const user = new User({
      name,
      email,
      role,
      status: allowedStatuses.includes(status) ? status : 'Active',
      ...assignments,
      createdBy: req.user?.email || 'admin',
      updatedBy: req.user?.email || 'admin',
    })
    user.setPassword(password)
    await user.save()

    return res.status(201).json({ success: true, message: 'User created successfully', data: publicUser(user) })
  } catch (error) {
    if (error.message?.includes('Selected')) return res.status(400).json({ success: false, message: error.message })
    return handleError(res, error)
  }
}

export async function getAllUsers(req, res) {
  const { q = '', role = '', status = '' } = req.query
  const scopeFilter = scopedUserFilter(req)
  const fieldFilter = {}

  if (allowedRoles.includes(role)) fieldFilter.role = role
  if (allowedStatuses.includes(status)) fieldFilter.status = status
  if (q) {
    fieldFilter.$or = [
      { name: new RegExp(q, 'i') },
      { email: new RegExp(q, 'i') },
      { role: new RegExp(q, 'i') },
    ]
  }

  const filter = Object.keys(scopeFilter).length && Object.keys(fieldFilter).length ? { $and: [scopeFilter, fieldFilter] } : { ...scopeFilter, ...fieldFilter }
  const users = await User.find(filter).populate('managerId', 'name email').populate('vendorId', 'name email').sort({ createdAt: -1 })
  return res.json({ success: true, data: users.map(publicUser) })
}

export async function getUserById(req, res) {
  const user = await User.findOne({ _id: req.params.id, ...scopedUserFilter(req) }).populate('managerId', 'name email').populate('vendorId', 'name email')
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  return res.json({ success: true, data: publicUser(user) })
}

export async function updateUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select('+passwordHash +passwordSalt')
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })
    if (!(await ensureScopedAccess(req, user))) return res.status(403).json({ success: false, message: 'You do not have access to this user.' })

    const { name, email, password, role, status } = req.body
    const nextRole = role || user.role
    const actorRole = appRole(req)
    const updatingSelf = String(user._id) === userId(req)
    if (updatingSelf && role && role !== user.role) {
      return res.status(403).json({ success: false, message: 'You cannot change your own role.' })
    }
    if (!updatingSelf && !canCreateRole(actorRole, nextRole) && actorRole !== 'Admin') {
      return res.status(403).json({ success: false, message: 'You do not have permission to assign this role.' })
    }
    if (name !== undefined) user.name = name
    if (email !== undefined) user.email = email
    if (role !== undefined) {
      if (!allowedRoles.includes(role)) return res.status(400).json({ success: false, message: 'Invalid role.' })
      user.role = role
    }
    if (status !== undefined) {
      if (!allowedStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status.' })
      user.status = status
    }
    const assignments = await resolveAssignments(req, nextRole, req.body)
    user.managerId = assignments.managerId
    user.vendorId = assignments.vendorId
    if (password) user.setPassword(password)
    user.updatedBy = req.user?.email || 'admin'

    await user.save()
    await user.populate('managerId', 'name email')
    await user.populate('vendorId', 'name email')
    return res.json({ success: true, message: 'User updated successfully', data: publicUser(user) })
  } catch (error) {
    if (error.message?.includes('Selected')) return res.status(400).json({ success: false, message: error.message })
    return handleError(res, error)
  }
}

export async function updateUserStatus(req, res) {
  const { status } = req.body
  if (!allowedStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status.' })

  const existingUser = await User.findById(req.params.id)
  if (!existingUser) return res.status(404).json({ success: false, message: 'User not found' })
  if (!(await ensureScopedAccess(req, existingUser))) return res.status(403).json({ success: false, message: 'You do not have access to this user.' })

  const user = await User.findByIdAndUpdate(req.params.id, { status, updatedBy: req.user?.email || 'admin' }, { new: true, runValidators: true }).populate('managerId', 'name email').populate('vendorId', 'name email')
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  return res.json({ success: true, message: 'User status updated', data: publicUser(user) })
}

export async function deleteUser(req, res) {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  if (!(await ensureScopedAccess(req, user))) return res.status(403).json({ success: false, message: 'You do not have access to this user.' })
  await User.findByIdAndDelete(req.params.id)
  return res.json({ success: true, message: 'User deleted successfully' })
}
