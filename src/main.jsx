import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/landingPage.jsx'
import LoginPage from './pages/login.jsx'
import SignupPage from './pages/signup.jsx'
import HomePage from './pages/home.jsx'
import UserProfile from './pages/profile.jsx'
import ShopPage from './pages/shop.jsx'
import ServiceBooking from './pages/service.jsx'
import CommunityPage from './pages/community.jsx'
import ContactPage from './pages/contact.jsx'
import AboutPage from './pages/about.jsx'
import NotFoundPage from './pages/default.jsx'
import Layout from './layout.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
      {
        path: "signup",
        element: <SignupPage />
      },
      {
        path: "home",
        element: <HomePage />
      },
      {
        path: "/home/profile",
        element: <UserProfile />
      },
      {
        path: "/home/shop",
        element: <ShopPage />
      },
      {
        path: "/home/services",
        element: <ServiceBooking />
      },
      {
        path: "/home/community",
        element: <CommunityPage />
      },
      {
        path: "contact",
        element: <ContactPage />
      },
      {
        path: "about",
        element: <AboutPage />
      },
      {
        path: "*",
        element: <NotFoundPage />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
