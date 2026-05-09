import app, { initializeBackend } from '../backend/server.js'

export default async function handler(req, res) {
  await initializeBackend()
  return app(req, res)
}
