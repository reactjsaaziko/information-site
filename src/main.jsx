import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

// Toggle between experiences:
// - App: Original hero with globe
// - VoyagerApp: Cinematic "Blue Dot to Global Trade" experience
const USE_VOYAGER_EXPERIENCE = false;

const AppComponent = USE_VOYAGER_EXPERIENCE
  ? (await import('./VoyagerApp.jsx')).default
  : (await import('./App.jsx')).default;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
