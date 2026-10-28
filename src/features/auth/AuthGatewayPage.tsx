import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Icon, type IconName } from '@/shared/icons/registry'
import { useAuthStore } from '@/stores/authStore'

export function AuthGatewayPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest)

  const options: { icon: IconName; title: string; subtitle: string; onClick: () => void; highlight?: boolean }[] = [
    { icon: 'nav_profile', title: t('authGateway.loginTitle'), subtitle: t('authGateway.loginSubtitle'), onClick: () => navigate('/login') },
    { icon: 'action_edit', title: t('authGateway.signupTitle'), subtitle: t('authGateway.signupSubtitle'), onClick: () => navigate('/signup') },
    {
      icon: 'nav_search',
      title: t('authGateway.guestTitle'),
      subtitle: t('authGateway.guestSubtitle'),
      onClick: () => {
        continueAsGuest()
        navigate('/home')
      },
    },
    { icon: 'admin_establishment', title: t('authGateway.proTitle'), subtitle: t('authGateway.proSubtitle'), onClick: () => navigate('/pro/onboarding'), highlight: true },
  ]

  return (
    <div className="min-h-dvh flex items-center justify-center p-4" style={{ backgroundColor: 'var(--bg-overlay)' }}>
      <div
        className="w-full max-w-lg rounded-xl p-6 md:p-8 relative flex flex-col gap-4"
        style={{ backgroundColor: 'var(--bg-elevated)', boxShadow: 'var(--elevation-4)' }}
      >
        <button
          onClick={() => navigate('/')}
          aria-label={t('common.close')}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <Icon name="action_close" size={24} />
        </button>
        <div className="text-center mb-2">
          <div className="font-display font-bold text-2xl mb-3">komot</div>
          <h1 className="font-display font-bold text-2xl">{t('authGateway.title')}</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
            {t('authGateway.subtitle')}
          </p>
        </div>
        {options.map((o) => (
          <button
            key={o.title}
            onClick={o.onClick}
            className="flex items-center gap-4 p-4 rounded-md text-left transition-colors"
            style={{
              backgroundColor: o.highlight ? 'color-mix(in srgb, var(--accent-primary) 10%, transparent)' : 'var(--bg-secondary)',
              border: o.highlight ? '1px solid var(--accent-primary)' : '1px solid transparent',
            }}
          >
            <Icon name={o.icon} size={32} color="var(--accent-primary)" />
            <div className="flex-1">
              <div className="font-display font-semibold">{o.title}</div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {o.subtitle}
              </div>
            </div>
            <Icon name="action_chevron_right" size={20} color="var(--text-tertiary)" />
          </button>
        ))}
      </div>
    </div>
  )
}
