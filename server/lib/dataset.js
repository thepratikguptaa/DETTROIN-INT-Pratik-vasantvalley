/**
 * Server-side content store.
 *
 * Kept deliberately separate from the client's seed data: the client copy is a
 * fallback for when the network fails, this copy is what the API actually
 * serves. In a production build this module would be a Mongo/Postgres query
 * layer — the handlers above it would not change.
 */

export const events = [
  {
    id: 'synapse-2026',
    title: 'Synapse 2026',
    category: 'Inter-School',
    date: '2026-07-22',
    endDate: '2026-07-23',
    location: 'Science Block & Amphitheatre',
    excerpt:
      'Our two-day science and technology symposium returns, with student research posters, a robotics arena and a keynote from an alumna working in computational biology.',
    image: 'photo-1522202176988-66273c2fd55f',
    featured: true,
  },
  {
    id: 'laissez-faire-23',
    title: 'The 23rd Edition of Laissez Faire',
    category: 'Inter-School',
    date: '2026-07-17',
    location: 'Main Auditorium',
    excerpt:
      "Twenty-three years of the school's flagship debating and current-affairs festival. Nineteen schools, six formats, and a closing address on dissent in a democracy.",
    image: 'photo-1427504494785-3a9ca7044f45',
    featured: true,
  },
  {
    id: 'tennis-zonal-2026',
    title: 'Inter-School Tennis Zonal Tournament',
    category: 'Sport',
    date: '2026-07-13',
    endDate: '2026-07-15',
    location: 'School Courts',
    excerpt:
      'Three days of zonal tennis hosted on campus, with our under-14 and under-17 squads reaching the semi-finals in both categories.',
    image: 'photo-1546410531-bb4caa6b424d',
  },
  {
    id: 'robo-rumble',
    title: 'First Position at Robo Rumble',
    category: 'Achievement',
    date: '2026-07-04',
    location: 'Suryodaya ’26',
    excerpt:
      'Innovation, teamwork and technical excellence led our students to the top of the podium at the Robo Rumble challenge.',
    image: 'photo-1577896851231-70ef18881754',
  },
  {
    id: 'annual-production',
    title: 'Annual Production: “The Long Walk”',
    category: 'Arts',
    date: '2026-06-28',
    location: 'Amphitheatre',
    excerpt:
      'An original piece written by Class XI, staged with a cast and crew of a hundred and thirty students across four evenings.',
    image: 'photo-1461896836934-ffe607ba8211',
  },
  {
    id: 'reading-week',
    title: 'Reading Week & Author Visit',
    category: 'Academics',
    date: '2026-06-16',
    endDate: '2026-06-20',
    location: 'Junior & Senior Libraries',
    excerpt:
      "A week of read-alouds, book swaps and a workshop with a visiting children's author for the primary school.",
    image: 'photo-1588072432836-e10032774350',
  },
  {
    id: 'green-audit',
    title: 'Student-Led Campus Green Audit',
    category: 'Community',
    date: '2026-05-30',
    location: 'Across Campus',
    excerpt:
      'The environment club published its annual audit of water, waste and energy use — and presented three recommendations the school has adopted.',
    image: 'photo-1562774053-701939374585',
  },
  {
    id: 'orientation-2026',
    title: 'Pre-School Orientation Morning',
    category: 'Admissions',
    date: '2026-05-12',
    location: 'Primary Wing',
    excerpt:
      'Incoming families walked the campus, met class teachers and spent a morning in the rooms their children will learn in.',
    image: 'photo-1580582932707-520aed937b7b',
  },
]

export const announcements = [
  {
    id: 'gurgaon',
    tag: 'Expansion',
    title: 'Announcing Vasant Valley School, Gurgaon',
    body: 'Founded and run by Education Today for over 36 years, Vasant Valley is expanding. The first of the new schools opens in Gurgaon, led by a team of experienced educators. The ethos, standards and commitment to holistic development that define the founding campus remain at the heart of every new campus.',
    cta: { label: 'All announcements', to: '/news' },
  },
  {
    id: 'admissions-open',
    tag: 'Admissions',
    title: 'Registration open for the 2026–27 session',
    body: 'Pre-School registration closes on 30 September. Lateral entry to Classes I–IX is subject to seat availability and an interaction with the school. Applications are entirely online this year.',
    cta: { label: 'Start an enquiry', to: '/admissions#enquiry' },
  },
  {
    id: 'scholarship',
    tag: 'Community',
    title: 'The Education Today scholarship continues',
    body: 'As a self-financing school, we hold seats for students who would flourish here regardless of means. Families can apply for need-based assistance alongside their admission application.',
    cta: { label: 'Talk to the office', to: '/contact' },
  },
]
