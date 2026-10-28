import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/shared/icons/registry'
import { usePrefsStore } from '@/stores/prefsStore'
import { OnboardingArt, OnboardingLayout } from './OnboardingLayout'

const USES = ['onboarding.locationUse1', 'onboarding.locationUse2', 'onboarding.locationUse3'] as const

export function OnboardingLocationPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setLocationEnabled = usePrefsStore((s) => s.setLocationEnabled)
  const [requesting, setRequesting] = useState(false)

  const next = () => navigate('/onboarding/notifications')

  const allow = () => {
    if (!navigator.geolocation) {
      setLocationEnabled(false)
      next()
      return
    }
    setRequesting(true)
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationEnabled(true)
        setRequesting(false)
        next()
      },
      () => {
        setLocationEnabled(false)
        setRequesting(false)
        next()
      },
      { timeout: 8000 }
    )
  }

  return (
    <OnboardingLayout step="location" onBack={() => navigate('/onboarding/interests')}>
      <OnboardingArt icon="gps_pin" />
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-bold text-3xl">{t('onboarding.locationTitle')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t('onboarding.locationBody')}</p>
      </div>

      <ul className="flex flex-col gap-2 self-start text-sm">
        {USES.map((key) => (
          <li key={key} className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
            <Icon name="action_check" size={16} color="var(--success)" />
            {t(key)}
          </li>
        ))}
      </ul>

      <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text-tertiary)' }}>
        <Icon name="system_lock" size={14} />
        {t('onboarding.locationPrivacy')}
      </p>

      <div className="flex flex-col gap-3 w-full">
        <Button size="lg" onClick={allow} loading={requesting}>
          {t('onboarding.allowLocation')}
        </Button>
        <Button variant="ghost" size="lg" onClick={next}>
          {t('onboarding.later')}
        </Button>
      </div>
    </OnboardingLayout>
  )
}
