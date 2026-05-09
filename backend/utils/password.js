import crypto from 'crypto'

const iterations = 120000
const keyLength = 64
const digest = 'sha512'

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const passwordHash = crypto.pbkdf2Sync(String(password), salt, iterations, keyLength, digest).toString('hex')
  return { passwordHash, passwordSalt: salt }
}

export function verifyPassword(password, passwordHash, passwordSalt) {
  if (!password || !passwordHash || !passwordSalt) return false
  const nextHash = hashPassword(password, passwordSalt).passwordHash
  return crypto.timingSafeEqual(Buffer.from(nextHash), Buffer.from(passwordHash))
}
