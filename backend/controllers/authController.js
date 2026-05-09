import { createToken } from '../utils/authToken.js'

export function adminLogin(req, res) {
  const { email, password } = req.body
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
