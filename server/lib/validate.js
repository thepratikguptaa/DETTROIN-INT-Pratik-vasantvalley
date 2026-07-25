/**
 * Server-side validation. The browser runs the same rules for instant
 * feedback, but nothing is trusted until it has been checked here.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+\d][\d\s-]{7,15}$/

const str = (value) => (typeof value === 'string' ? value.trim() : '')

/** Strips angle brackets and clamps length — enough to keep stored text inert. */
export function sanitise(value, max = 1000) {
  return str(value).replace(/[<>]/g, '').slice(0, max)
}

export function validateEnquiry(body = {}) {
  const fields = {}
  const type = body.type === 'contact' ? 'contact' : 'admissions'

  if (type === 'contact') {
    if (str(body.name).length < 2) fields.name = 'Please enter your name.'
    if (!EMAIL.test(str(body.email))) fields.email = 'Enter a valid email address.'
    if (!str(body.subject)) fields.subject = 'Choose what this is about.'
    if (str(body.message).length < 10) fields.message = 'Please give us a little more detail.'
  } else {
    if (str(body.parentName).length < 2) fields.parentName = 'Please enter your full name.'
    if (!EMAIL.test(str(body.email))) fields.email = 'Enter a valid email address.'
    if (!PHONE.test(str(body.phone))) fields.phone = 'Enter a valid phone number.'
    if (str(body.childName).length < 2) fields.childName = "Please enter the child's name."
    if (!str(body.grade)) fields.grade = 'Select the class you are applying for.'
  }

  if (str(body.message).length > 1000) fields.message = 'Please keep this under 1000 characters.'
  if (body.consent !== true) fields.consent = 'Please confirm we may contact you.'

  return {
    valid: Object.keys(fields).length === 0,
    fields,
    type,
  }
}

/** Bots fill the hidden `website` field; humans never see it. */
export function isBot(body = {}) {
  return Boolean(str(body.website))
}

/** Human-readable reference so an applicant can quote it back to the office. */
export function makeReference(type, date = new Date()) {
  const prefix = type === 'contact' ? 'VVC' : 'VVA'
  const stamp = date.toISOString().slice(2, 10).replace(/-/g, '')
  const random = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${prefix}-${stamp}-${random}`
}
