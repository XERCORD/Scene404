import { platforms } from '../data/artists'
import Reveal from './motion/Reveal'
import Portrait from './Portrait'
import Button from './ui/Button'

// Présentation complète d'un artiste (page Artistes), photo et texte alternés
export default function ArtistFeature({ artist, index }) {
  const isReversed = index % 2 === 1
  const listenUrl = platforms.map((platform) => artist.links[platform.key]).find(Boolean)

  return (
    <article className="grid items-center gap-8 border-t border-white/10 py-12 md:grid-cols-2 md:gap-16 md:py-16">
      <Reveal className={`group relative ${isReversed ? 'md:order-2' : ''}`}>
        <Portrait image={artist.image} name={artist.name} className="aspect-[4/5] rounded-3xl" />
        <p
          aria-hidden="true"
          className="text-outline absolute -top-7 left-5 font-display text-7xl font-black leading-none"
        >
          {String(index + 1).padStart(2, '0')}
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">{artist.style}</p>
        <h3 className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-black uppercase leading-none text-text">
          {artist.name}
        </h3>
        <p className="mt-6 max-w-lg text-lg text-text-muted">{artist.bio}</p>

        <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider">
          {platforms.map((platform) => {
            const url = artist.links[platform.key]
            return (
              <li key={platform.key}>
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-full border border-white/20 px-4 py-2 text-text transition-colors hover:border-accent hover:text-accent"
                  >
                    {platform.label}
                  </a>
                ) : (
                  <span className="block rounded-full border border-white/10 px-4 py-2 text-text-muted/60">
                    {platform.label}
                  </span>
                )}
              </li>
            )
          })}
        </ul>

        <div className="mt-8">
          {listenUrl ? (
            <Button href={listenUrl} target="_blank" rel="noreferrer">
              Écouter l&apos;artiste
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              Écoute bientôt disponible
            </Button>
          )}
        </div>
      </Reveal>
    </article>
  )
}
