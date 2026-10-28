import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/shared/icons/registry'
import { useAuthStore } from '@/stores/authStore'
import { MOCK_ESTABLISHMENTS } from '@/mocks/data'
import type { City } from '@/types'
import { OnboardingLayout } from './OnboardingLayout'

export function OnboardingCityPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, updateProfile } = useAuthStore()
  const [selected, setSelected] = useState<City>(user?.city ?? 'douala')

  const counts: Record<City, number> = {
    douala: MOCK_ESTABLISHMENTS.filter((e) => e.city === 'douala').length,
    yaounde: MOCK_ESTABLISHMENTS.filter((e) => e.city === 'yaounde').length,
  }

  const cities: { id: City; nameKey: string; descKey: string }[] = [
    { id: 'douala', nameKey: 'cities.douala', descKey: 'onboarding.doualaDesc' },
    { id: 'yaounde', nameKey: 'cities.yaounde', descKey: 'onboarding.yaoundeDesc' },
  ]

  return (
    <OnboardingLayout step="city" onBack={() => navigate('/onboarding')}>
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-bold text-3xl">{t('onboarding.cityTitle')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t('onboarding.citySubtitle')}</p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {cities.map((c) => {
          const active = selected === c.id
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelected(c.id)}
              className="rounded-lg p-4 flex items-center gap-4 text-left transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: `2px solid ${active ? 'var(--accent-primary)' : 'var(--border-default)'}`,
              }}
            >
              <Icon name="admin_establishment" size={32} color="var(--accent-primary)" />
              <div className="flex-1">
                <div className="font-display font-semibold text-lg">{t(c.nameKey)}</div>
                <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t(c.descKey)}
                </div>
                <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {counts[c.id]}+ {t('onboarding.places')}
                </div>
              </div>
              {active && <Icon name="action_check" size={22} color="var(--accent-primary)" />}
            </button>
          )
        })}
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={() => {
          updateProfile({ city: selected })
          navigate('/onboarding/interests')
        }}
      >
        {t('common.continue')}
      </Button>
    </OnboardingLayout>
  )
}
