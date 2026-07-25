import { useState } from 'react'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { api } from '../../lib/api'
import { classNames } from '../../lib/format'

const SUBJECTS = ['Admissions', 'Academics', 'Transport', 'Careers at the school', 'Alumni', 'Something else']

const EMPTY = { name: '', email: '', subject: '', message: '', consent: false, website: '' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.subject) errors.subject = 'Choose what this is about.'
  if (values.message.trim().length < 10) errors.message = 'Please give us a little more detail (10 characters or more).'
  if (!values.consent) errors.consent = 'Please confirm we may reply to you.'
  return errors
}

/** General enquiry form for the Contact page. Posts to the same API endpoint. */
export function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')

  const update = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }

    setStatus('submitting')
    try {
      await api.submitEnquiry({ ...values, type: 'contact' })
      setStatus('success')
      setValues(EMPTY)
    } catch (error) {
      if (error.fields) setErrors(error.fields)
      setStatus('error')
      setFeedback(
        error.fields
          ? 'Please check the highlighted fields.'
          : 'Something went wrong sending that. Please email info@vasantvalley.edu.in instead.',
      )
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-3xl border border-crimson-200 bg-white p-10 text-center shadow-soft">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-crimson-50 text-crimson-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-6 font-display text-2xl text-ink-900">Message sent</h3>
        <p className="mx-auto mt-3 max-w-sm leading-[1.8] text-ink-600">
          Thank you for writing in. The office replies within two working days.
        </p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-8">
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative rounded-3xl border border-sand-300 bg-white p-7 shadow-soft md:p-10">
      <h2 className="font-display text-2xl text-ink-900">Write to us</h2>
      <p className="mt-2 text-sm text-ink-500">All fields except the message length are required.</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Your name
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={classNames('field', errors.name && 'border-crimson-600')}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-crimson-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={classNames('field', errors.email && 'border-crimson-600')}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-crimson-700">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className="field-label">
            What is this about?
          </label>
          <select
            id="subject"
            value={values.subject}
            onChange={update('subject')}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={classNames('field', errors.subject && 'border-crimson-600')}
          >
            <option value="">Select a subject</option>
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-xs text-crimson-700">
              {errors.subject}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="field-label">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            value={values.message}
            onChange={update('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={classNames('field resize-y', errors.message && 'border-crimson-600')}
          />
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-xs text-crimson-700">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="contact-website">Leave empty</label>
        <input id="contact-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update('website')} />
      </div>

      <div className="mt-6">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-600">
          <input
            id="consent"
            type="checkbox"
            checked={values.consent}
            onChange={update('consent')}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-sand-400 text-crimson-700 focus:ring-crimson-600"
          />
          <span>I agree that the school may use these details to reply to me.</span>
        </label>
        {errors.consent && <p className="mt-1.5 text-xs text-crimson-700">{errors.consent}</p>}
      </div>

      <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-8">
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send message
          </>
        )}
      </button>

      <div aria-live="assertive" className="mt-4">
        {status === 'error' && (
          <p className="flex items-start gap-2 rounded-xl bg-crimson-50 px-4 py-3 text-sm text-crimson-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            {feedback}
          </p>
        )}
      </div>
    </form>
  )
}

export default ContactForm
