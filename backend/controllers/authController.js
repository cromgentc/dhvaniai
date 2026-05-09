import { createToken } from '../utils/authToken.js'
import User from '../models/User.js'

export async function adminLogin(req, res) {
  const email = String(req.body.email || '').toLowerCase().trim()
  const { password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' })
  }

  const user = await User.findOne({ email }).select('+passwordHash +passwordSalt')

  if (!user || user.status !== 'Active' || !user.verifyPassword(password)) {
    return res.status(401).json({ success: false, message: 'Invalid login credentials' })
  }

  const token = createToken({
    id: String(user._id),
    role: user.role === 'Admin' ? 'admin' : user.role.toLowerCase(),
    appRole: user.role,
    email: user.email,
    name: user.name,
  })

  return res.json({
    success: true,
    message: 'Login successful',
    data: { token, user: { _id: user._id, email: user.email, role: user.role, name: user.name } },
  })
}
