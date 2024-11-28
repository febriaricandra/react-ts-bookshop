import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { FlashMessageProvider } from './context/FlashMessageContext'
import { AuthProvider } from './context/AuthContext.tsx';
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <FlashMessageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FlashMessageProvider>
    </AuthProvider>
  </StrictMode>,
)
