// Barres d'égaliseur animées ; délais et durées varient par barre pour un rendu irrégulier
export default function Equalizer({ bars = 12, className = '' }) {
  return (
    <div aria-hidden="true" className={`flex items-end gap-[3px] ${className}`}>
      {Array.from({ length: bars }, (_, index) => (
        <span
          key={index}
          className="h-full flex-1 origin-bottom animate-equalizer rounded-t-sm bg-linear-to-t from-accent to-accent/20"
          style={{
            animationDelay: `-${((index * 37) % 100) / 80}s`,
            animationDuration: `${0.8 + ((index * 53) % 70) / 100}s`,
          }}
        />
      ))}
    </div>
  )
}
