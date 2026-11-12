import { defaultContent } from '../data'

const baseUrl = (import.meta.env.VITE_DIRECTUS_URL ?? '').replace(/\/+$/, '')

export const isCmsEnabled = Boolean(baseUrl)

async function getItems(collection, query = '') {
  const response = await fetch(`${baseUrl}/items/${collection}${query}`)
  if (!response.ok) {
    throw new Error(`Directus a répondu ${response.status} pour « ${collection} »`)
  }
  const { data } = await response.json()
  return data
}

function assetUrl(fileId, width = 900) {
  return fileId ? `${baseUrl}/assets/${fileId}?width=${width}&quality=80` : ''
}

// Une liste vide côté Directus garde le contenu d'exemple, pour ne jamais afficher une page vide
function orDefault(items, fallback) {
  return items.length > 0 ? items : fallback
}

function toSite(item) {
  const fallback = defaultContent.site
  const socials = [
    { label: 'Instagram', url: item.instagram_url ?? '' },
    { label: 'TikTok', url: item.tiktok_url ?? '' },
    { label: 'Facebook', url: item.facebook_url ?? '' },
  ]

  return {
    name: item.name || fallback.name,
    slogan: item.slogan || fallback.slogan,
    heroText: item.hero_text || fallback.heroText,
    date: item.event_date || fallback.date,
    venue: item.venue || fallback.venue,
    hours: item.hours || fallback.hours,
    access: item.access || fallback.access,
    visual: assetUrl(item.visual, 1920),
    conceptText: item.concept_text || fallback.conceptText,
    musicText: item.music_text || fallback.musicText,
    liveText: item.live_text || fallback.liveText,
    historyOrigin: item.history_origin || fallback.historyOrigin,
    historyGenesis: item.history_genesis || fallback.historyGenesis,
    contactEmail: item.contact_email || fallback.contactEmail,
    ticketsEmail: item.tickets_email || fallback.ticketsEmail,
    socials,
  }
}

function toArtist(item) {
  return {
    id: item.id,
    name: item.name,
    style: item.style ?? '',
    shortBio: item.short_bio ?? '',
    bio: item.bio || item.short_bio || '',
    image: assetUrl(item.image),
    links: {
      spotify: item.spotify_url ?? '',
      youtube: item.youtube_url ?? '',
      soundcloud: item.soundcloud_url ?? '',
    },
  }
}

function toMember(item) {
  return {
    id: item.id,
    name: item.name,
    role: item.role ?? '',
    about: item.about ?? '',
    image: assetUrl(item.image),
  }
}

function toTier(item) {
  return {
    id: String(item.id),
    label: item.label,
    price: Number(item.price),
    description: item.description ?? '',
  }
}

// Photo ou vidéo de performance : les vidéos sont servies telles quelles, sans redimensionnement
function toMedia(item) {
  const isVideo = item.file?.type?.startsWith('video/')
  return {
    id: item.id,
    type: isVideo ? 'video' : 'image',
    src: isVideo ? `${baseUrl}/assets/${item.file.id}` : assetUrl(item.file?.id, 1200),
    caption: item.caption ?? '',
  }
}

function toFaqs(items) {
  const byPage = (page) =>
    items
      .filter((item) => item.page === page)
      .map((item) => ({ question: item.question, answer: item.answer }))

  return {
    billetterie: orDefault(byPage('billetterie'), defaultContent.faqs.billetterie),
    contact: orDefault(byPage('contact'), defaultContent.faqs.contact),
  }
}

export async function fetchContent() {
  const [site, artists, team, tiers, faqs, gallery] = await Promise.all([
    getItems('site'),
    getItems('artists', '?sort=sort'),
    getItems('team_members', '?sort=sort'),
    getItems('ticket_tiers', '?sort=sort'),
    getItems('faqs', '?sort=sort'),
    // La galerie est facultative : un Directus sans cette collection ne doit pas bloquer le reste
    getItems('gallery', '?sort=sort&fields=id,caption,file.id,file.type').catch(() => []),
  ])

  return {
    site: toSite(site ?? {}),
    artists: orDefault(artists.map(toArtist), defaultContent.artists),
    team: orDefault(team.map(toMember), defaultContent.team),
    ticketTiers: orDefault(tiers.map(toTier), defaultContent.ticketTiers),
    faqs: toFaqs(faqs),
    gallery: gallery.filter((item) => item.file).map(toMedia),
  }
}
