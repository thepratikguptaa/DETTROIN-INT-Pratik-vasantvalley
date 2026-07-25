/**
 * Photography is served from Unsplash's CDN with explicit width/quality params
 * so we never ship a 4000px original to a phone. `img()` builds the URL and
 * `srcSetFor()` gives the browser a responsive ladder to choose from.
 *
 * NOTE: these are royalty-free stand-ins for the school's own photography.
 */

const UNSPLASH = 'https://images.unsplash.com'

export function img(id, width = 1600, quality = 68) {
  return `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

export function srcSetFor(id, widths = [640, 960, 1280, 1600]) {
  return widths.map((w) => `${img(id, w)} ${w}w`).join(', ')
}

/** Curated photo set, named by where it is used. */
export const photos = {
  assembly: 'photo-1427504494785-3a9ca7044f45',
  classroom: 'photo-1580582932707-520aed937b7b',
  emptyClassroom: 'photo-1509062522246-3755977927d7',
  reading: 'photo-1503676260728-1c00da094a0b',
  collaboration: 'photo-1522202176988-66273c2fd55f',
  youngLearners: 'photo-1546410531-bb4caa6b424d',
  teacherStudent: 'photo-1524178232363-1fb2b075b655',
  library: 'photo-1588072432836-e10032774350',
  campus: 'photo-1562774053-701939374585',
  building: 'photo-1541339907198-e08756dedf3f',
  books: 'photo-1481627834876-b7833e8f5570',
  auditorium: 'photo-1461896836934-ffe607ba8211',
  desk: 'photo-1577896851231-70ef18881754',
  discussion: 'photo-1523240795612-9a054b0db644',
}
