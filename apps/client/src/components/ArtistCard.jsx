import Tilt from './motion/Tilt'
import Portrait from './Portrait'

// Carte affiche d'un artiste (aperçu de la page d'accueil)
export default function ArtistCard({ artist, index }) {
  return (
    <Tilt className="h-full">
      <article className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10">
        <Portrait image={artist.image} name={artist.name} className="absolute inset-0" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-bg via-bg/40 to-transparent"
        />
        <p className="absolute left-5 top-5 font-mono text-xs text-text-muted">
          {String(index + 1).padStart(2, '0')}
        </p>
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {artist.style}
          </p>
          <h3 className="font-display text-2xl font-black uppercase leading-none text-text">
            {artist.name}
          </h3>
          <p className="mt-3 text-sm text-text-muted">{artist.shortBio}</p>
        </div>
      </article>
    </Tilt>
  )
}
