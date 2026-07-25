/** Date helpers shared by the events list and the home page timeline. */

const LOCALE = 'en-IN'

export function formatDate(iso, opts = { day: 'numeric', month: 'short', year: 'numeric' }) {
  if (!iso) return ''
  const date = new Date(`${iso}T00:00:00`)
  if (Number.isNaN(date.getTime())) return iso
  return new Intl.DateTimeFormat(LOCALE, opts).format(date)
}

/** "13 – 15 Jul 2026" when a range shares a month, otherwise both dates in full. */
export function formatDateRange(start, end) {
  if (!end || end === start) return formatDate(start)

  const a = new Date(`${start}T00:00:00`)
  const b = new Date(`${end}T00:00:00`)
  if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return formatDate(start)

  const sameMonth = a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
  if (sameMonth) {
    return `${a.getDate()} – ${formatDate(end)}`
  }
  return `${formatDate(start)} – ${formatDate(end)}`
}

/** Groups events into "July 2026"-style buckets for the archive rail. */
export function groupByMonth(items) {
  const groups = new Map()
  for (const item of items) {
    const key = formatDate(item.date, { month: 'long', year: 'numeric' })
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(item)
  }
  return [...groups.entries()].map(([month, entries]) => ({ month, entries }))
}

export function classNames(...values) {
  return values.filter(Boolean).join(' ')
}
