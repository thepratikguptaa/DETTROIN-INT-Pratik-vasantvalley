import { photos } from './media'

/** Hero carousel — three slides, each pointing somewhere useful. */
export const heroSlides = [
  {
    id: 'laissez-faire',
    eyebrow: 'Signature Event',
    title: '23rd Laissez Faire',
    subtitle:
      'Three days of debate, dialogue and dissent — hosted by our students, for schools across the country.',
    image: photos.assembly,
    cta: { label: 'Read the story', to: '/news' },
  },
  {
    id: 'philosophy',
    eyebrow: 'Excellence in Deed',
    title: 'Education is preparation for life',
    subtitle:
      'The entire campus is a classroom. Academic and non-academic learning are planned around how children actually grow.',
    image: photos.classroom,
    cta: { label: 'Our philosophy', to: '/about#vision' },
  },
  {
    id: 'admissions',
    eyebrow: 'Admissions 2026–27',
    title: 'Begin the conversation',
    subtitle:
      'Registration for Pre-School and lateral entry is open. Meet us, walk the campus, ask the hard questions.',
    image: photos.campus,
    cta: { label: 'Admissions process', to: '/admissions' },
  },
]

/** Four shortcuts pinned under the hero — the tasks most visitors arrive for. */
export const quickLinks = [
  { label: 'Admissions', description: 'Process, dates & enquiry', to: '/admissions', icon: 'GraduationCap' },
  { label: 'The Learning Experience', description: 'Curriculum & pedagogy', to: '/learning', icon: 'BookOpen' },
  { label: 'A Day in School', description: 'Life on eight acres', to: '/day-in-school', icon: 'Sun' },
  { label: 'News & Events', description: 'What happened this week', to: '/news', icon: 'CalendarDays' },
]

/** Rotating banner in the crimson announcement strip. */
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

/**
 * The eight facets of the Vasant Valley Learning Experience — rendered as an
 * interactive octagon on the home page and as cards on the Learning page.
 */
export const learningFacets = [
  { key: 'cerebral', label: 'Cerebral', icon: 'Brain', text: 'Rigorous academics that reward curiosity over recall, and questions over answers.' },
  { key: 'social', label: 'Social', icon: 'Users', text: 'Mixed-age houses, councils and clubs where children learn to disagree well.' },
  { key: 'physical', label: 'Physical', icon: 'Activity', text: 'Daily sport for every child, not only for the team that wins on Saturday.' },
  { key: 'spiritual', label: 'Spiritual', icon: 'Sparkles', text: 'Stillness, reflection and an education in the many ways people find meaning.' },
  { key: 'emotional', label: 'Emotional', icon: 'HeartHandshake', text: 'Counselling, mentoring and adults who notice when something is off.' },
  { key: 'environmental', label: 'Environmental', icon: 'Leaf', text: 'A green campus that children help maintain — composting, gardens, water audits.' },
  { key: 'creative', label: 'Creative', icon: 'Palette', text: 'Studio art, theatre, music and design treated as disciplines, not decoration.' },
  { key: 'ethical', label: 'Ethical', icon: 'Scale', text: 'Service learning and an honour code that students themselves help write.' },
]

/** Long-form home page story blocks (alternating image / text). */
export const storyBlocks = [
  {
    id: 'vision',
    eyebrow: 'Our Motto',
    title: '“Excellence in Deed”',
    body: [
      'The School\'s motto sets the standard for Vasant Valley School. Individualised attention for each student, a "process-focused" learning framework, equity of all stakeholders and a commitment to society are the pillars of the School\'s philosophy.',
      'We believe that education is an enjoyable and interactive process — and that what a child does with what they know matters more than the marks that measure it.',
    ],
    image: photos.collaboration,
    link: { label: 'Vision & Philosophy', to: '/about#vision' },
    align: 'right',
  },
  {
    id: 'day',
    eyebrow: 'A Day in School',
    title: 'Education is preparation for life.',
    body: [
      'The school day comprises academic and non-academic Learning Experiences, planned with special focus on the developmental needs of our students.',
      'The entire campus is a classroom and learning is continuous — in the amphitheatre, on the field, in the corridor between two lessons.',
    ],
    image: photos.teacherStudent,
    link: { label: 'A Day in School', to: '/day-in-school' },
    align: 'left',
  },
]

