import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Button from './ui/Button'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/artistes', label: 'Artistes' },
  { to: '/equipe', label: 'Équipe 404' },
  { to: '/billetterie', label: 'Billetterie' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()
  const close = () => setIsOpen(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-4 pt-4">
      <nav
        aria-label="Navigation principale"
        className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-white/10 bg-bg/70 py-2 pl-6 pr-2 backdrop-blur-xl"
      >
        <Link to="/" onClick={close} className="font-display text-lg font-black uppercase tracking-tight text-text">
          Scene<span className="text-accent">404</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = link.to === '/' ? pathname === '/' : pathname.startsWith(link.to)
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={`relative isolate block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-text' : 'text-text-muted hover:text-text'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-accent/60 bg-accent/15"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button to="/billetterie" onClick={close} className="px-5 py-2.5">
              Prendre ma place
            </Button>
          </div>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="menu-mobile"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setIsOpen((open) => !open)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 md:hidden"
          >
            <span className={`h-0.5 w-5 bg-text transition-transform duration-300 ${isOpen ? 'translate-y-1 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-text transition-transform duration-300 ${isOpen ? '-translate-y-1 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {links.map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 * index }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={close}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 py-2 font-display text-3xl font-black uppercase ${
                        isActive ? 'text-accent' : 'text-text'
                      }`
                    }
                  >
                    <span className="font-mono text-xs font-normal text-text-muted">0{index + 1}</span>
                    {link.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
