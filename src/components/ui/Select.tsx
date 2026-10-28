import { forwardRef, type SelectHTMLAttributes } from 'react'
import { Icon } from '@/shared/icons/registry'

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string; placeholder?: string }
>(function Select({ label, error, placeholder, id, children, className = '', ...props }, ref) {
  const selectId = id ?? props.name
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={selectId} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={`h-14 w-full px-4 pr-10 rounded-md outline-none appearance-none ${className}`}
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: `1px solid ${error ? 'var(--error)' : 'var(--border-default)'}`,
            color: 'var(--text-primary)',
          }}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <Icon
          name="action_chevron_down"
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          color="var(--text-tertiary)"
        />
      </div>
      {error && (
        <span className="text-xs" style={{ color: 'var(--error)' }}>
          {error}
        </span>
      )}
    </div>
  )
})
