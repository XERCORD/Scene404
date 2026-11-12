export default function Card({ className = '', children }) {
  const handleMove = (event) => {
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--x', `${event.clientX - box.left}px`)
    event.currentTarget.style.setProperty('--y', `${event.clientY - box.top}px`)
  }

  return (
    <div
      onPointerMove={handleMove}
      className={`spotlight relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-6 sm:p-8 ${className}`}
    >
      {children}
    </div>
  )
}
