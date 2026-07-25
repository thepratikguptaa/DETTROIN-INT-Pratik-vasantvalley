import { announcements, events } from './dataset.js'
import { isBot, makeReference, sanitise, validateEnquiry } from './validate.js'
import { rateLimit, saveEnquiry } from './store.js'

/**
 * Transport-agnostic request handlers.
 *
 * Each function takes plain input and returns `{ status, body }`. The Express
 * server and the Vercel serverless functions are thin adapters around these,
 * which is what keeps `npm run dev:api` and production behaving identically.
 */

const ok = (data, meta) => ({ status: 200, body: { ok: true, data, ...(meta ? { meta } : {}) } })
const fail = (status, message, extra) => ({ status, body: { ok: false, message, ...extra } })

export function listEvents(query = {}) {
  const { category, q, limit } = query

  let results = [...events].sort((a, b) => b.date.localeCompare(a.date))

  if (category && category !== 'All') {
    results = results.filter((event) => event.category.toLowerCase() === String(category).toLowerCase())
  }

  if (q) {
    const needle = String(q).toLowerCase()
    results = results.filter(
      (event) =>
        event.title.toLowerCase().includes(needle) ||
        event.excerpt.toLowerCase().includes(needle) ||
        event.category.toLowerCase().includes(needle),
    )
  }

  const max = Number.parseInt(limit, 10)
  if (Number.isFinite(max) && max > 0) results = results.slice(0, max)

  return ok(results, { total: results.length, categories: [...new Set(events.map((e) => e.category))] })
}

export function listAnnouncements() {
  return ok(announcements, { total: announcements.length })
}

export async function createEnquiry(body, context = {}) {
  const limit = rateLimit(context.ip || 'anonymous')
  if (!limit.allowed) {
    return fail(429, 'Too many submissions. Please try again in a minute.', { retryAfter: limit.retryAfter })
  }

  // Honeypot hit: respond as if it succeeded so the bot doesn't retry.
  if (isBot(body)) {
    return ok({ reference: makeReference('admissions') })
  }

  const { valid, fields, type } = validateEnquiry(body)
  if (!valid) {
    return fail(422, 'Some details need attention.', { fields })
  }

  const reference = makeReference(type)
  const record = {
    reference,
    type,
    receivedAt: new Date().toISOString(),
    source: context.source ?? 'web',
    ...(type === 'contact'
      ? {
          name: sanitise(body.name, 120),
          email: sanitise(body.email, 160),
          subject: sanitise(body.subject, 120),
        }
      : {
          parentName: sanitise(body.parentName, 120),
          childName: sanitise(body.childName, 120),
          email: sanitise(body.email, 160),
          phone: sanitise(body.phone, 24),
          grade: sanitise(body.grade, 40),
        }),
    message: sanitise(body.message, 1000),
  }

  await saveEnquiry(record)

  // A real deployment would queue a notification email here.
  return {
    status: 201,
    body: { ok: true, data: { reference, receivedAt: record.receivedAt } },
  }
}

export function healthCheck() {
  return ok({ status: 'up', service: 'vasant-valley-api', time: new Date().toISOString() })
}
