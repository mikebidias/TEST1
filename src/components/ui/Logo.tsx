import { useTheme } from '@/core/theme/ThemeProvider'
import horizontalLight from '@/assets/branding/trimmed/horizontal_light.png'
import horizontalDark from '@/assets/branding/trimmed/horizontal_dark.png'
import verticalLight from '@/assets/branding/trimmed/vertical_light.png'
import verticalDark from '@/assets/branding/trimmed/vertical_dark.png'

// Logos fournis (fond transparent), recadrés sur leur zone utile à pleine
// résolution. Version "light" = texte foncé (pour fond clair), "dark" = texte clair.
const SOURCES = {
  horizontal: { light: horizontalLight, dark: horizontalDark },
  vertical: { light: verticalLight, dark: verticalDark },
}

export function Logo({
  variant = 'horizontal',
  height = 40,
  className = '',
}: {
  variant?: 'horizontal' | 'vertical'
  height?: number
  className?: string
}) {
  const { theme } = useTheme()
  return (
    <img
      src={SOURCES[variant][theme]}
      alt="Komot — Sors. Découvre. Vis."
      style={{ height, width: 'auto' }}
      className={className}
      draggable={false}
    />
  )
}
