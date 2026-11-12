import { createContext, useContext } from 'react'
import { defaultContent } from '../data'

export const ContentContext = createContext(defaultContent)

export function useContent() {
  return useContext(ContentContext)
}
