import type { ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '@/shared/icons/registry'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  icon?: IconName
}

export function Chip({ active, icon, children, className = '', ...props }: ChipProps) {
  return (
    <button type="button" className={`chip ${active ? 'chip-active' : ''} ${className}`} {...props}>
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  )
}
