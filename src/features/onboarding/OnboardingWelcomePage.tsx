import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { OnboardingArt, OnboardingLayout } from './OnboardingLayout'

export function OnboardingWelcomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <OnboardingLayout step="welcome" onBack={() => navigate('/')}>
      <OnboardingArt icon="system_door" />
      <Logo variant="horizontal" height={32} />
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-bold text-3xl">{t('onboarding.welcomeTitle')}</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{t('onboarding.welcomeBody')}</p>
      </div>
      <Button size="lg" className="w-full" onClick={() => navigate('/onboarding/city')}>
        {t('onboarding.start')}
      </Button>
    </OnboardingLayout>
  )
}
