import ArtistFeature from '../components/ArtistFeature'
import Gallery from '../components/Gallery'
import Reveal from '../components/motion/Reveal'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import { useContent } from '../context/content'

export default function Artists() {
  const { site, artists, gallery } = useContent()

  return (
    <Page accent="artists">
      <title>{`Artistes — ${site.name}`}</title>

      {/* Introduction */}
      <PageHeader
        eyebrow="La scène indépendante"
        title="Les artistes"
        description="Scene404 met en avant la scène indépendante : des artistes émergents, libres et singuliers, à découvrir en live."
      />

      {/* Présentation des artistes */}
      <Section>
        <SectionHeading index="01" label="La programmation" title="Présentation des artistes" />
        {artists.map((artist, index) => (
          <ArtistFeature key={artist.id} artist={artist} index={index} />
        ))}
      </Section>

      {/* L'expérience live */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <SectionHeading index="02" label="Sur scène" title="L’expérience live" />
        </div>
        <Gallery items={gallery} />
        <Reveal className="mx-auto mt-12 flex max-w-6xl flex-col items-start gap-8 px-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl text-xl text-text-muted sm:text-2xl">{site.liveText}</p>
          <Button to="/billetterie">Réserver ma place</Button>
        </Reveal>
      </section>
    </Page>
  )
}
