import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, className = '', id, ...props },
  ref
) {
  const inputId = id ?? props.name
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={`h-14 px-4 rounded-md outline-none transition-colors ${className}`}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: `1px solid ${error ? 'var(--error)' : 'var(--border-default)'}`,
          color: 'var(--text-primary)',
        }}
        {...props}
      />
      {error ? (
        <span className="text-xs" style={{ color: 'var(--error)' }}>
          {error}
        </span>
      ) : hint ? (
        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          {hint}
        </span>
      ) : null}
    </div>
  )
})
