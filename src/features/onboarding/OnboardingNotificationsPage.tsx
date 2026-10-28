import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { usePrefsStore } from '@/stores/prefsStore'
import { OnboardingArt, OnboardingLayout } from './OnboardingLayout'

export function OnboardingNotificationsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setNotificationsEnabled, completeOnboarding } = usePrefsStore()
  const [requesting, setRequesting] = useState(false)

  const finish = () => {
    completeOnboarding()
    navigate('/onboarding/done')
  }

  const allow = async () => {
    if (!('Notification' in window)) {
      setNotificationsEnabled(false)
      finish()
      return
    }
    setRequesting(true)
    try {
      const perm = await Notification.requestPermission()
      setNotificationsEnabled(perm === 'granted')
    } catch {
      setNotificationsEnabled(false)
    }
    setRequesting(false)
    finish()
  }

  return (
    <OnboardingLayout step="notifications" onBack={() => navigate('/onboarding/location')}>
      <OnboardingArt icon="system_bell" />
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-bold text-3xl">{t('onboarding.notifTitle')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t('onboarding.notifBody')}</p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Button size="lg" onClick={allow} loading={requesting}>
          {t('onboarding.allowNotif')}
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => {
            setNotificationsEnabled(false)
            finish()
          }}
        >
          {t('onboarding.later')}
        </Button>
      </div>
    </OnboardingLayout>
  )
}
