// TODO: brancher le formulaire sur une route API de contact une fois disponible
import { useState } from 'react'
import CtaBanner from '../components/CtaBanner'
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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const emptyForm = { name: '', email: '', subject: '', message: '' }
const labelClass = 'font-mono text-xs uppercase tracking-[0.2em] text-text-muted'
const contactLinkClass =
  'mt-3 block break-words text-xl font-medium text-text transition-colors hover:text-accent'

export default function Contact() {
  const { site, faqs } = useContent()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [isValidated, setIsValidated] = useState(false)

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setIsValidated(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Indiquez votre nom.'
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Indiquez une adresse e-mail valide.'
    }
    if (!form.subject.trim()) nextErrors.subject = 'Indiquez l’objet de votre message.'
    if (!form.message.trim()) nextErrors.message = 'Écrivez votre message.'

    setErrors(nextErrors)
    setIsValidated(Object.keys(nextErrors).length === 0)
  }

  const mailto = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
    form.subject,
  )}&body=${encodeURIComponent(`${form.message}\n\n${form.name}`)}`

  return (
    <Page accent="contact">
      <title>{`Contact — ${site.name}`}</title>

      {/* Introduction */}
      <PageHeader
        eyebrow="Contact"
        title="Écrivez-nous"
        description="Bienvenue ! Une question sur l’événement, les billets ou les artistes ? L’équipe Scene404 vous répond avec plaisir."
      />

      {/* Coordonnées */}
      <Section>
        <SectionHeading index="01" label="Où nous trouver" title="Coordonnées" />
        <Stagger className="grid gap-6 md:grid-cols-3">
          <StaggerItem>
            <Card className="h-full">
              <h3 className={labelClass}>Adresse e-mail</h3>
              <a href={`mailto:${site.contactEmail}`} className={contactLinkClass}>
                {site.contactEmail}
              </a>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="h-full">
              <h3 className={labelClass}>Réseaux sociaux</h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xl font-medium text-text">
                {site.socials.map((social) => (
                  <li key={social.label}>
                    {social.url ? (
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noreferrer"
                        className="transition-colors hover:text-accent"
                      >
                        {social.label}
                      </a>
                    ) : (
                      social.label
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="h-full">
              <h3 className={labelClass}>Contact billetterie</h3>
              <a href={`mailto:${site.ticketsEmail}`} className={contactLinkClass}>
                {site.ticketsEmail}
              </a>
            </Card>
          </StaggerItem>
        </Stagger>
      </Section>

      {/* Formulaire de contact */}
      <Section>
        <SectionHeading index="02" label="Votre message" title="Formulaire de contact" />
        <Reveal>
          <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-3xl">
            <Card className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  id="contact-name"
                  label="Nom"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  error={errors.name}
                />
                <Input
                  id="contact-email"
                  label="E-mail"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  error={errors.email}
                />
              </div>
              <Input
                id="contact-subject"
                label="Objet"
                type="text"
                value={form.subject}
                onChange={update('subject')}
                error={errors.subject}
              />
              <Input
                id="contact-message"
                label="Message"
                multiline
                rows={6}
                value={form.message}
                onChange={update('message')}
                error={errors.message}
              />
              <div>
                <Button type="submit">Envoyer</Button>
              </div>

              {isValidated && (
                <div role="status" className="rounded-xl border border-accent/40 bg-accent/10 p-4 text-sm">
                  <p className="text-text-muted">
                    L&apos;envoi direct depuis le site n&apos;est pas encore activé : votre message
                    n&apos;a pas été transmis.
                  </p>
                  <a href={mailto} className="mt-2 inline-block font-semibold text-accent hover:underline">
                    L&apos;envoyer depuis ma messagerie
                  </a>
                </div>
              )}
            </Card>
          </form>
        </Reveal>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeading index="03" label="FAQ" title="Questions fréquentes" />
        <Faq items={faqs.contact} />
      </Section>

      {/* CTA final */}
      <CtaBanner title="On se retrouve au concert ?">
        <Button to="/billetterie" variant="dark">
          Prendre mon billet
        </Button>
      </CtaBanner>
    </Page>
  )
}
