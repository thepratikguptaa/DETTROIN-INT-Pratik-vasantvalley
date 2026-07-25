import { appendFile, mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Enquiry storage.
 *
 * Serverless functions have an ephemeral, often read-only filesystem, so the
 * in-memory list is the source of truth for a request and the JSONL file is a
 * best-effort local development log. Swapping this module for a Mongo
 * collection is the only change a real deployment needs.
 */

const memory = []
const DATA_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '.data')
const LOG_FILE = join(DATA_DIR, 'enquiries.jsonl')
const persistEnabled = process.env.VERCEL !== '1' && process.env.PERSIST_ENQUIRIES !== 'false'

export async function saveEnquiry(record) {
  memory.push(record)

  if (!persistEnabled) return record

  try {
    await mkdir(DATA_DIR, { recursive: true })
    await appendFile(LOG_FILE, `${JSON.stringify(record)}\n`, 'utf8')
  } catch (error) {
    // Never fail a user's submission because a log write failed.
    console.warn('Could not persist enquiry to disk:', error.message)
  }

  return record
}

export function countEnquiries() {
  return memory.length
}

/**
 * Very small fixed-window rate limiter, keyed by client IP.
 * Enough to stop a script hammering the form; not a substitute for a WAF.
 */
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 5
const hits = new Map()

export function rateLimit(key) {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(key, { start: now, count: 1 })
    return { allowed: true, remaining: MAX_PER_WINDOW - 1 }
  }

  entry.count += 1
  if (entry.count > MAX_PER_WINDOW) {
    return { allowed: false, retryAfter: Math.ceil((WINDOW_MS - (now - entry.start)) / 1000) }
  }

  return { allowed: true, remaining: MAX_PER_WINDOW - entry.count }
}
