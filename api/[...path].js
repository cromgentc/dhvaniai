import app, { initializeBackend } from '../backend/server.js'

export default async function handler(req, res) {
  await initializeBackend()
  req.url = req.url.replace(/^\/api\/api(?=\/|$)/, '/api')
  return app(req, res)
}
