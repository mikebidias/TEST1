import type { ReactNode } from 'react'
import { Icon, type IconName } from '@/shared/icons/registry'

type BadgeTone = 'success' | 'error' | 'accent' | 'neutral'

const TONE_STYLE: Record<BadgeTone, { bg: string; fg: string }> = {
  success: { bg: 'color-mix(in srgb, var(--success) 15%, transparent)', fg: 'var(--success)' },
  error: { bg: 'color-mix(in srgb, var(--error) 15%, transparent)', fg: 'var(--error)' },
  accent: { bg: 'color-mix(in srgb, var(--accent-primary) 15%, transparent)', fg: 'var(--accent-primary)' },
  neutral: { bg: 'var(--bg-tertiary)', fg: 'var(--text-secondary)' },
}

export function Badge({
  tone = 'neutral',
  icon,
  children,
}: {
  tone?: BadgeTone
  icon?: IconName
  children: ReactNode
}) {
  const style = TONE_STYLE[tone]
  return (
    <span
      className="h-6 px-2 rounded-full text-xs font-semibold inline-flex items-center gap-1"
      style={{ backgroundColor: style.bg, color: style.fg }}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  )
}
