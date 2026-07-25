import { photos } from './media'

/**
 * Seed dataset for the News & Events page and the home page timeline.
 * The API (`/api/events`) serves this same shape; the client falls back to
 * this copy when the API is unreachable so the site is never empty.
 */
export const events = [
  {
    id: 'synapse-2026',
    title: 'Synapse 2026',
    category: 'Inter-School',
    date: '2026-07-22',
    endDate: '2026-07-23',
    location: 'Science Block & Amphitheatre',
    excerpt: 'Our two-day science and technology symposium returns, with student research posters, a robotics arena and a keynote from an alumna working in computational biology.',
    image: photos.collaboration,
    featured: true,
  },
  {
    id: 'laissez-faire-23',
    title: 'The 23rd Edition of Laissez Faire',
    category: 'Inter-School',
    date: '2026-07-17',
    location: 'Main Auditorium',
    excerpt: 'Twenty-three years of the school\'s flagship debating and current-affairs festival. Nineteen schools, six formats, and a closing address on dissent in a democracy.',
    image: photos.assembly,
    featured: true,
  },
  {
    id: 'tennis-zonal-2026',
    title: 'Inter-School Tennis Zonal Tournament',
    category: 'Sport',
    date: '2026-07-13',
    endDate: '2026-07-15',
    location: 'School Courts',
    excerpt: 'Three days of zonal tennis hosted on campus, with our under-14 and under-17 squads reaching the semi-finals in both categories.',
    image: photos.youngLearners,
  },
  {
    id: 'robo-rumble',
    title: 'First Position at Robo Rumble',
    category: 'Achievement',
    date: '2026-07-04',
    location: 'Suryodaya ’26',
    excerpt: 'Innovation, teamwork and technical excellence led our students to the top of the podium at the Robo Rumble challenge.',
    image: photos.desk,
  },
  {
    id: 'annual-production',
    title: 'Annual Production: “The Long Walk”',
    category: 'Arts',
    date: '2026-06-28',
    location: 'Amphitheatre',
    excerpt: 'An original piece written by Class XI, staged with a cast and crew of a hundred and thirty students across four evenings.',
    image: photos.auditorium,
  },
  {
    id: 'reading-week',
    title: 'Reading Week & Author Visit',
    category: 'Academics',
    date: '2026-06-16',
    endDate: '2026-06-20',
    location: 'Junior & Senior Libraries',
    excerpt: 'A week of read-alouds, book swaps and a workshop with a visiting children\'s author for the primary school.',
    image: photos.library,
  },
  {
    id: 'green-audit',
    title: 'Student-Led Campus Green Audit',
    category: 'Community',
    date: '2026-05-30',
    location: 'Across Campus',
    excerpt: 'The environment club published its annual audit of water, waste and energy use — and presented three recommendations the school has adopted.',
    image: photos.campus,
  },
  {
    id: 'orientation-2026',
    title: 'Pre-School Orientation Morning',
    category: 'Admissions',
    date: '2026-05-12',
    location: 'Primary Wing',
    excerpt: 'Incoming families walked the campus, met class teachers and spent a morning in the rooms their children will learn in.',
    image: photos.classroom,
  },
]

export const eventCategories = ['All', 'Inter-School', 'Academics', 'Sport', 'Arts', 'Achievement', 'Community', 'Admissions']
