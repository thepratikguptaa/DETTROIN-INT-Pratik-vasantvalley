import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollManager from './ScrollManager'
import ScrollProgress from './ScrollProgress'
import BackToTop from './BackToTop'
import RouteFallback from './RouteFallback'

/** App shell: fixed chrome, routed page in the middle, footer at the end. */
export function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <ScrollManager />
      <Navbar />

      <main id="main" className="flex-1">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
      <BackToTop />
    </div>
  )
}

export default Layout
