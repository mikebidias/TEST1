import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { Icon, type IconName } from '@/shared/icons/registry'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  iconLeft?: IconName
  iconRight?: IconName
  loading?: boolean
}

const SIZE_CLASS = { sm: 'h-10 text-sm px-4', md: 'h-12 text-base px-6', lg: 'h-14 text-base px-6' }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', iconLeft, iconRight, loading, children, className = '', ...props },
  ref
) {
  const base = variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-ghost'
  return (
    <button
      ref={ref}
      className={`${base} ${SIZE_CLASS[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {iconLeft && <Icon name={iconLeft} size={20} />}
          {children}
          {iconRight && <Icon name={iconRight} size={20} />}
        </>
      )}
    </button>
  )
})
