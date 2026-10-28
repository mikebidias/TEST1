import { useTheme } from '@/core/theme/ThemeProvider'
import { Icon } from '@/shared/icons/registry'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Basculer le mode clair/sombre"
      className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
      style={{ color: 'var(--text-secondary)' }}
    >
      <Icon name="action_theme" size={20} color={theme === 'dark' ? 'var(--accent-primary)' : undefined} />
    </button>
  )
}
