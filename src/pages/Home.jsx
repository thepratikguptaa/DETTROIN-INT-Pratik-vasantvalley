import Hero from '../components/home/Hero'
import QuickLinks from '../components/home/QuickLinks'
import Mission from '../components/home/Mission'
import Announcements from '../components/home/Announcements'
import StoryBlock from '../components/home/StoryBlock'
import LearningWheel from '../components/home/LearningWheel'
import Infrastructure from '../components/home/Infrastructure'
import EventsRail from '../components/home/EventsRail'
import InstagramStrip from '../components/home/InstagramStrip'
import { storyBlocks } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Home() {
  useDocumentTitle(
    null,
    'Vasant Valley School, New Delhi — an inclusive day school on an eight-acre campus in Vasant Kunj. Founded 1990. Explore our philosophy, learning experience, campus life and admissions.',
  )

  return (
    <>
      <Hero />
      <QuickLinks />
      <Mission />
      <Announcements />
      <StoryBlock block={storyBlocks[0]} tone="sand" />
      <StoryBlock block={storyBlocks[1]} tone="light" />
      <LearningWheel />
      <Infrastructure />
      <EventsRail />
      <InstagramStrip />
    </>
  )
}
