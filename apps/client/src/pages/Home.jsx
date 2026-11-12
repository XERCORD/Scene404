import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import ArtistCard from '../components/ArtistCard'
import HeroBackdrop from '../components/HeroBackdrop'
import Marquee from '../components/Marquee'
import ScrollText from '../components/motion/ScrollText'
import Reveal from '../components/motion/Reveal'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import Page from '../components/Page'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Section from '../components/ui/Section'
import { useContent } from '../context/content'

const reasons = [
  {
    title: 'Découverte de talents indépendants',
    description: 'Une programmation pensée pour mettre en lumière des artistes qui ne passent pas à la radio.',
  },
  {
    title: 'Une expérience musicale live',
    description: 'Du son, de la lumière et une salle à taille humaine, au plus près de la scène.',
  },
  {
    title: 'Rencontre et partage',
    description: 'Un moment convivial avant et après les sets, pour échanger avec les artistes et le public.',
  },
]

const ease = [0.22, 1, 0.36, 1]
const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const labelClass = 'font-mono text-xs uppercase tracking-[0.2em] text-text-muted'

function Hero({ site, artists }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const backdropY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  // « Scene404 » → « Scene » animé lettre par lettre + « 404 » en couleur avec effet glitch
  const [, word, digits] = site.name.match(/^(.*?)(\d*)$/)
  const infos = [
    { label: 'Date', value: site.date },
    { label: 'Lieu', value: site.venue },
    { label: 'Horaires', value: site.hours },
  ]
  const ticker = [...artists.map((artist) => artist.name), site.date, site.venue]

  return (
    <section ref={ref} className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <motion.div style={{ y: backdropY }} className="absolute inset-0 -z-10">
        <HeroBackdrop image={site.visual} name={site.name} />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-32 sm:px-6"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent"
        >
          <span aria-hidden="true" className="h-2 w-2 animate-blink rounded-full bg-accent" />
          Erreur 404 — scène trouvée
        </motion.p>

        <h1
          aria-label={site.name}
          className="break-words font-display text-[clamp(3rem,12vw,10.5rem)] font-black uppercase leading-[0.85] text-text"
        >
          <span aria-hidden="true" className="-my-[0.1em] inline-flex overflow-hidden py-[0.1em]">
            {[...word].map((letter, index) => (
              <motion.span
                key={index}
                className="inline-block"
                initial={{ y: '115%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.45 + index * 0.05 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
          {digits && (
            <motion.span
              aria-hidden="true"
              data-text={digits}
              className="glitch text-accent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + word.length * 0.05 }}
            >
              {digits}
            </motion.span>
          )}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1 }}
        >
          <p className="mt-6 max-w-3xl text-2xl font-medium text-text sm:text-4xl">{site.slogan}</p>
          <p className="mt-4 max-w-xl text-text-muted sm:text-lg">{site.heroText}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button to="/billetterie">Prendre ma place</Button>
            <Button to="/artistes" variant="secondary">
              Découvrir les artistes
            </Button>
          </div>

          <dl className="mt-10 grid border-t border-white/15 sm:grid-cols-3">
            {infos.map((info) => (
              <div
                key={info.label}
                className="border-b border-white/15 py-4 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
              >
                <dt className={labelClass}>{info.label}</dt>
                <dd className="mt-1 text-lg font-medium text-text">{info.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>

      <Marquee
        items={ticker}
        duration={35}
        className="border-y border-white/10 bg-bg/60 py-4 font-display text-sm font-bold uppercase tracking-wide text-text backdrop-blur"
      />
    </section>
  )
}

export default function Home() {
  const { site, artists, ticketTiers } = useContent()
  const lowestPrice = Math.min(...ticketTiers.map((tier) => tier.price))

  return (
    <Page accent="primary">
      <title>{`${site.name} — ${site.slogan}`}</title>

      {/* Hero / Bannière principale */}
      <Hero site={site} artists={artists} />

      {/* Présentation du concept */}
      <Section>
        <SectionHeading index="01" label="Le concept" title="Présentation du concept" />
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <ScrollText
            text={site.conceptText}
            className="text-2xl font-medium leading-snug text-text sm:text-4xl sm:leading-tight"
          />
          <Reveal>
            <Card className="flex h-full flex-col items-start gap-5">
              <p className={labelClass}>Objectifs &amp; univers musical</p>
              <p className="text-lg text-text-muted">{site.musicText}</p>
              <Button to="/equipe" variant="secondary" className="mt-auto">
                Découvrir notre histoire
              </Button>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Les artistes à l'affiche */}
      <Section>
        <SectionHeading index="02" label="Programmation" title="Les artistes à l’affiche" />
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.slice(0, 3).map((artist, index) => (
            <StaggerItem key={artist.id}>
              <ArtistCard artist={artist} index={index} />
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10">
          <Button to="/artistes" variant="secondary">
            Voir tous les artistes
          </Button>
        </Reveal>
      </Section>

      {/* Pourquoi participer ? */}
      <Section>
        <SectionHeading index="03" label="Trois bonnes raisons" title="Pourquoi participer ?" />
        <Stagger as="ol" className="border-t border-white/10">
          {reasons.map((reason, index) => (
            <StaggerItem
              as="li"
              key={reason.title}
              className="group relative isolate grid gap-3 border-b border-white/10 py-8 sm:grid-cols-[5rem_1fr_1.1fr] sm:items-baseline sm:gap-8 sm:px-4"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 origin-left scale-x-0 bg-accent/10 transition-transform duration-500 group-hover:scale-x-100"
              />
              <span className="font-mono text-sm text-accent">0{index + 1}</span>
              <h3 className="font-display text-xl font-bold uppercase leading-tight text-text sm:text-2xl">
                {reason.title}
              </h3>
              <p className="text-text-muted">{reason.description}</p>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal className="mt-10">
          <Button to="/billetterie">Vivre l&apos;expérience</Button>
        </Reveal>
      </Section>

      {/* Informations pratiques */}
      <Section>
        <SectionHeading index="04" label="À savoir" title="Informations pratiques" />
        <Reveal className="overflow-hidden rounded-3xl border border-white/10 bg-surface">
          <dl className="grid sm:grid-cols-3">
            <div className="border-b border-dashed border-white/15 p-6 sm:border-b-0 sm:border-r sm:p-8">
              <dt className={labelClass}>Date, lieu et horaires</dt>
              <dd className="mt-3 space-y-1 text-lg font-medium text-text">
                <p>{site.date}</p>
                <p>{site.venue}</p>
                <p>{site.hours}</p>
              </dd>
            </div>
            <div className="border-b border-dashed border-white/15 p-6 sm:border-b-0 sm:border-r sm:p-8">
              <dt className={labelClass}>Accès et transports</dt>
              <dd className="mt-3 text-text-muted">{site.access}</dd>
            </div>
            <div className="p-6 sm:p-8">
              <dt className={labelClass}>Tarifs</dt>
              <dd className="mt-3">
                <span className="text-text-muted">À partir de </span>
                <span className="font-display text-3xl font-black text-accent">
                  {euro.format(lowestPrice)}
                </span>
              </dd>
            </div>
          </dl>
          {/* Talon du billet : deux encoches rondes sur la ligne de découpe */}
          <div className="relative flex flex-col items-start justify-between gap-5 border-t border-dashed border-white/20 p-6 before:absolute before:-left-3 before:-top-3 before:h-6 before:w-6 before:rounded-full before:bg-bg after:absolute after:-right-3 after:-top-3 after:h-6 after:w-6 after:rounded-full after:bg-bg sm:flex-row sm:items-center sm:p-8">
            <p className={labelClass}>Entrée · {site.name}</p>
            <Button to="/billetterie">Réserver mon billet</Button>
          </div>
        </Reveal>
      </Section>
    </Page>
  )
}
