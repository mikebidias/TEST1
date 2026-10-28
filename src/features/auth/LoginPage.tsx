import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import type { UserRole } from '@/types'
import { AuthLayout } from './AuthLayout'
import { PhoneOtpFlow } from './PhoneOtpFlow'

const HOME_BY_ROLE: Record<UserRole, string> = { user: '/home', pro: '/pro/dashboard', admin: '/admin' }

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { verifyOtp, loginWithGoogle } = useAuthStore()
  const [googleLoading, setGoogleLoading] = useState(false)

  const signInAs = async (role: UserRole) => {
    const user = await verifyOtp('000000', { role })
    navigate(HOME_BY_ROLE[user.role])
  }

  return (
    <AuthLayout onBack={() => navigate('/auth')}>
      <PhoneOtpFlow
        phoneTitle={t('auth.loginTitle')}
        phoneSubtitle={t('auth.loginSubtitle')}
        onVerified={async (code) => {
          const user = await verifyOtp(code)
          navigate(HOME_BY_ROLE[user.role])
        }}
        onGoogle={async () => {
          setGoogleLoading(true)
          await loginWithGoogle()
          navigate('/home')
        }}
        googleLoading={googleLoading}
        footer={
          <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
            {t('auth.noAccount')}{' '}
            <Link to="/signup" style={{ color: 'var(--accent-primary)' }} className="font-medium">
              {t('auth.createAccount')}
            </Link>
          </p>
        }
      />
      <div
        className="rounded-md p-4 flex flex-col gap-3"
        style={{ border: '1px dashed var(--border-strong)' }}
      >
        <div>
          <div className="text-sm font-semibold">{t('demo.title')}</div>
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {t('demo.hint')}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="ghost" size="sm" type="button" onClick={() => signInAs('pro')}>
            {t('demo.pro')}
          </Button>
          <Button variant="ghost" size="sm" type="button" onClick={() => signInAs('admin')}>
            {t('demo.admin')}
          </Button>
        </div>
      </div>
    </AuthLayout>
  )
}
