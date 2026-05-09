import { createToken } from '../utils/authToken.js'
import User from '../models/User.js'

export async function adminLogin(req, res) {
  const email = String(req.body.email || '').toLowerCase().trim()
  const { password } = req.body

  const user = await User.findOne({ email }).select('+passwordHash +passwordSalt')

  if (user) {
    if (user.status !== 'Active' || !user.verifyPassword(password)) {
      return res.status(401).json({ success: false, message: 'Invalid login credentials' })
    }

    const token = createToken({ role: user.role === 'Admin' ? 'admin' : user.role.toLowerCase(), appRole: user.role, email: user.email, name: user.name })

    return res.json({
      success: true,
      message: 'Login successful',
      data: { token, user: { email: user.email, role: user.role, name: user.name } },
    })
  }

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@dhvani.ai'
  const adminPassword = process.env.ADMIN_PASSWORD || 'password'

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ success: false, message: 'Invalid admin credentials' })
  }

  const token = createToken({ role: 'admin', email: adminEmail, name: 'Admin' })

  return res.json({
    success: true,
    message: 'Login successful',
    data: { token, user: { email: adminEmail, role: 'admin', name: 'Admin' } },
  })
}
