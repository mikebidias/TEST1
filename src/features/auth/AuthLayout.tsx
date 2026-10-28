import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/icons/registry'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/pwa/ThemeToggle'
import { LanguageToggle } from '@/components/pwa/LanguageToggle'

/** Cadre commun des écrans avant connexion : carte centrée (desktop/tablette),
 * plein écran sur mobile, avec retour, logo, langue et thème. */
export function AuthLayout({
  children,
  onBack,
  maxWidth = 480,
  showLogo = true,
}: {
  children: ReactNode
  onBack?: () => void
  maxWidth?: number
  showLogo?: boolean
}) {
  const { t } = useTranslation()
  return (
    <div className="min-h-dvh flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="flex items-center justify-between p-3 safe-top">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={t('common.back')}
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
      <main className="flex-1 flex md:items-center justify-center px-4 pb-10">
        <div
          className="w-full md:rounded-xl md:p-8 flex flex-col gap-6"
          style={{
            maxWidth,
            backgroundColor: 'transparent',
          }}
        >
          {showLogo && (
            <div className="flex justify-center">
              <Logo variant="vertical" height={96} />
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}

export function AuthHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center flex flex-col gap-1.5">
      <h1 className="font-display font-bold text-2xl md:text-3xl">{title}</h1>
      {subtitle && (
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
