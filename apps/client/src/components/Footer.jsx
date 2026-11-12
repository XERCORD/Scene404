import { Link } from 'react-router-dom'
import { useContent } from '../context/content'
import Marquee from './Marquee'

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/artistes', label: 'Artistes' },
  { to: '/equipe', label: 'Équipe 404' },
  { to: '/billetterie', label: 'Billetterie' },
  { to: '/contact', label: 'Contact' },
]

const headingClass = 'mb-4 font-mono text-xs uppercase tracking-[0.2em] text-accent'
const linkClass = 'text-text-muted transition-colors hover:text-text'

export default function Footer() {
  const { site } = useContent()

  return (
    <footer className="overflow-hidden border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl font-black uppercase text-text">
            Scene<span className="text-accent">404</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-text-muted">{site.slogan}</p>
        </div>

        <nav aria-label="Navigation du pied de page">
          <h2 className={headingClass}>Navigation</h2>
          <ul className="flex flex-col gap-2 text-sm">
            {links.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Réseaux sociaux</h2>
          <ul className="flex flex-col gap-2 text-sm text-text-muted">
            {site.socials.map((social) => (
              <li key={social.label}>
                {social.url ? (
                  <a href={social.url} target="_blank" rel="noreferrer" className={linkClass}>
                    {social.label}
                  </a>
                ) : (
                  social.label
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={headingClass}>Contact</h2>
          <a href={`mailto:${site.contactEmail}`} className={`text-sm ${linkClass}`}>
            {site.contactEmail}
          </a>
        </div>
      </div>

      <Marquee
        items={[site.name]}
        duration={45}
        className="text-outline select-none font-display text-[16vw] font-black uppercase leading-none"
      />

      <p className="border-t border-white/10 px-5 py-5 text-center font-mono text-xs text-text-muted">
        Projet YDAYS — Ynov B3 © {new Date().getFullYear()}
      </p>
    </footer>
  )
}
