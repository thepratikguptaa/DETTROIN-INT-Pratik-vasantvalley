import {
  Activity,
  ArrowRight,
  Blocks,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  Compass,
  Facebook,
  FileText,
  FlaskConical,
  Footprints,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Instagram,
  Leaf,
  Library,
  Linkedin,
  MessageSquare,
  Music,
  Palette,
  PencilRuler,
  Scale,
  Sparkles,
  Sprout,
  Stethoscope,
  Sun,
  Theater,
  Trophy,
  Users,
  Youtube,
} from 'lucide-react'

/**
 * Name → component map so data files can reference icons as plain strings
 * while the bundle still tree-shakes down to only what's listed here.
 */
const ICONS = {
  Activity,
  ArrowRight,
  Blocks,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  Compass,
  facebook: Facebook,
  FileText,
  FlaskConical,
  Footprints,
  Globe2,
  GraduationCap,
  Handshake,
  HeartHandshake,
  instagram: Instagram,
  Leaf,
  Library,
  linkedin: Linkedin,
  MessageSquare,
  Music,
  Palette,
  PencilRuler,
  Scale,
  Sparkles,
  Sprout,
  Stethoscope,
  Sun,
  Theater,
  Trophy,
  Users,
  youtube: Youtube,
}

export function Icon({ name, className = 'h-5 w-5', strokeWidth = 1.6, ...rest }) {
  const Component = ICONS[name] ?? Sparkles
  return <Component className={className} strokeWidth={strokeWidth} aria-hidden="true" {...rest} />
}

export default Icon
