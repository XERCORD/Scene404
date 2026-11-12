import Page from '../components/Page'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <Page accent="primary">
      <title>Page introuvable — Scene404</title>
      <section className="mx-auto flex min-h-svh max-w-6xl flex-col items-center justify-center gap-6 px-5 text-center">
        <h1
          data-text="404"
          className="glitch font-display text-[clamp(6rem,30vw,18rem)] font-black leading-none text-accent"
        >
          404
        </h1>
        <p className="font-display text-xl font-bold uppercase text-text sm:text-3xl">
          Cette scène n&apos;existe pas
        </p>
        <p className="text-text-muted">La page que vous cherchez est introuvable.</p>
        <Button to="/">Retour à l&apos;accueil</Button>
      </section>
    </Page>
  )
}
