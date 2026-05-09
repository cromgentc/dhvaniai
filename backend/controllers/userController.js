import User from '../models/User.js'

const allowedRoles = ['Admin', 'Manager', 'Vendor', 'QC Team']
const allowedStatuses = ['Active', 'Inactive']

function publicUser(user) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
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

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' })
    }
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role.' })
    }

    const user = new User({
      name,
      email,
      role,
      status: allowedStatuses.includes(status) ? status : 'Active',
      createdBy: req.user?.email || 'admin',
      updatedBy: req.user?.email || 'admin',
    })
    user.setPassword(password)
    await user.save()

    return res.status(201).json({ success: true, message: 'User created successfully', data: publicUser(user) })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function getAllUsers(req, res) {
  const { q = '', role = '', status = '' } = req.query
  const filter = {}

  if (allowedRoles.includes(role)) filter.role = role
  if (allowedStatuses.includes(status)) filter.status = status
  if (q) {
    filter.$or = [
      { name: new RegExp(q, 'i') },
      { email: new RegExp(q, 'i') },
      { role: new RegExp(q, 'i') },
    ]
  }

  const users = await User.find(filter).sort({ createdAt: -1 })
  return res.json({ success: true, data: users.map(publicUser) })
}

export async function getUserById(req, res) {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  return res.json({ success: true, data: publicUser(user) })
}

export async function updateUser(req, res) {
  try {
    const user = await User.findById(req.params.id).select('+passwordHash +passwordSalt')
    if (!user) return res.status(404).json({ success: false, message: 'User not found' })

    const { name, email, password, role, status } = req.body
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
    if (password) user.setPassword(password)
    user.updatedBy = req.user?.email || 'admin'

    await user.save()
    return res.json({ success: true, message: 'User updated successfully', data: publicUser(user) })
  } catch (error) {
    return handleError(res, error)
  }
}

export async function updateUserStatus(req, res) {
  const { status } = req.body
  if (!allowedStatuses.includes(status)) return res.status(400).json({ success: false, message: 'Invalid status.' })

  const user = await User.findByIdAndUpdate(req.params.id, { status, updatedBy: req.user?.email || 'admin' }, { new: true, runValidators: true })
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  return res.json({ success: true, message: 'User status updated', data: publicUser(user) })
}

export async function deleteUser(req, res) {
  const user = await User.findByIdAndDelete(req.params.id)
  if (!user) return res.status(404).json({ success: false, message: 'User not found' })
  return res.json({ success: true, message: 'User deleted successfully' })
}
