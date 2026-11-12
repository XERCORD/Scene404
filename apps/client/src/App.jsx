import { AnimatePresence } from 'motion/react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Artists from './pages/Artists'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Team from './pages/Team'
import Tickets from './pages/Tickets'

const accents = {
  '/artistes': 'artists',
  '/equipe': 'team',
  '/billetterie': 'tickets',
  '/contact': 'contact',
}

function App() {
  const location = useLocation()

  return (
    <div data-accent={accents[location.pathname] ?? 'primary'} className="flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/artistes" element={<Artists />} />
            <Route path="/equipe" element={<Team />} />
            <Route path="/billetterie" element={<Tickets />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
