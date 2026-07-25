import { healthCheck } from '../server/lib/handlers.js'

/** GET /api/health — used to confirm the functions deployed correctly. */
export default function handler(_req, res) {
  const result = healthCheck()
  res.setHeader('Cache-Control', 'no-store')
  return res.status(result.status).json(result.body)
}
