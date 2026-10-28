import { forwardRef, type InputHTMLAttributes } from 'react'
import { Icon } from '@/shared/icons/registry'

/** Saisie d'un numéro camerounais : préfixe +237 fixe, 9 chiffres, groupés "6 99 99 99 99". */
export function formatCmPhone(raw: string) {
  const d = raw.replace(/\D/g, '').slice(0, 9)
  return [d.slice(0, 1), d.slice(1, 3), d.slice(3, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean).join(' ')
}

export const isValidCmPhone = (v: string) => /^6\d{8}$/.test(v.replace(/\D/g, ''))

interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhoneInput(
  { value, onChange, label, error, id = 'phone', ...props },
  ref
) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}
      <div
        className="h-14 rounded-md flex items-center overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: `1px solid ${error ? 'var(--error)' : 'var(--border-default)'}`,
        }}
      >
        <span
          className="h-full px-3 flex items-center gap-2 text-sm font-medium shrink-0"
          style={{ borderRight: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
        >
          <Icon name="system_cameroon" size={22} />
          +237
        </span>
        <input
          ref={ref}
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={formatCmPhone(value)}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 9))}
          className="flex-1 h-full px-3 bg-transparent outline-none min-w-0"
          style={{ color: 'var(--text-primary)' }}
          {...props}
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
