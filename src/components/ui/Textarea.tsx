import { forwardRef, type TextareaHTMLAttributes } from 'react'

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }
>(function Textarea({ label, error, id, className = '', ...props }, ref) {
  const areaId = id ?? props.name
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={areaId} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={areaId}
        rows={4}
        className={`p-4 rounded-md outline-none resize-y min-h-28 ${className}`}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: `1px solid ${error ? 'var(--error)' : 'var(--border-default)'}`,
          color: 'var(--text-primary)',
        }}
        {...props}
      />
      {error && (
        <span className="text-xs" style={{ color: 'var(--error)' }}>
          {error}
        </span>
      )}
    </div>
  )
})
