import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import type { City } from '@/types'
import { AuthLayout, AuthHeading } from './AuthLayout'
import { PhoneOtpFlow } from './PhoneOtpFlow'

export function SignupPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { verifyOtp, loginWithGoogle } = useAuthStore()
  const [step, setStep] = useState<'phone' | 'profile'>('phone')
  const [googleLoading, setGoogleLoading] = useState(false)
  const [avatar, setAvatar] = useState<File | null>(null)

  const schema = z.object({
    name: z.string().trim().min(2, t('validation.name')).max(50, t('validation.name')),
    email: z.string().trim().email(t('validation.email')).or(z.literal('')),
    city: z.enum(['douala', 'yaounde']),
  })
  type FormValues = z.infer<typeof schema>

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', city: 'douala' },
  })

  const onSubmit = async (values: FormValues) => {
    await verifyOtp('000000', { name: values.name, city: values.city as City })
    navigate('/onboarding')
  }

  if (step === 'profile') {
    return (
      <AuthLayout onBack={() => setStep('phone')} showLogo={false}>
        <AuthHeading title={t('auth.profileTitle')} subtitle={t('auth.profileSubtitle')} />
        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex justify-center">
            <ImageUpload
              file={avatar}
              onChange={setAvatar}
              label={avatar ? t('auth2.avatarChange') : t('auth2.avatarAdd')}
              round
              size={112}
            />
          </div>
          <Input label={t('auth.nameLabel')} autoComplete="name" error={errors.name?.message} {...register('name')} />
          <Input
            label={t('auth.emailLabel')}
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
          <Controller
            control={control}
            name="city"
            render={({ field }) => (
              <SegmentedControl
                label={t('auth.cityLabel')}
                value={field.value}
                onChange={field.onChange}
                options={[
                  { value: 'douala', label: t('cities.douala') },
                  { value: 'yaounde', label: t('cities.yaounde') },
                ]}
              />
            )}
          />
          <Button type="submit" size="lg" loading={isSubmitting}>
            {t('auth.finish')}
          </Button>
        </form>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout onBack={() => navigate('/auth')}>
      <PhoneOtpFlow
        phoneTitle={t('auth.signupTitle')}
        phoneSubtitle={t('auth.signupSubtitle')}
        onVerified={() => setStep('profile')}
        onGoogle={async () => {
          setGoogleLoading(true)
          await loginWithGoogle()
          navigate('/onboarding')
        }}
        googleLoading={googleLoading}
        footer={
          <>
            <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
              {t('auth.legalMention')}
            </p>
            <p className="text-sm text-center" style={{ color: 'var(--text-secondary)' }}>
              {t('auth2.already')}{' '}
              <Link to="/login" style={{ color: 'var(--accent-primary)' }} className="font-medium">
                {t('landing.login')}
              </Link>
            </p>
          </>
        }
      />
    </AuthLayout>
  )
}
