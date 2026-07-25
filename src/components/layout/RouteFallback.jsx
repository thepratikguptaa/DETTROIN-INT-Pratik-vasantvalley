/** Shown while a lazily-loaded route chunk is fetched. */
export function RouteFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-sand-50" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-4">
        <span className="relative grid h-14 w-14 place-items-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-crimson-200" />
          <svg viewBox="0 0 64 64" className="relative h-10 w-10" aria-hidden="true">
            <path d="M20 2h24l18 18v24L44 62H20L2 44V20L20 2z" className="fill-crimson-700" />
            <path d="M17 20h7.4l7.6 20.2L39.6 20H47L35.6 48h-7.2L17 20z" className="fill-sand-50" />
          </svg>
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-ink-500">Loading</span>
      </div>
    </div>
  )
}

export default RouteFallback
