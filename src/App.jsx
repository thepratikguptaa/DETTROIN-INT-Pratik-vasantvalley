import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'

// The home page ships in the main bundle; every other route is code-split so
// the first paint only downloads what it needs.
const About = lazy(() => import('./pages/About'))
const Learning = lazy(() => import('./pages/Learning'))
const DayInSchool = lazy(() => import('./pages/DayInSchool'))
const Admissions = lazy(() => import('./pages/Admissions'))
const News = lazy(() => import('./pages/News'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="learning" element={<Learning />} />
        <Route path="day-in-school" element={<DayInSchool />} />
        <Route path="admissions" element={<Admissions />} />
        <Route path="news" element={<News />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