/** Home page infrastructure callout. */
export const infrastructure = {
  eyebrow: 'The Campus',
  title: 'Eight acres, built for children',
  body: [
    'The School is divided into two wings with an open amphitheatre connecting them. This eight-acre campus has a built-up area of four acres, while the rest of the space comprises a lush, green cover.',
    'The red and beige sandstone building was designed and built keeping in mind the ideal environment for children, the philosophy of the school, and evolving paradigms.',
  ],
  features: [
    { label: 'Open-air amphitheatre', icon: 'Theater' },
    { label: 'Two libraries, 26,000 titles', icon: 'Library' },
    { label: 'Science & robotics labs', icon: 'FlaskConical' },
    { label: 'Full-size playing fields', icon: 'Trophy' },
    { label: 'Art, music & dance studios', icon: 'Music' },
    { label: 'Infirmary & counselling suite', icon: 'Stethoscope' },
  ],
  image: photos.building,
}

/** About page — milestones. */
export const milestones = [
  { year: '1990', title: 'The school opens', text: 'Founded by Mr. Aroon Purie and Mrs. Rekha Purie as an initiative of the Education Today Trust, with around 200 students and 16 teachers.' },
  { year: '1996', title: 'First graduating class', text: 'The first cohort sits the Class XII board examinations and leaves for universities in India and abroad.' },
  { year: '2003', title: 'Laissez Faire begins', text: 'Students launch what becomes one of Delhi\'s most respected inter-school debating and current-affairs festivals.' },
  { year: '2012', title: 'The green campus charter', text: 'Rainwater harvesting, solar assistance and a student-run composting programme become part of daily school life.' },
  { year: '2020', title: 'Thirty years, one standard', text: 'Three decades of a self-financing, inclusive day school that never grew past the size at which teachers know every child.' },
  { year: '2026', title: 'Vasant Valley, Gurgaon', text: 'The first of the new campuses is announced, carrying the same ethos to a new community.' },
]

/** About page — leadership (illustrative roles for this redesign concept). */
export const leadership = [
  { name: 'The Principal', role: 'Head of School', text: 'Leads the academic council and the school\'s pastoral commitments; teaches one section of senior school every year.' },
  { name: 'The Head of Middle School', role: 'Classes VI – VIII', text: 'Holds the hardest years of school — the ones where children decide what kind of learner they will be.' },
  { name: 'The Head of Primary', role: 'Pre-School – Class V', text: 'Guards play, reading and the unhurried pace that early learning needs.' },
  { name: 'The Head of Counselling', role: 'Student Wellbeing', text: 'Runs the counselling suite, the peer-mentor programme and the school\'s SEN provision.' },
]

/** Learning page — curriculum by stage. */
export const stages = [
  {
    id: 'pre-primary',
    stage: 'Pre-School & Pre-Primary',
    classes: 'Ages 3 – 5',
    icon: 'Blocks',
    summary: 'Play is the curriculum. Language, number sense and motor skills grow out of it rather than around it.',
    points: ['Theme-based enquiry units', 'Phonics and early number', 'Outdoor learning every day', 'No formal assessment'],
  },
  {
    id: 'primary',
    stage: 'Primary School',
    classes: 'Classes I – V',
    icon: 'PencilRuler',
    summary: 'Reading widely, writing often, and the first taste of the specialist teaching that continues to Class XII.',
    points: ['Library period twice weekly', 'Hindi and a third language', 'Studio art, music and theatre', 'Continuous, descriptive assessment'],
  },
  {
    id: 'middle',
    stage: 'Middle School',
    classes: 'Classes VI – VIII',
    icon: 'Compass',
    summary: 'Subjects sharpen, choices begin, and students take on real responsibility inside the school community.',
    points: ['Lab-based science', 'Design, coding and robotics', 'Service learning projects', 'House and council leadership'],
  },
  {
    id: 'senior',
    stage: 'Senior School',
    classes: 'Classes IX – XII',
    icon: 'GraduationCap',
    summary: 'CBSE board pathways with genuine subject choice, plus structured university and careers guidance.',
    points: ['Science, Commerce & Humanities streams', 'Research and internship term', 'University counselling from Class X', 'Alumni mentoring network'],
  },
]

