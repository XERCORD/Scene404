import { useEffect, useState } from 'react'
import Equalizer from '../components/Equalizer'
import { defaultContent } from '../data'
import { fetchContent, isCmsEnabled } from '../services/contentService'
import { ContentContext } from './content'

export default function ContentProvider({ children }) {
  const [content, setContent] = useState(defaultContent)
  const [isLoading, setIsLoading] = useState(isCmsEnabled)

  useEffect(() => {
    if (!isCmsEnabled) return undefined

    let cancelled = false

    fetchContent()
      .then((cmsContent) => {
        if (!cancelled) setContent(cmsContent)
      })
      .catch((error) => {
        console.warn('Directus indisponible, contenu local utilisé :', error)
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  if (isLoading) {
    return (
      <div role="status" className="flex min-h-screen flex-col items-center justify-center gap-6">
        <Equalizer bars={9} className="h-12 w-24" />
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-text-muted">Chargement</p>
      </div>
    )
  }

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}
