import { motion, useScroll } from 'motion/react'
import { useRef } from 'react'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/motion/Reveal'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import Portrait from '../components/Portrait'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Section from '../components/ui/Section'
import { useContent } from '../context/content'
import { missions, values } from '../data/team'

function History({ steps }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] })

  return (
    <div ref={ref} className="relative grid gap-12 pl-8 sm:pl-14">
      <span aria-hidden="true" className="absolute left-0 top-0 h-full w-px bg-white/10" />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: scrollYProgress }}
        className="absolute left-0 top-0 h-full w-px origin-top bg-accent"
      />
      {steps.map((step) => (
        <Reveal key={step.title} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-8 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-accent sm:-left-14"
          />
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{step.title}</h3>
          <p className="mt-3 max-w-3xl text-2xl font-medium leading-snug text-text sm:text-3xl">
            {step.text}
          </p>
        </Reveal>
      ))}
    </div>
  )
}

export default function Team() {
  const { site, team } = useContent()

  return (
    <Page accent="team">
      <title>{`Équipe 404 — ${site.name}`}</title>

      <PageHeader
        eyebrow="Qui sommes-nous ?"
        title="Équipe 404"
        description="Les personnes et les idées derrière la soirée."
      />

      {/* Notre histoire */}
      <Section>
        <SectionHeading index="01" label="D’où ça vient" title="Notre histoire" />
        <History
          steps={[
            { title: 'Origine du projet', text: site.historyOrigin },
            { title: 'Genèse de l’événement', text: site.historyGenesis },
          ]}
        />
      </Section>

      {/* Notre mission */}
      <Section>
        <SectionHeading index="02" label="Ce qui nous anime" title="Notre mission" />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {missions.map((mission, index) => (
            <StaggerItem key={mission.title}>
              <Card className="h-full">
                <p className="font-mono text-sm text-accent">0{index + 1}</p>
                <h3 className="mt-6 font-display text-lg font-bold uppercase leading-tight text-text">
                  {mission.title}
                </h3>
                <p className="mt-3 text-text-muted">{mission.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* L'équipe organisatrice */}
      <Section>
        <SectionHeading index="03" label="Les visages" title="L’équipe organisatrice" />
        <Stagger className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {team.map((member) => (
            <StaggerItem key={member.id} className="group">
              <Portrait image={member.image} name={member.name} className="aspect-square rounded-3xl" />
              <p className="mt-4 font-display text-lg font-bold uppercase text-text">{member.name}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-accent">
                {member.role}
              </p>
              <p className="mt-2 text-sm text-text-muted">{member.about}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Nos valeurs */}
      <Section>
        <SectionHeading index="04" label="Ce qu’on défend" title="Nos valeurs" />
        <Stagger className="grid border-l border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <StaggerItem
              key={value.title}
              className="group border-b border-r border-white/10 p-6 transition-colors duration-500 hover:bg-accent sm:p-8"
            >
              <p
                aria-hidden="true"
                className="text-outline font-display text-6xl font-black leading-none transition-colors group-hover:text-bg"
              >
                {index + 1}
              </p>
              <h3 className="mt-8 font-display text-base font-bold uppercase text-text transition-colors group-hover:text-bg">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-text-muted transition-colors group-hover:text-bg">
                {value.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* CTA final */}
      <CtaBanner title="Soutiens la scène indépendante">
        <Button to="/artistes" variant="outlineDark">
          Découvrir les artistes
        </Button>
        <Button to="/billetterie" variant="dark">
          Participer à l&apos;événement
        </Button>
      </CtaBanner>
    </Page>
  )
}
