// Initialise Directus pour Scene404 : collections, lecture publique et contenu d'exemple.
// Relançable sans risque : ne recrée ni n'écrase ce qui existe déjà.
// Usage : node infra/directus/setup.mjs   (Directus démarré, Node 18+)

import { artists } from '../../apps/client/src/data/artists.js'
import { faqs } from '../../apps/client/src/data/faqs.js'
import { site } from '../../apps/client/src/data/site.js'
import { members } from '../../apps/client/src/data/team.js'
import { ticketTiers } from '../../apps/client/src/data/tickets.js'

// Valeurs par défaut alignées sur infra/docker-compose.yml (développement local uniquement)
const url = (process.env.DIRECTUS_URL ?? 'http://localhost:8055').replace(/\/+$/, '')
const email = process.env.DIRECTUS_ADMIN_EMAIL ?? 'admin@example.com'
const password = process.env.DIRECTUS_ADMIN_PASSWORD ?? 'scene404-dev'

let token = ''

async function api(method, path, body) {
  const response = await fetch(`${url}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  })

  const text = await response.text()
  if (!response.ok) {
    throw new Error(`${method} ${path} → ${response.status} ${text}`)
  }
  return text ? JSON.parse(text).data : null
}

const id = {
  field: 'id',
  type: 'integer',
  meta: { hidden: true, readonly: true, interface: 'input' },
  schema: { is_primary_key: true, has_auto_increment: true },
}
const sort = { field: 'sort', type: 'integer', meta: { hidden: true, interface: 'input' }, schema: {} }

const input = (field, note, required = false) => ({
  field,
  type: 'string',
  meta: { interface: 'input', note, required, width: 'half' },
  schema: {},
})
const longText = (field, note) => ({
  field,
  type: 'text',
  meta: { interface: 'input-multiline', note },
  schema: {},
})
const image = (field, note) => ({
  field,
  type: 'uuid',
  meta: { interface: 'file-image', special: ['file'], note },
  schema: {},
})

const collections = [
  {
    collection: 'site',
    meta: { icon: 'home', note: 'Textes et infos générales du site', singleton: true },
    fields: [
      id,
      input('name', 'Nom de l’événement'),
      input('slogan', 'Slogan (titre de la page d’accueil)'),
      longText('hero_text', 'Texte d’accroche sous le slogan'),
      input('event_date', 'Date affichée, ex. « Samedi 14 juin 2027 »'),
      input('venue', 'Lieu'),
      input('hours', 'Horaires'),
      longText('access', 'Accès et transports'),
      image('visual', 'Visuel principal du concert'),
      longText('concept_text', 'Accueil — présentation de l’événement'),
      longText('music_text', 'Accueil — univers musical'),
      longText('live_text', 'Artistes — présentation de la programmation (expérience live)'),
      longText('history_origin', 'Équipe — origine du projet'),
      longText('history_genesis', 'Équipe — genèse de l’événement'),
      input('contact_email', 'E-mail de contact'),
      input('tickets_email', 'E-mail de la billetterie'),
      input('instagram_url', 'Lien Instagram'),
      input('tiktok_url', 'Lien TikTok'),
      input('facebook_url', 'Lien Facebook'),
    ],
    images: ['visual'],
  },
  {
    collection: 'artists',
    meta: { icon: 'mic', note: 'Artistes à l’affiche', sort_field: 'sort', display_template: '{{name}}' },
    fields: [
      id,
      sort,
      input('name', 'Nom ou nom de scène', true),
      input('style', 'Style musical'),
      image('image', 'Photo de l’artiste'),
      longText('short_bio', 'Courte biographie (page d’accueil)'),
      longText('bio', 'Biographie complète (page Artistes)'),
      input('spotify_url', 'Lien Spotify'),
      input('youtube_url', 'Lien YouTube'),
      input('soundcloud_url', 'Lien SoundCloud'),
    ],
    images: ['image'],
  },
  {
    collection: 'team_members',
    meta: { icon: 'groups', note: 'Équipe organisatrice', sort_field: 'sort', display_template: '{{name}} — {{role}}' },
    fields: [
      id,
      sort,
      input('name', 'Prénom', true),
      input('role', 'Rôle'),
      image('image', 'Photo'),
      longText('about', 'Présentation'),
    ],
    images: ['image'],
  },
  {
    collection: 'gallery',
    meta: { icon: 'photo_library', note: 'Photos et vidéos de performances (page Artistes)', sort_field: 'sort', display_template: '{{caption}}' },
    fields: [
      id,
      sort,
      {
        field: 'file',
        type: 'uuid',
        meta: { interface: 'file', special: ['file'], note: 'Photo ou vidéo', required: true },
        schema: {},
      },
      input('caption', 'Légende (texte alternatif)'),
    ],
    images: ['file'],
  },
  {
    collection: 'ticket_tiers',
    meta: { icon: 'confirmation_number', note: 'Tarifs de la billetterie', sort_field: 'sort', display_template: '{{label}} — {{price}} €' },
    fields: [
      id,
      sort,
      input('label', 'Nom du tarif', true),
      {
        field: 'price',
        type: 'decimal',
        meta: { interface: 'input', note: 'Prix en euros', required: true, width: 'half' },
        schema: { numeric_precision: 6, numeric_scale: 2 },
      },
      longText('description', 'Conditions du tarif'),
    ],
    images: [],
  },
  {
    collection: 'faqs',
    meta: { icon: 'help', note: 'Questions fréquentes', sort_field: 'sort', display_template: '{{question}}' },
    fields: [
      id,
      sort,
      {
        field: 'page',
        type: 'string',
        meta: {
          interface: 'select-dropdown',
          note: 'Page où la question s’affiche',
          required: true,
          width: 'half',
          options: {
            choices: [
              { text: 'Billetterie', value: 'billetterie' },
              { text: 'Contact', value: 'contact' },
            ],
          },
        },
        schema: {},
      },
      input('question', 'Question', true),
      longText('answer', 'Réponse'),
    ],
    images: [],
  },
]

async function createFileRelation(collection, field) {
  await api('POST', '/relations', {
    collection,
    field,
    related_collection: 'directus_files',
    schema: { on_delete: 'SET NULL' },
  })
}

// Collection déjà créée par une version précédente du script : on ajoute seulement les champs manquants
async function addMissingFields(definition, images) {
  const current = new Set((await api('GET', `/fields/${definition.collection}`)).map((item) => item.field))
  const missing = definition.fields.filter((item) => !current.has(item.field))

  for (const field of missing) {
    await api('POST', `/fields/${definition.collection}`, field)
    if (images.includes(field.field)) await createFileRelation(definition.collection, field.field)
    console.log(`+ champ ${definition.collection}.${field.field} ajouté`)
  }
  if (missing.length === 0) console.log(`= collection ${definition.collection} déjà à jour`)
}

async function createCollections() {
  const existing = new Set((await api('GET', '/collections')).map((item) => item.collection))

  for (const { images, ...definition } of collections) {
    if (existing.has(definition.collection)) {
      await addMissingFields(definition, images)
      continue
    }

    await api('POST', '/collections', { ...definition, schema: {} })
    for (const field of images) {
      await createFileRelation(definition.collection, field)
    }
    console.log(`+ collection ${definition.collection} créée`)
  }
}

// Le site lit Directus sans authentification : lecture seule ouverte sur ces collections et les fichiers
async function allowPublicRead() {
  // La politique publique est celle rattachée à aucun rôle ni utilisateur
  const access = await api('GET', '/access?filter[role][_null]=true&filter[user][_null]=true&fields=policy')
  const policy = access[0]?.policy
  if (!policy) {
    throw new Error('Politique « Public » introuvable : ouvrez la lecture publique à la main dans Directus (Réglages → Politiques d’accès).')
  }

  const current = await api('GET', `/permissions?filter[policy][_eq]=${policy}&filter[action][_eq]=read&fields=collection&limit=-1`)
  const readable = new Set(current.map((permission) => permission.collection))

  for (const collection of [...collections.map((item) => item.collection), 'directus_files']) {
    if (readable.has(collection)) continue
    await api('POST', '/permissions', {
      policy,
      collection,
      action: 'read',
      fields: ['*'],
      permission: {},
      validation: null,
    })
    console.log(`+ lecture publique ouverte sur ${collection}`)
  }
}

async function seedIfEmpty(collection, items) {
  const current = await api('GET', `/items/${collection}?limit=1&fields=id`)
  if (current.length > 0) {
    console.log(`= ${collection} contient déjà des données`)
    return
  }
  await api(
    'POST',
    `/items/${collection}`,
    items.map((item, index) => ({ sort: index + 1, ...item })),
  )
  console.log(`+ ${collection} : ${items.length} éléments d'exemple ajoutés`)
}

async function seed() {
  const currentSite = await api('GET', '/items/site?fields=name')
  if (currentSite?.name) {
    console.log('= site contient déjà des données')
  } else {
    await api('PATCH', '/items/site', {
      name: site.name,
      slogan: site.slogan,
      hero_text: site.heroText,
      event_date: site.date,
      venue: site.venue,
      hours: site.hours,
      access: site.access,
      concept_text: site.conceptText,
      music_text: site.musicText,
      live_text: site.liveText,
      history_origin: site.historyOrigin,
      history_genesis: site.historyGenesis,
      contact_email: site.contactEmail,
      tickets_email: site.ticketsEmail,
    })
    console.log('+ site : textes d\'exemple ajoutés')
  }

  await seedIfEmpty(
    'artists',
    artists.map((artist) => ({
      name: artist.name,
      style: artist.style,
      short_bio: artist.shortBio,
      bio: artist.bio,
    })),
  )
  await seedIfEmpty(
    'team_members',
    members.map((member) => ({ name: member.name, role: member.role, about: member.about })),
  )
  await seedIfEmpty(
    'ticket_tiers',
    ticketTiers.map((tier) => ({ label: tier.label, price: tier.price, description: tier.description })),
  )
  await seedIfEmpty(
    'faqs',
    Object.entries(faqs).flatMap(([page, items]) => items.map((item) => ({ page, ...item }))),
  )
}

try {
  const session = await api('POST', '/auth/login', { email, password })
  token = session.access_token

  await createCollections()
  await allowPublicRead()
  await seed()

  console.log(`\nDirectus est prêt : ${url}/admin`)
} catch (error) {
  console.error(`Échec de l'initialisation de Directus (${url}) :`, error.cause?.code ?? error.message)
  process.exitCode = 1
}
