import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App.tsx'
import { GraduationInvitation } from './routes/GraduationInvitation.tsx'

// Set to false to restore the original portfolio and all its routes.
const SHOW_GRADUATION_SITE = true

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {SHOW_GRADUATION_SITE ? <GraduationInvitation /> : <App />}
  </StrictMode>,
)
