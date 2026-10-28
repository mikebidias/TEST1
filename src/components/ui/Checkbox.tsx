import type { InputHTMLAttributes, ReactNode } from 'react'
import { Icon } from '@/shared/icons/registry'

export function Checkbox({
  label,
  error,
  checked,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: ReactNode; error?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-start gap-3 cursor-pointer">
        <input type="checkbox" checked={checked} className="sr-only peer" {...props} />
        <span
          className="w-6 h-6 rounded-sm flex items-center justify-center shrink-0 mt-0.5 peer-focus-visible:ring-2"
          style={{
            border: `2px solid ${error ? 'var(--error)' : checked ? 'var(--accent-primary)' : 'var(--border-strong)'}`,
            background: checked ? 'var(--gradient-komot)' : 'transparent',
            color: '#1a1a1a',
          }}
        >
          {checked && <Icon name="action_check" size={16} strokeWidth={3} />}
        </span>
        <span className="text-sm">{label}</span>
      </label>
      {error && (
        <span className="text-xs" style={{ color: 'var(--error)' }}>
          {error}
        </span>
      )}
    </div>
  )
}
