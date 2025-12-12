import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './router.tsx'
import { RouterProvider } from 'react-router'
import { BookingProvider } from './context/BookingContext.tsx'
import AuthProvider from './context/AuthContext'
import { MovieProvider } from "./context/MovieContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BookingProvider>
        <MovieProvider>
          <RouterProvider router={router} />
        </MovieProvider>
      </BookingProvider>
    </AuthProvider>
  </StrictMode >,
)

