import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { api } from '../../lib/api'
import { gradeOptions } from '../../data/admissions'
import { classNames } from '../../lib/format'

const EMPTY = {
  parentName: '',
  email: '',
  phone: '',
  childName: '',
  grade: '',
  message: '',
  consent: false,
  // Honeypot: bots fill it, humans never see it.
  website: '',
}

/** Same rules the API enforces — validated here first so errors are instant. */
function validate(values) {
  const errors = {}

  if (values.parentName.trim().length < 2) errors.parentName = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!/^[+\d][\d\s-]{7,15}$/.test(values.phone.trim())) errors.phone = 'Enter a valid phone number.'
  if (values.childName.trim().length < 2) errors.childName = "Please enter the child's name."
  if (!values.grade) errors.grade = 'Select the class you are applying for.'
  if (values.message.trim().length > 1000) errors.message = 'Please keep this under 1000 characters.'
  if (!values.consent) errors.consent = 'Please confirm we may contact you.'

  return errors
}

function Field({ id, label, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-xs text-crimson-700">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Admissions enquiry form. Posts to `/api/enquiry`; the server re-validates and
 * returns field-level errors, which are merged back into the same UI.
 */
export function EnquiryForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [reference, setReference] = useState(null)
  const [serverMessage, setServerMessage] = useState('')

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const first = document.getElementById(Object.keys(found)[0])
      first?.focus()
      return
    }

    setStatus('submitting')
    setServerMessage('')

    try {
      const result = await api.submitEnquiry(values)
      setReference(result?.data?.reference ?? null)
      setStatus('success')
      setValues(EMPTY)
    } catch (error) {
      if (error.fields) setErrors(error.fields)
      setServerMessage(
        error.fields
          ? 'Please check the highlighted fields.'
          : 'We could not submit the form just now. Please email info@vasantvalley.edu.in or call the office.',
      )
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-3xl border border-crimson-200 bg-white p-10 text-center shadow-soft"
      >
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-crimson-50 text-crimson-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl text-ink-900">Thank you — your enquiry is in.</h3>
        <p className="mx-auto mt-3 max-w-md leading-[1.8] text-ink-600">
          The admissions office replies within two working days. If it is urgent, call us on +91 11 4176 7940.
        </p>
        {reference && (
          <p className="mt-5 inline-block rounded-full bg-sand-200 px-4 py-2 font-mono text-sm text-ink-800">
            Reference: {reference}
          </p>
        )}
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-8">
          Submit another enquiry
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-3xl border border-sand-300 bg-white p-7 shadow-soft md:p-10"
    >
      <h3 className="font-display text-2xl text-ink-900">Admissions enquiry</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-500">
        Tell us a little about your child and we'll send the prospectus and the session calendar.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Field id="parentName" label="Parent / guardian name" error={errors.parentName}>
          <input
            id="parentName"
            name="parentName"
            type="text"
            autoComplete="name"
            value={values.parentName}
            onChange={update('parentName')}
            aria-invalid={Boolean(errors.parentName)}
            aria-describedby={describedBy('parentName')}
            className={classNames('field', errors.parentName && 'border-crimson-600')}
            placeholder="Anjali Sharma"
          />
        </Field>

        <Field id="childName" label="Child's name" error={errors.childName}>
          <input
            id="childName"
            name="childName"
            type="text"
            value={values.childName}
            onChange={update('childName')}
            aria-invalid={Boolean(errors.childName)}
            aria-describedby={describedBy('childName')}
            className={classNames('field', errors.childName && 'border-crimson-600')}
            placeholder="Kabir Sharma"
          />
        </Field>

        <Field id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={classNames('field', errors.email && 'border-crimson-600')}
            placeholder="you@example.com"
          />
        </Field>

        <Field id="phone" label="Phone number" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone')}
            className={classNames('field', errors.phone && 'border-crimson-600')}
            placeholder="+91 98100 00000"
          />
        </Field>

        <Field id="grade" label="Applying for" error={errors.grade} className="sm:col-span-2">
          <select
            id="grade"
            name="grade"
            value={values.grade}
            onChange={update('grade')}
            aria-invalid={Boolean(errors.grade)}
            aria-describedby={describedBy('grade')}
            className={classNames('field', errors.grade && 'border-crimson-600')}
          >
            <option value="">Select a class</option>
            {gradeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id="message" label="Anything you'd like us to know (optional)" error={errors.message} className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={update('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy('message')}
            className={classNames('field resize-y', errors.message && 'border-crimson-600')}
            placeholder="Current school, particular interests, questions for the admissions team…"
          />
        </Field>
      </div>

      {/* Honeypot — hidden from users and assistive tech, visible to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
      </div>

      <div className="mt-6">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-600">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={update('consent')}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('consent')}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-sand-400 text-crimson-700 focus:ring-crimson-600"
          />
          <span>I agree that the school may contact me about this enquiry.</span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 flex items-center gap-1.5 text-xs text-crimson-700">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {errors.consent}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'submitting'} className="btn-primary">
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden="true" />
              Send enquiry
            </>
          )}
        </button>
        <p className="text-xs text-ink-500">We reply within two working days.</p>
      </div>

      <div aria-live="assertive" className="mt-4">
        {status === 'error' && serverMessage && (
          <p className="flex items-start gap-2 rounded-xl bg-crimson-50 px-4 py-3 text-sm text-crimson-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {serverMessage}
          </p>
        )}
      </div>
    </form>
  )
}

export default EnquiryForm
