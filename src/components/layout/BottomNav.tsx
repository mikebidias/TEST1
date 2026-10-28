import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon, type IconName } from '@/shared/icons/registry'

const ITEMS: { to: string; icon: IconName; labelKey: string }[] = [
  { to: '/home', icon: 'nav_home', labelKey: 'nav.home' },
  { to: '/search', icon: 'nav_search', labelKey: 'nav.explore' },
  { to: '/favorites', icon: 'nav_favorite', labelKey: 'nav.favorites' },
  { to: '/profile', icon: 'nav_profile', labelKey: 'nav.profile' },
]

export function BottomNav() {
  const { t } = useTranslation()
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around safe-bottom md:hidden"
      style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-default)' }}
    >
      {ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className="flex flex-col items-center gap-1 text-xs"
          style={({ isActive }) => ({
            color: isActive ? 'var(--accent-primary)' : 'var(--text-tertiary)',
          })}
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} size={24} variant={isActive ? 'filled' : 'outline'} />
              {t(item.labelKey)}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
