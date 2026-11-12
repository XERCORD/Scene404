import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/space-grotesk'
import '@fontsource-variable/unbounded'
import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ContentProvider from './context/ContentProvider.jsx'
import './styles/index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ContentProvider>
          <App />
        </ContentProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
