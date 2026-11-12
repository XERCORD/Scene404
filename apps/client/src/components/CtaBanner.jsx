import Reveal from './motion/Reveal'

// Bloc d'appel final, plein de la couleur de la rubrique ; ses boutons utilisent les variantes « dark »
export default function CtaBanner({ title, text, children }) {
  return (
    <section className="px-5 py-16 sm:px-6 sm:py-24">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-accent px-6 py-16 text-center text-bg sm:py-24">
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[38vw] font-black leading-none opacity-10 lg:text-[26rem]"
        >
          404
        </p>
        <h2 className="mx-auto max-w-4xl font-display text-[clamp(1.75rem,6vw,4rem)] font-black uppercase leading-none">
          {title}
        </h2>
        {text && <p className="mx-auto mt-5 max-w-2xl text-lg font-medium">{text}</p>}
        <div className="mt-9 flex flex-wrap justify-center gap-4">{children}</div>
      </Reveal>
    </section>
  )
}
