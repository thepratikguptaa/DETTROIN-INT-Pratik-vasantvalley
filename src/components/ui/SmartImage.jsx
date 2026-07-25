import { useState } from 'react'
import { img, srcSetFor } from '../../data/media'
import { classNames } from '../../lib/format'

/**
 * Responsive image with three things stock <img> doesn't give us:
 *  1. a srcset ladder so phones never download desktop-sized files,
 *  2. a warm skeleton that fades out on load (no layout jump, no flash),
 *  3. a branded fallback if the CDN ever fails, so the layout never breaks.
 */
export function SmartImage({
  id,
  alt,
  className = '',
  imgClassName = '',
  sizes = '(min-width: 1024px) 50vw, 100vw',
  width = 1600,
  priority = false,
  ratio = 'aspect-[4/3]',
}) {
  const [status, setStatus] = useState('loading')

  return (
    <div className={classNames('relative overflow-hidden bg-sand-200', ratio, className)}>
      {status === 'error' ? (
        <div
          className="absolute inset-0 grid place-items-center bg-gradient-to-br from-crimson-800 to-crimson-950"
          role="img"
          aria-label={alt}
        >
          <span className="font-display text-3xl text-sand-200/70">VV</span>
        </div>
      ) : (
        <>
          <div
            aria-hidden="true"
            className={classNames(
              'absolute inset-0 bg-gradient-to-br from-sand-200 via-sand-300 to-sand-200 transition-opacity duration-700',
              status === 'loaded' ? 'opacity-0' : 'opacity-100 animate-pulse',
            )}
          />
          <img
            src={img(id, width)}
            srcSet={srcSetFor(id)}
            sizes={sizes}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchpriority={priority ? 'high' : 'auto'}
            onLoad={() => setStatus('loaded')}
            onError={() => setStatus('error')}
            className={classNames(
              'h-full w-full object-cover transition-[opacity,transform] duration-[900ms] ease-out-expo',
              status === 'loaded' ? 'opacity-100' : 'opacity-0',
              imgClassName,
            )}
          />
        </>
      )}
    </div>
  )
}

export default SmartImage
