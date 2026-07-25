import { createEnquiry } from '../server/lib/handlers.js'

/** POST /api/enquiry — admissions and general contact submissions. */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, message: 'Method not allowed.' })
  }

  // Vercel parses JSON bodies automatically, but be defensive about strings.
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ ok: false, message: 'Invalid JSON body.' })
    }
  }

  const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'anonymous'

  try {
    const result = await createEnquiry(body ?? {}, { ip, source: 'vercel' })
    return res.status(result.status).json(result.body)
  } catch (error) {
    console.error('Enquiry failed:', error)
    return res.status(500).json({ ok: false, message: 'Something went wrong on our side.' })
  }
}
