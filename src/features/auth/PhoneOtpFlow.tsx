import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { OtpInput } from '@/components/ui/OtpInput'
import { PhoneInput, isValidCmPhone, formatCmPhone } from '@/components/ui/PhoneInput'
import { Icon } from '@/shared/icons/registry'
import { useAuthStore } from '@/stores/authStore'
import { AuthHeading } from './AuthLayout'

const RESEND_SECONDS = 45

/** Étapes "téléphone" puis "code OTP", partagées par connexion, inscription et inscription Pro.
 * OTP simulé : n'importe quel code à 6 chiffres est accepté. */
export function PhoneOtpFlow({
  phoneTitle,
  phoneSubtitle,
  onVerified,
  onGoogle,
  googleLoading,
  footer,
  onStepChange,
}: {
  phoneTitle: string
  phoneSubtitle: string
  onVerified: (code: string) => void | Promise<void>
  onGoogle?: () => void
  googleLoading?: boolean
  footer?: React.ReactNode
  onStepChange?: (step: 'phone' | 'otp') => void
}) {
  const { t } = useTranslation()
  const requestOtp = useAuthStore((s) => s.requestOtp)
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [otpError, setOtpError] = useState('')
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (seconds <= 0) return
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(id)
  }, [seconds])

  const goTo = (s: 'phone' | 'otp') => {
    setStep(s)
    onStepChange?.(s)
  }

  const sendCode = async () => {
    if (!isValidCmPhone(phone)) {
      setPhoneError(t('validation.phone'))
      return
    }
    setPhoneError('')
    setSending(true)
    await requestOtp(phone)
    setSending(false)
    setOtp('')
    setOtpError('')
    setSeconds(RESEND_SECONDS)
    goTo('otp')
  }

  const verify = async () => {
    if (otp.length !== 6) {
      setOtpError(t('validation.otp'))
      return
    }
    setOtpError('')
    setVerifying(true)
    await onVerified(otp)
    setVerifying(false)
  }

  const mm = `0:${String(seconds).padStart(2, '0')}`

  if (step === 'otp') {
    return (
      <div className="flex flex-col gap-6">
        <AuthHeading
          title={t('auth.otpTitle')}
          subtitle={`${t('auth.otpSubtitle')} +237 ${formatCmPhone(phone)}`}
        />
        <OtpInput value={otp} onChange={setOtp} error={!!otpError} />
        {otpError && (
          <p className="text-sm text-center" style={{ color: 'var(--error)' }} role="alert">
            {otpError}
          </p>
        )}
        <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
          {t('auth2.otpHint')}
        </p>
        <Button size="lg" onClick={verify} loading={verifying} disabled={otp.length !== 6}>
          {t('auth.verify')}
        </Button>
        <div className="flex flex-col items-center gap-2 text-sm">
          {seconds > 0 ? (
            <span style={{ color: 'var(--text-tertiary)' }}>{t('auth2.resendIn', { time: mm })}</span>
          ) : (
            <button type="button" onClick={sendCode} style={{ color: 'var(--accent-primary)' }} className="font-medium">
              {t('auth.resendCode')}
            </button>
          )}
          <button type="button" onClick={() => goTo('phone')} style={{ color: 'var(--accent-primary)' }}>
            {t('auth.changeNumber')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(e) => {
        e.preventDefault()
        sendCode()
      }}
    >
      <AuthHeading title={phoneTitle} subtitle={phoneSubtitle} />
      <PhoneInput
        label={t('auth.phoneLabel')}
        value={phone}
        onChange={(v) => {
          setPhone(v)
          if (phoneError) setPhoneError('')
        }}
        placeholder={t('auth.phonePlaceholder')}
        error={phoneError}
        autoFocus
      />
      <Button type="submit" size="lg" loading={sending}>
        {sending ? t('auth2.sending') : t('auth.receiveCode')}
      </Button>
      {onGoogle && (
        <>
          <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <span className="flex-1 h-px" style={{ backgroundColor: 'var(--border-default)' }} />
            {t('auth.orGoogle')}
            <span className="flex-1 h-px" style={{ backgroundColor: 'var(--border-default)' }} />
          </div>
          <Button type="button" variant="secondary" size="lg" onClick={onGoogle} loading={googleLoading}>
            <Icon name="action_google" size={20} />
            {t('auth.continueGoogle')}
          </Button>
          <p className="text-xs text-center -mt-3" style={{ color: 'var(--text-tertiary)' }}>
            {t('auth2.googleDemo')}
          </p>
        </>
      )}
      {footer}
    </form>
  )
}
