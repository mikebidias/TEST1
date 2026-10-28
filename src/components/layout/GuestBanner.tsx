import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/shared/icons/registry'

/** Bandeau d'incitation affiché en mode invité (fermable). */
export function GuestBanner() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const isGuest = useAuthStore((s) => s.isGuest)
  const [hidden, setHidden] = useState(false)
  if (!isGuest || hidden) return null

  return (
    <div
      className="flex items-center gap-3 px-4 py-2 text-sm safe-top"
      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
    >
      <Icon name="nav_profile" size={20} color="var(--accent-primary)" />
      <span className="flex-1 hidden sm:inline">{t('guest.banner')}</span>
      <span className="flex-1 sm:hidden">{t('guest.bannerShort')}</span>
      <Button size="sm" variant="secondary" onClick={() => navigate('/signup')}>
        {t('guest.createAccount')}
      </Button>
      <button type="button" aria-label={t('common.close')} onClick={() => setHidden(true)}>
        <Icon name="action_close" size={18} />
      </button>
    </div>
  )
}
