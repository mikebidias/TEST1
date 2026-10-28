import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { OnboardingArt } from './OnboardingLayout'

export function OnboardingDonePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex items-center justify-center px-4" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="w-full max-w-md flex flex-col items-center gap-8 text-center">
        <OnboardingArt icon="system_confetti" />
        <div className="flex flex-col gap-2">
          <h1 className="font-display font-bold text-3xl">{t('onboarding.doneTitle')}</h1>
          <p style={{ color: 'var(--text-secondary)' }}>{t('onboarding.doneBody')}</p>
        </div>
        <Button size="lg" className="w-full" onClick={() => navigate('/home')}>
          {t('onboarding.goHome')}
        </Button>
      </div>
    </div>
  )
}
