import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/shared/icons/registry'
import { LanguageToggle } from '@/components/pwa/LanguageToggle'
import { ThemeToggle } from '@/components/pwa/ThemeToggle'

export const ONBOARDING_STEPS = ['welcome', 'city', 'interests', 'location', 'notifications'] as const
export type OnboardingStep = (typeof ONBOARDING_STEPS)[number]

/** Grand cercle dégradé + icône, à la place d'une vraie illustration importée —
 * garde l'esprit "Urban Komot" (soleil couchant) sans dépendre d'un asset externe. */
export function OnboardingArt({ icon, size = 96 }: { icon: IconName; size?: number }) {
  return (
    <div
      className="rounded-2xl flex items-center justify-center mx-auto"
      style={{ width: 200, height: 200, background: 'var(--gradient-komot)', opacity: 0.9 }}
    >
      <Icon name={icon} size={size} color="#1A1A1A" />
    </div>
  )
}

export function OnboardingLayout({
  step,
  onBack,
  children,
}: {
  step: OnboardingStep
  onBack?: () => void
  children: ReactNode
}) {
  const index = ONBOARDING_STEPS.indexOf(step)

  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex items-center justify-between p-3 safe-top">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Retour"
            className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{ color: 'var(--text-primary)' }}
          >
            <Icon name="action_back" size={24} />
          </button>
        ) : (
          <span className="w-11" />
        )}
        <div className="flex items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>

      <main className="flex-1 flex items-center justify-center px-4 pb-10">
        <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">{children}</div>
      </main>

      {index >= 0 && (
        <div className="flex justify-center gap-2 pb-8">
          {ONBOARDING_STEPS.map((s, i) => (
            <span
              key={s}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ backgroundColor: i === index ? 'var(--accent-primary)' : 'var(--border-strong)' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
