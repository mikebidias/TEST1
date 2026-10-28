import { create } from 'zustand'
import type { AppUser, City, UserRole } from '@/types'
import { MOCK_USERS } from '@/mocks/data'

// Auth mockée pour la Phase 0 : n'importe quel numéro + n'importe quel code à
// 6 chiffres "fonctionne". À remplacer par de vrais appels API (OTP réel,
// JWT) une fois le backend disponible — voir lib/api.ts à créer plus tard.

const STORAGE_KEY = 'komot_session'

interface AuthState {
  user: AppUser | null
  isGuest: boolean
  pendingPhone: string | null
  requestOtp: (phone: string) => Promise<void>
  verifyOtp: (code: string, extra?: { name?: string; city?: City; role?: UserRole }) => Promise<AppUser>
  loginWithGoogle: (role?: UserRole) => Promise<AppUser>
  updateProfile: (patch: Partial<AppUser>) => void
  continueAsGuest: () => void
  logout: () => void
}

function persist(user: AppUser | null) {
  if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  else localStorage.removeItem(STORAGE_KEY)
}

function restore(): AppUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AppUser) : null
  } catch {
    return null
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  user: restore(),
  isGuest: false,
  pendingPhone: null,

  requestOtp: async (phone) => {
    // Simule l'envoi du SMS (délai réseau factice)
    await new Promise((r) => setTimeout(r, 400))
    set({ pendingPhone: phone })
  },

  verifyOtp: async (_code, extra) => {
    await new Promise((r) => setTimeout(r, 400))
    const existing = MOCK_USERS.find((u) => u.role === (extra?.role ?? 'user'))
    const user: AppUser = {
      id: existing?.id ?? `u_${Date.now()}`,
      name: extra?.name ?? existing?.name ?? 'Nouvel utilisateur',
      phone: '+237 6 99 99 99 99',
      city: extra?.city ?? existing?.city ?? 'douala',
      role: extra?.role ?? 'user',
      memberSince: new Date().toISOString().slice(0, 10),
    }
    persist(user)
    set({ user, isGuest: false, pendingPhone: null })
    return user
  },

  loginWithGoogle: async (role = 'user') => {
    await new Promise((r) => setTimeout(r, 400))
    const user: AppUser = {
      id: `google_${Date.now()}`,
      name: 'Compte Google (démo)',
      phone: '',
      email: 'demo@gmail.com',
      city: 'douala',
      role,
      memberSince: new Date().toISOString().slice(0, 10),
    }
    persist(user)
    set({ user, isGuest: false })
    return user
  },

  updateProfile: (patch) =>
    set((state) => {
      if (!state.user) return state
      const user = { ...state.user, ...patch }
      persist(user)
      return { user }
    }),

  continueAsGuest: () => set({ user: null, isGuest: true }),

  logout: () => {
    persist(null)
    set({ user: null, isGuest: false })
  },
}))
