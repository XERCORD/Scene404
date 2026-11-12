// Bandeau défilant en boucle : la liste est doublée pour que la boucle soit invisible
export default function Marquee({ items, duration = 30, separator = true, pauseOnHover = false, className = '' }) {
  const repeats = Math.max(1, Math.ceil(8 / items.length))
  const filled = Array.from({ length: repeats }).flatMap(() => items)

  const row = (isCopy) => (
    <ul aria-hidden={isCopy || undefined} className="flex shrink-0 items-center">
      {filled.map((item, index) => (
        <li key={index} className="flex shrink-0 items-center whitespace-nowrap">
          {item}
          {separator && (
            <span aria-hidden="true" className="mx-6 text-accent">
              ✦
            </span>
          )}
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`group/marquee flex overflow-hidden ${className}`}>
      <div
        className={`flex w-max animate-marquee ${
          pauseOnHover ? 'group-hover/marquee:[animation-play-state:paused]' : ''
        }`}
        style={{ '--marquee-duration': `${duration}s` }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}
