import { create } from 'zustand'
import type { Establishment } from '@/types'

const STORAGE_KEY = 'komot_prefs'

export type Category = Establishment['category']

interface Prefs {
  interests: Category[]
  locationEnabled: boolean
  notificationsEnabled: boolean
  onboardingDone: boolean
}

interface PrefsState extends Prefs {
  toggleInterest: (c: Category) => void
  setLocationEnabled: (v: boolean) => void
  setNotificationsEnabled: (v: boolean) => void
  completeOnboarding: () => void
}

function persist(state: Prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function restore(): Prefs {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Prefs
  } catch {
    /* ignore */
  }
  return { interests: [], locationEnabled: false, notificationsEnabled: false, onboardingDone: false }
}

export const usePrefsStore = create<PrefsState>((set, get) => ({
  ...restore(),

  toggleInterest: (c) => {
    const interests = get().interests.includes(c)
      ? get().interests.filter((x) => x !== c)
      : [...get().interests, c]
    const next = { ...get(), interests }
    persist(next)
    set({ interests })
  },

  setLocationEnabled: (v) => {
    const next = { ...get(), locationEnabled: v }
    persist(next)
    set({ locationEnabled: v })
  },

  setNotificationsEnabled: (v) => {
    const next = { ...get(), notificationsEnabled: v }
    persist(next)
    set({ notificationsEnabled: v })
  },

  completeOnboarding: () => {
    const next = { ...get(), onboardingDone: true }
    persist(next)
    set({ onboardingDone: true })
  },
}))
