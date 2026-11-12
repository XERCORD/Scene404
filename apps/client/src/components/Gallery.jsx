import Equalizer from './Equalizer'
import Marquee from './Marquee'

const placeholderWidths = ['w-64', 'w-96', 'w-72', 'w-80']
const tileClass = 'mx-2 h-56 shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-surface sm:h-80'

function Tile({ item }) {
  if (item.type === 'video') {
    return (
      <video
        src={item.src}
        aria-label={item.caption || 'Vidéo de performance'}
        muted
        loop
        autoPlay
        playsInline
        className={`${tileClass} w-auto object-cover`}
      />
    )
  }

  return (
    <img
      src={item.src}
      alt={item.caption || 'Photo de performance'}
      loading="lazy"
      className={`${tileClass} w-auto object-cover grayscale transition-[filter] duration-700 hover:grayscale-0`}
    />
  )
}

// Galerie défilante des photos et vidéos de performances ; cadres de remplacement tant qu'il n'y en a pas
export default function Gallery({ items }) {
  const tiles =
    items.length > 0
      ? items.map((item) => <Tile key={item.id} item={item} />)
      : placeholderWidths.map((width) => (
          <div
            key={width}
            className={`${tileClass} ${width} flex flex-col justify-between bg-linear-to-br from-accent/30 via-surface to-bg p-5`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
              Photo à venir
            </p>
            <Equalizer bars={14} className="h-1/2" />
          </div>
        ))

  return <Marquee items={tiles} duration={50} separator={false} pauseOnHover />
}
