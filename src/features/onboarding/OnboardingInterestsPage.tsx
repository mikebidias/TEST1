import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Icon, type IconName } from '@/shared/icons/registry'
import { usePrefsStore, type Category } from '@/stores/prefsStore'
import { OnboardingLayout } from './OnboardingLayout'

const OPTIONS: { id: Category; icon: IconName }[] = [
  { id: 'restaurant', icon: 'category_restaurant' },
  { id: 'snack', icon: 'category_snack' },
  { id: 'club', icon: 'category_club' },
]

export function OnboardingInterestsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { interests, toggleInterest } = usePrefsStore()
  const [error, setError] = useState('')

  return (
    <OnboardingLayout step="interests" onBack={() => navigate('/onboarding/city')}>
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-bold text-3xl">{t('onboarding.interestsTitle')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t('onboarding.interestsSubtitle')}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {OPTIONS.map((o) => {
          const active = interests.includes(o.id)
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => {
                toggleInterest(o.id)
                setError('')
              }}
              className="rounded-lg h-24 flex flex-col items-center justify-center gap-2 transition-colors"
              style={{
                backgroundColor: active ? undefined : 'var(--bg-secondary)',
                background: active ? 'var(--gradient-komot)' : undefined,
                border: `2px solid ${active ? 'transparent' : 'var(--border-default)'}`,
                color: active ? '#1A1A1A' : 'var(--text-primary)',
              }}
            >
              <Icon name={o.icon} size={28} />
              <span className="font-medium text-sm">{t(`categories.${o.id}`)}</span>
            </button>
          )
        })}
      </div>

      {error && (
        <p className="text-sm" style={{ color: 'var(--error)' }} role="alert">
          {error}
        </p>
      )}

      <Button
        size="lg"
        className="w-full"
        onClick={() => {
          if (interests.length === 0) setError(t('onboarding.interestsError'))
          else navigate('/onboarding/location')
        }}
      >
        {t('common.continue')}
      </Button>
    </OnboardingLayout>
  )
}
