import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router.tsx'
import { RouterProvider } from 'react-router'
import { BookingProvider } from './context/BookingContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BookingProvider>
      <RouterProvider router={router} />
    </BookingProvider>
  </StrictMode>,
)

