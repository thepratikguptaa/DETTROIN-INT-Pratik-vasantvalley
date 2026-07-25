/**
 * Single source of truth for identity, contact details and navigation.
 * Every layout component reads from here so copy changes never touch JSX.
 */

export const site = {
  name: 'Vasant Valley School',
  shortName: 'Vasant Valley',
  motto: 'Excellence in Deed',
  established: 1990,
  tagline: 'An inclusive day school in Vasant Kunj, New Delhi — where education is preparation for life.',
  address: {
    line1: 'Sector C, Vasant Kunj',
    line2: 'New Delhi 110070, India',
    mapUrl: 'https://maps.google.com/?q=Vasant+Valley+School+Vasant+Kunj+New+Delhi',
    embedUrl:
      'https://www.google.com/maps?q=Vasant%20Valley%20School%2C%20Sector%20C%2C%20Vasant%20Kunj%2C%20New%20Delhi&output=embed',
  },
  phone: '+91 11 4176 7940',
  phoneHref: 'tel:+911141767940',
  email: 'info@vasantvalley.edu.in',
  officeHours: 'Monday – Friday · 8:00 AM to 3:30 PM',
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
  ],
}

/** Primary navigation. Items with `children` render as a mega-menu panel. */
export const navigation = [
  { label: 'Home', to: '/' },
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Our Story', to: '/about#story', description: 'From 200 students in 1990 to a school of consequence.' },
      { label: 'Vision & Philosophy', to: '/about#vision', description: 'What “Excellence in Deed” asks of us.' },
      { label: 'Leadership', to: '/about#leadership', description: 'The people who hold the standard.' },
      { label: 'Infrastructure', to: '/about#infrastructure', description: 'Eight acres of sandstone, shade and space.' },
    ],
  },
  {
    label: 'Learning',
    to: '/learning',
    children: [
      { label: 'The Learning Experience', to: '/learning#experience', description: 'Eight facets of a whole education.' },
      { label: 'Curriculum by Stage', to: '/learning#stages', description: 'Pre-School through Class XII.' },
      { label: 'International Curriculum', to: '/learning#international', description: 'Global pathways and exchanges.' },
      { label: 'Special Education Needs', to: '/learning#sen', description: 'Individualised support, by design.' },
    ],
  },
  { label: 'A Day in School', to: '/day-in-school' },
  { label: 'Admissions', to: '/admissions' },
  { label: 'News & Events', to: '/news' },
  { label: 'Contact', to: '/contact' },
]

/** Footer sitemap — grouped links mirroring the original site's structure. */
export const footerColumns = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Vision & Philosophy', to: '/about#vision' },
      { label: 'The Learning Experience', to: '/learning#experience' },
      { label: 'International Curriculum', to: '/learning#international' },
      { label: 'Infrastructure', to: '/about#infrastructure' },
    ],
  },
  {
    title: 'Programmes',
    links: [
      { label: 'Special Education Needs', to: '/learning#sen' },
      { label: 'Intra-School Programmes', to: '/day-in-school#intra' },
      { label: 'Inter-School Programmes', to: '/day-in-school#inter' },
      { label: 'A Day in School', to: '/day-in-school' },
      { label: 'Sports & Houses', to: '/day-in-school#sport' },
    ],
  },
  {
    title: 'Information',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Admissions', to: '/admissions' },
      { label: 'Announcements', to: '/news' },
      { label: 'News & Events', to: '/news' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Quick Links',
    links: [
      { label: 'Parent & Student Login', to: '/contact#login' },
      { label: 'FAQs', to: '/admissions#faqs' },
      { label: 'Statutory Compliances', to: '/about#compliance' },
      { label: 'Privacy Policy', to: '/about#privacy' },
      { label: 'Careers', to: '/contact#careers' },
    ],
  },
]

/** Headline numbers used on the home page and About page. */
export const stats = [
  { value: 1990, label: 'Founded', suffix: '', hint: 'An initiative of the Education Today Trust' },
  { value: 8, label: 'Acre campus', suffix: '', hint: 'Four acres built, the rest green cover' },
  { value: 14, label: 'Years of schooling', suffix: '', hint: 'Pre-School through Class XII' },
  { value: 8, label: 'Facets of learning', suffix: '', hint: 'The Vasant Valley Learning Experience' },
]
