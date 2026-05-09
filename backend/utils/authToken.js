import crypto from 'crypto'

const secret = process.env.JWT_SECRET || 'dhvani-local-admin-secret'

function base64Url(input) {
  return Buffer.from(input).toString('base64url')
}

function sign(value) {
  return crypto.createHmac('sha256', secret).update(value).digest('base64url')
}

export function createToken(payload, expiresInSeconds = 60 * 60 * 8) {
  const header = { alg: 'HS256', typ: 'JWT' }
  const body = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
    iat: Math.floor(Date.now() / 1000),
  }
  const unsigned = `${base64Url(JSON.stringify(header))}.${base64Url(JSON.stringify(body))}`
  return `${unsigned}.${sign(unsigned)}`
}

export function verifyToken(token) {
  if (!token || token.split('.').length !== 3) return null

  const [header, body, signature] = token.split('.')
  const unsigned = `${header}.${body}`
  const expectedSignature = sign(unsigned)

  if (signature.length !== expectedSignature.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}
