import { artists } from './artists'
import { faqs } from './faqs'
import { site } from './site'
import { members } from './team'
import { ticketTiers } from './tickets'

export const defaultContent = {
  site,
  artists,
  team: members,
  ticketTiers,
  faqs,
  // Photos et vidéos de performances : aucune par défaut, elles viennent de Directus
  gallery: [],
}
