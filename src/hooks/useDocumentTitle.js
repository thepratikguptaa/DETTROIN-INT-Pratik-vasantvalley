import { useEffect } from 'react'

const SUFFIX = 'Vasant Valley School'

/** Per-route document title and meta description — cheap SEO for an SPA. */
export function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : `${SUFFIX} — Excellence in Deed | New Delhi`

    if (!description) return
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])
}
