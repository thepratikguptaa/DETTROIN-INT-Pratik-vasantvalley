import express from 'express'
import { createEnquiry, healthCheck, listAnnouncements, listEvents } from './lib/handlers.js'

/**
 * Local development API.
 *
 * Vite proxies `/api/*` here (see vite.config.js) so the client uses identical
 * relative paths in dev and in production, where the same handlers run as
 * Vercel serverless functions in `/api`.
 *
 *   npm run dev:api      # this server on :5000
 *   npm run dev:full     # Vite + this server together
 */

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.json({ limit: '32kb' }))
app.disable('x-powered-by')

// Permissive CORS is fine here: dev only, read-only data plus one write route.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CORS_ORIGIN ?? '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  if (req.method === 'OPTIONS') return res.sendStatus(204)
  return next()
})

const send = (res, result) => res.status(result.status).json(result.body)

app.get('/api/health', (_req, res) => send(res, healthCheck()))
app.get('/api/events', (req, res) => send(res, listEvents(req.query)))
app.get('/api/announcements', (_req, res) => send(res, listAnnouncements()))

app.post('/api/enquiry', async (req, res, next) => {
  try {
    const result = await createEnquiry(req.body, { ip: req.ip, source: 'express' })
    send(res, result)
  } catch (error) {
    next(error)
  }
})

app.use('/api', (_req, res) => res.status(404).json({ ok: false, message: 'Unknown endpoint.' }))

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  console.error('API error:', error)
  res.status(500).json({ ok: false, message: 'Something went wrong on our side.' })
})

app.listen(PORT, () => {
  console.log(`\n  Vasant Valley API ready → http://localhost:${PORT}/api/health\n`)
})
