import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/icons/registry'

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const next = i18n.language === 'fr' ? 'en' : 'fr'
  return (
    <button
      type="button"
      onClick={() => i18n.changeLanguage(next)}
      className="h-10 px-3 rounded-full flex items-center gap-1.5 text-sm font-medium"
      style={{ color: 'var(--text-secondary)' }}
      aria-label="Changer de langue"
    >
      <Icon name="system_globe" size={18} />
      {i18n.language.toUpperCase()}
    </button>
  )
}
