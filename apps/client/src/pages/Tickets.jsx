// TODO: brancher la réservation sur ticketService et le module de paiement une fois l'API prête
import { useState } from 'react'
import CtaBanner from '../components/CtaBanner'
import EventVisual from '../components/EventVisual'
import Faq from '../components/Faq'
import Reveal from '../components/motion/Reveal'
import { Stagger, StaggerItem } from '../components/motion/Stagger'
import Page from '../components/Page'
import PageHeader from '../components/PageHeader'
import SectionHeading from '../components/SectionHeading'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Section from '../components/ui/Section'
import { useContent } from '../context/content'

const MAX_QUANTITY = 10
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const euro = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
const labelClass = 'font-mono text-xs uppercase tracking-[0.2em] text-text-muted'
const stepperClass =
  'h-10 w-10 rounded-full border border-white/15 text-lg text-text transition-colors hover:border-accent hover:text-accent disabled:opacity-30'

const reassurances = [
  {
    title: 'Confirmation de réservation',
    description: 'Un récapitulatif de votre réservation vous est présenté avant toute validation.',
  },
  {
    title: 'Conditions d’achat',
    description: 'Les conditions de vente et d’annulation seront publiées à l’ouverture de la billetterie.',
  },
  {
    title: 'Informations pratiques',
    description: 'Date, lieu, horaires et accès sont rappelés sur cette page et mis à jour en continu.',
  },
]

