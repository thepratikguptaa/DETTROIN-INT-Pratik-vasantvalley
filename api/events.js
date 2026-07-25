import { listEvents } from '../server/lib/handlers.js'

/** GET /api/events?category=Sport&q=tennis&limit=6 */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  const result = listEvents(req.query ?? {})
  // Cached at the edge for a minute, served stale for an hour while revalidating.
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=3600')
  return res.status(result.status).json(result.body)
}
