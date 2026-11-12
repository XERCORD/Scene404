import Reveal from './motion/Reveal'

export default function SectionHeading({ index, label, title }) {
  return (
    <Reveal className="mb-10 sm:mb-14">
      <p className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-text-muted">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-10 bg-accent" />
        {label}
      </p>
      <h2 className="font-display text-[clamp(1.5rem,5.5vw,3.25rem)] font-bold uppercase leading-[1.05] text-text">
        {title}
      </h2>
    </Reveal>
  )
}