/** Learning page — programmes. */
export const programmes = [
  { title: 'International Curriculum', icon: 'Globe2', text: 'Exchange partnerships, Model UN, and a global-citizenship strand woven through the humanities from Class VI.' },
  { title: 'Special Education Needs', icon: 'HeartHandshake', text: 'A dedicated SEN department builds individual education plans with teachers, parents and the student themselves.' },
  { title: 'Intra-School Programmes', icon: 'Users', text: 'Houses, clubs, the student council and an annual production that every single child takes part in.' },
  { title: 'Inter-School Programmes', icon: 'Handshake', text: 'Laissez Faire, Synapse and a full calendar of debates, quizzes and tournaments hosted on campus.' },
  { title: 'Sport for Every Child', icon: 'Trophy', text: 'Athletics, tennis, basketball, football, swimming and yoga — participation first, podiums second.' },
  { title: 'Service Learning', icon: 'Sprout', text: 'Long-term partnerships with community organisations, planned and run by students from Class VII upward.' },
]

/** A Day in School — the timetable. */
export const daySchedule = [
  { time: '7:55', title: 'Gates open', text: 'Buses arrive, corridors fill, and the day starts with people rather than bells.' },
  { time: '8:15', title: 'Assembly', text: 'Class-led assemblies in the amphitheatre — music, news, a reading, and the occasional argument.' },
  { time: '8:40', title: 'Academic blocks', text: 'Four extended periods, deliberately long enough for discussion, lab work and drafting.' },
  { time: '11:20', title: 'Break', text: 'Lunch under the trees. Teachers eat with students, which is a curriculum of its own.' },
  { time: '12:00', title: 'Studio & lab time', text: 'Art, music, theatre, design, robotics and library research, rotating through the week.' },
  { time: '1:40', title: 'Games', text: 'Every child, every day, on a field or a court — no exemptions for exam season.' },
  { time: '2:45', title: 'Clubs & societies', text: 'Debate, Model UN, coding, dance, environment club, the school paper.' },
  { time: '3:30', title: 'Day closes', text: 'Reflection with the class teacher before dispersal.' },
]

/** A Day in School — houses. */
export const houses = [
  { name: 'Aravalli', colour: '#9E1B32', trait: 'Steadiness' },
  { name: 'Nilgiri', colour: '#26454F', trait: 'Curiosity' },
  { name: 'Shivalik', colour: '#B7791F', trait: 'Resolve' },
  { name: 'Vindhya', colour: '#33636F', trait: 'Fellowship' },
]

/** Instagram-style strip on the home page. */
export const instagramPosts = [
  { id: 1, caption: 'First position | Robo Rumble — innovation, teamwork and technical excellence at Suryodaya ’26.', image: photos.discussion },
  { id: 2, caption: 'Laissez Faire, 23rd edition. Save the date — 17 July.', image: photos.auditorium },
  { id: 3, caption: 'Winner — Dutch Junior Open 2026, Boys’ Under-13 Champion.', image: photos.youngLearners },
  { id: 4, caption: 'Back to school. The gate, the trees, and eight acres waiting.', image: photos.campus },
]
