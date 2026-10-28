import { createBrowserRouter, Navigate } from 'react-router-dom'
import { LandingPage } from '@/features/auth/LandingPage'
import { AuthGatewayPage } from '@/features/auth/AuthGatewayPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { SignupPage } from '@/features/auth/SignupPage'
import { ProOnboardingPage } from '@/features/auth/ProOnboardingPage'
import { GuestBanner } from '@/components/layout/GuestBanner'
import { OnboardingWelcomePage } from '@/features/onboarding/OnboardingWelcomePage'
import { OnboardingCityPage } from '@/features/onboarding/OnboardingCityPage'
import { OnboardingInterestsPage } from '@/features/onboarding/OnboardingInterestsPage'
import { OnboardingLocationPage } from '@/features/onboarding/OnboardingLocationPage'
import { OnboardingNotificationsPage } from '@/features/onboarding/OnboardingNotificationsPage'
import { OnboardingDonePage } from '@/features/onboarding/OnboardingDonePage'
import { PlaceholderPage } from '@/components/layout/PlaceholderPage'
import { BottomNav } from '@/components/layout/BottomNav'
import { Outlet } from 'react-router-dom'

function AppShell() {
  return (
    <div className="pb-16 md:pb-0">
      <GuestBanner />
      <Outlet />
      <BottomNav />
    </div>
  )
}

// Toutes les routes de l'app existent dès la Phase 0 (navigation réelle).
// Les PlaceholderPage sont remplacés phase par phase.
export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/auth', element: <AuthGatewayPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/pro/onboarding', element: <ProOnboardingPage /> },
  { path: '/pro/pricing', element: <PlaceholderPage title="Tarifs Pro+" phase={5} /> },
  { path: '/contact', element: <PlaceholderPage title="Contact" phase={7} /> },
  { path: '/legal/terms', element: <PlaceholderPage title="CGU" phase={7} /> },
  { path: '/legal/privacy', element: <PlaceholderPage title="Politique de confidentialité" phase={7} /> },
  { path: '/legal/notice', element: <PlaceholderPage title="Mentions légales" phase={7} /> },
  { path: '/onboarding', element: <OnboardingWelcomePage /> },
  { path: '/onboarding/city', element: <OnboardingCityPage /> },
  { path: '/onboarding/interests', element: <OnboardingInterestsPage /> },
  { path: '/onboarding/location', element: <OnboardingLocationPage /> },
  { path: '/onboarding/notifications', element: <OnboardingNotificationsPage /> },
  { path: '/onboarding/done', element: <OnboardingDonePage /> },
  {
    element: <AppShell />,
    children: [
      { path: '/home', element: <PlaceholderPage title="Accueil" phase={3} /> },
      { path: '/search', element: <PlaceholderPage title="Recherche" phase={3} /> },
      { path: '/favorites', element: <PlaceholderPage title="Favoris" phase={3} /> },
      { path: '/profile', element: <PlaceholderPage title="Profil" phase={3} /> },
      { path: '/establishment/:id', element: <PlaceholderPage title="Fiche établissement" phase={3} /> },
    ],
  },
  { path: '/pro/dashboard', element: <PlaceholderPage title="Dashboard Établissement" phase={4} /> },
  { path: '/admin', element: <PlaceholderPage title="Admin" phase={6} /> },
  { path: '/404', element: <PlaceholderPage title="Page introuvable" phase={7} /> },
  { path: '*', element: <Navigate to="/404" replace /> },
])
