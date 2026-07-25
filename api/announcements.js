import { listAnnouncements } from '../server/lib/handlers.js'

/** GET /api/announcements */
export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  const result = listAnnouncements()
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600')
  return res.status(result.status).json(result.body)
}