export default function Tickets() {
  const { site, ticketTiers, faqs } = useContent()
  const [tierId, setTierId] = useState(ticketTiers[0].id)
  const [quantity, setQuantity] = useState(1)
  const [buyer, setBuyer] = useState({ name: '', email: '' })
  const [errors, setErrors] = useState({})
  const [order, setOrder] = useState(null)

  const tier = ticketTiers.find((item) => item.id === tierId) ?? ticketTiers[0]
  const total = tier.price * quantity

  const updateBuyer = (field) => (event) => {
    setBuyer((current) => ({ ...current, [field]: event.target.value }))
    setOrder(null)
  }

  const changeQuantity = (delta) => {
    setQuantity((current) => Math.min(MAX_QUANTITY, Math.max(1, current + delta)))
    setOrder(null)
  }

  const selectTier = (id) => {
    setTierId(id)
    setOrder(null)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!buyer.name.trim()) nextErrors.name = 'Indiquez votre nom.'
    if (!emailPattern.test(buyer.email.trim())) {
      nextErrors.email = 'Indiquez une adresse e-mail valide.'
    }

    setErrors(nextErrors)
    setOrder(
      Object.keys(nextErrors).length === 0
        ? { label: tier.label, quantity, total, name: buyer.name.trim() }
        : null,
    )
  }

  return (
    <Page accent="tickets">
      <title>{`Billetterie — ${site.name}`}</title>

      {/* Présentation de l'événement */}
      <PageHeader
        eyebrow="Billetterie"
        title={site.name}
        description={`${site.date} · ${site.venue} · ${site.hours}`}
      />
      <Reveal className="mx-auto max-w-6xl px-5 sm:px-6">
        <EventVisual image={site.visual} name={site.name} />
      </Reveal>

      {/* Choix des billets */}
      <Section>
        <SectionHeading index="01" label="Tarifs" title="Choix des billets" />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {ticketTiers.map((item) => {
            const isSelected = item.id === tier.id
            return (
              <StaggerItem key={item.id}>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectTier(item.id)}
                  className={`flex h-full w-full flex-col overflow-hidden rounded-3xl border bg-surface text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    isSelected
                      ? '-translate-y-2 border-accent shadow-[0_24px_60px_-24px_var(--accent)]'
                      : 'border-white/10 hover:-translate-y-1 hover:border-white/30'
                  }`}
                >
                  <span className="flex flex-1 flex-col gap-4 p-6 sm:p-8">
                    <span className={labelClass}>{item.label}</span>
                    <span
                      className={`font-display text-5xl font-black leading-none transition-colors ${
                        isSelected ? 'text-accent' : 'text-text'
                      }`}
                    >
                      {euro.format(item.price)}
                    </span>
                    <span className="text-text-muted">{item.description}</span>
                  </span>
                  {/* Talon du billet : deux encoches rondes sur la ligne de découpe */}
                  <span className="relative flex items-center justify-between border-t border-dashed border-white/20 px-6 py-4 before:absolute before:-left-3 before:-top-3 before:h-6 before:w-6 before:rounded-full before:bg-bg after:absolute after:-right-3 after:-top-3 after:h-6 after:w-6 after:rounded-full after:bg-bg sm:px-8">
                    <span className={`font-mono text-xs uppercase tracking-[0.2em] ${isSelected ? 'text-accent' : 'text-text-muted'}`}>
                      {isSelected ? 'Sélectionné' : 'Choisir'}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`h-3 w-3 rounded-full border transition-colors ${
                        isSelected ? 'border-accent bg-accent' : 'border-white/30'
                      }`}
                    />
                  </span>
                </button>
              </StaggerItem>
            )
          })}
        </Stagger>
        <p className="mt-6 font-mono text-xs text-text-muted">
          Prix et conditions à confirmer avant l&apos;ouverture de la billetterie.
        </p>
      </Section>

      {/* Réservation */}
      <Section id="reservation">
        <SectionHeading index="02" label="Votre commande" title="Réservation" />
        <Reveal>
          <form onSubmit={handleSubmit} noValidate>
            <Card className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className={labelClass}>Billet sélectionné</p>
                    <p className="mt-1 text-xl font-semibold text-text">
                      {tier.label} — {euro.format(tier.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => changeQuantity(-1)}
                      disabled={quantity <= 1}
                      aria-label="Retirer un billet"
                      className={stepperClass}
                    >
                      −
                    </button>
                    <span
                      aria-live="polite"
                      aria-label="Quantité"
                      className="w-8 text-center font-display text-xl font-bold text-text"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(1)}
                      disabled={quantity >= MAX_QUANTITY}
                      aria-label="Ajouter un billet"
                      className={stepperClass}
                    >
                      +
                    </button>
                  </div>
                </div>

                <Input
                  id="buyer-name"
                  label="Nom complet"
                  type="text"
                  autoComplete="name"
                  value={buyer.name}
                  onChange={updateBuyer('name')}
                  error={errors.name}
                />
                <Input
                  id="buyer-email"
                  label="E-mail"
                  type="email"
                  autoComplete="email"
                  value={buyer.email}
                  onChange={updateBuyer('email')}
                  error={errors.email}
                />
              </div>

              <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-bg/50 p-6">
                <div>
                  <p className={labelClass}>Total</p>
                  <p className="mt-2 font-display text-5xl font-black leading-none text-accent">
                    {euro.format(total)}
                  </p>
                  <p className="mt-3 text-sm text-text-muted">
                    {quantity} × {tier.label}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Button type="submit">Valider ma réservation</Button>
                  <p className="font-mono text-xs text-text-muted">Paiement sécurisé — bientôt disponible</p>
                </div>

                {order && (
                  <div role="status" className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
                    <p className="font-semibold text-text">
                      Récapitulatif : {order.quantity} × {order.label} pour {order.name} —{' '}
                      {euro.format(order.total)}
                    </p>
                    <p className="mt-1 text-text-muted">
                      Le paiement en ligne n&apos;est pas encore ouvert : aucune réservation n&apos;a
                      été enregistrée pour le moment.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </form>
        </Reveal>
      </Section>

      {/* Message de réassurance */}
      <Section>
        <SectionHeading index="03" label="En toute confiance" title="Réservez l’esprit tranquille" />
        <Stagger className="grid gap-6 md:grid-cols-3">
          {reassurances.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-bold text-bg"
                >
                  ✓
                </span>
                <h3 className="mt-6 font-display text-base font-bold uppercase leading-tight text-text">
                  {item.title}
                </h3>
                <p className="mt-3 text-text-muted">{item.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading index="04" label="FAQ" title="Questions fréquentes" />
        <Faq items={faqs.billetterie} />
      </Section>

      {/* CTA final */}
      <CtaBanner title="Votre place vous attend">
        <Button href="#reservation" variant="dark">
          Acheter mon billet
        </Button>
      </CtaBanner>
    </Page>
  )
}
