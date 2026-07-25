/**
 * Thin API client for the Node backend.
 *
 * In development the Vite proxy forwards `/api/*` to the Express server on
 * port 5000; in production Vercel serves the same handlers as functions.
 * Every read is wrapped in a fallback so the UI degrades to bundled seed data
 * instead of showing an empty page when the API is unavailable.
 */

const BASE = import.meta.env.VITE_API_BASE ?? ''
const TIMEOUT_MS = 8000

async function request(path, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(`${BASE}/api${path}`, {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      ...options,
    })

    const isJson = res.headers.get('content-type')?.includes('application/json')
    const payload = isJson ? await res.json() : null

    if (!res.ok) {
      const error = new Error(payload?.message || `Request failed with status ${res.status}`)
      error.status = res.status
      error.fields = payload?.fields
      throw error
    }

    return payload
  } finally {
    clearTimeout(timer)
  }
}

/** GET with graceful degradation to a bundled fallback value. */
export async function getWithFallback(path, fallback) {
  try {
    const data = await request(path)
    return { data: data?.data ?? fallback, source: 'api' }
  } catch {
    return { data: fallback, source: 'fallback' }
  }
}

export const api = {
  events: (fallback) => getWithFallback('/events', fallback),
  announcements: (fallback) => getWithFallback('/announcements', fallback),
  submitEnquiry: (body) => request('/enquiry', { method: 'POST', body: JSON.stringify(body) }),
}
