import { verifyToken } from '../utils/authToken.js'

export function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''
  const payload = verifyToken(token)

  if (!payload || payload.role !== 'admin') {
    return res.status(401).json({ success: false, message: 'Admin authorization required' })
  }

  req.user = payload
  return next()
}
