import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/authStore'
import { NEIGHBORHOODS } from '@/mocks/data'
import type { City } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Textarea } from '@/components/ui/Textarea'
import { Checkbox } from '@/components/ui/Checkbox'
import { Stepper } from '@/components/ui/Stepper'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { ImageUpload } from '@/components/ui/ImageUpload'
import { Badge } from '@/components/ui/Badge'
import { LocationPicker, type LatLng } from '@/components/maps/LocationPicker'
import { Icon, type IconName } from '@/shared/icons/registry'
import { AuthLayout, AuthHeading } from './AuthLayout'
import { PhoneOtpFlow } from './PhoneOtpFlow'

type Step = 'welcome' | 'account' | 'info' | 'gps' | 'details' | 'review' | 'done'
const STEP_ORDER: Step[] = ['welcome', 'account', 'info', 'gps', 'details', 'review']
const TOTAL_STEPS = STEP_ORDER.length

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
type DayKey = (typeof DAYS)[number]
type Hours = Record<DayKey, { closed: boolean; open: string; close: string }>
type Category = 'restaurant' | 'snack' | 'club'

const CITY_CENTER: Record<City, LatLng> = {
  douala: { lat: 4.0511, lng: 9.7679 },
  yaounde: { lat: 3.848, lng: 11.5021 },
}

const DEFAULT_HOURS: Hours = {
  mon: { closed: false, open: '11:00', close: '23:00' },
  tue: { closed: false, open: '11:00', close: '23:00' },
  wed: { closed: false, open: '11:00', close: '23:00' },
  thu: { closed: false, open: '11:00', close: '23:00' },
  fri: { closed: false, open: '11:00', close: '00:00' },
  sat: { closed: false, open: '11:00', close: '00:00' },
  sun: { closed: false, open: '12:00', close: '22:00' },
}

interface EstablishmentInfo {
  name: string
  category: Category
  city: City
  neighborhood: string
  address: string
}

interface DetailsData {
  hours: Hours
  price: 1 | 2 | 3 | null
  description: string
  mainPhoto: File | null
  extraPhotos: File[]
  logo: File | null
}

const BENEFITS: { icon: IconName; key: string }[] = [
  { icon: 'action_view', key: 'pro.benefit1' },
  { icon: 'pro_diamond', key: 'pro.benefit2' },
  { icon: 'action_edit', key: 'pro.benefit3' },
  { icon: 'action_route', key: 'pro.benefit4' },
]

export function ProOnboardingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { user, verifyOtp, loginWithGoogle, updateProfile } = useAuthStore()

  const [step, setStep] = useState<Step>('welcome')
  const [accountReady, setAccountReady] = useState(!!user)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [info, setInfo] = useState<EstablishmentInfo | null>(null)
  const [position, setPosition] = useState<LatLng | null>(null)
  const [details, setDetails] = useState<DetailsData>({
    hours: DEFAULT_HOURS,
    price: null,
    description: '',
    mainPhoto: null,
    extraPhotos: [],
    logo: null,
  })
  const [acceptCgu, setAcceptCgu] = useState(false)
  const [cguError, setCguError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [step])

  const go = (s: Step) => setStep(s)
  const back = () => {
    const i = STEP_ORDER.indexOf(step)
    if (i <= 0) navigate('/auth')
    else go(STEP_ORDER[i - 1])
  }

  const progress = (
    <div className="flex flex-col gap-2">
      <Stepper current={STEP_ORDER.indexOf(step) + 1} total={TOTAL_STEPS} />
      <span className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
        {t('pro.step', { current: STEP_ORDER.indexOf(step) + 1, total: TOTAL_STEPS })}
      </span>
    </div>
  )

  const submit = async () => {
    if (!acceptCgu) {
      setCguError(t('validation.cgu'))
      return
    }
    setCguError('')
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 800)) // envoi simulé (backend mocké)
    updateProfile({ role: 'pro' })
    setSubmitting(false)
    go('done')
  }

  // ---------- 1. Bienvenue ----------
  if (step === 'welcome') {
    return (
      <AuthLayout onBack={back} maxWidth={560}>
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge tone="accent" icon="admin_establishment">
            {t('pro.badge')}
          </Badge>
          <AuthHeading title={t('pro.welcomeTitle')} subtitle={t('pro.welcomeSubtitle')} />
        </div>
        <ul className="flex flex-col gap-3">
          {BENEFITS.map((b) => (
            <li key={b.key} className="card p-4 flex items-center gap-3">
              <Icon name={b.icon} size={24} color="var(--accent-primary)" />
              <span>{t(b.key)}</span>
            </li>
          ))}
        </ul>
        <Button size="lg" onClick={() => go('account')}>
          {t('pro.start')}
        </Button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="text-sm text-center"
          style={{ color: 'var(--accent-primary)' }}
        >
          {t('pro.haveAccount')}
        </button>
      </AuthLayout>
    )
  }

  // ---------- 2. Compte ----------
  if (step === 'account') {
    return (
      <AuthLayout onBack={back} maxWidth={560} showLogo={false}>
        {progress}
        {accountReady ? (
          <ManagerNameForm
            defaultName={user?.name && !user.name.startsWith('Nouvel') ? user.name : ''}
            onSubmit={(name) => {
              updateProfile({ name })
              go('info')
            }}
          />
        ) : (
          <PhoneOtpFlow
            phoneTitle={t('pro.accountTitle')}
            phoneSubtitle={t('pro.accountSubtitle')}
            onVerified={async (code) => {
              await verifyOtp(code, { role: 'pro' })
              setAccountReady(true)
            }}
            onGoogle={async () => {
              setGoogleLoading(true)
              await loginWithGoogle('pro')
              setGoogleLoading(false)
              setAccountReady(true)
            }}
            googleLoading={googleLoading}
          />
        )}
      </AuthLayout>
    )
  }

  // ---------- 3. Informations ----------
  if (step === 'info') {
    return (
      <AuthLayout onBack={back} maxWidth={560} showLogo={false}>
        {progress}
        <InfoForm
          defaultValues={info}
          onSubmit={(values) => {
            setInfo(values)
            // recentre la carte GPS si la ville a changé
            if (position && info && info.city !== values.city) setPosition(null)
            go('gps')
          }}
        />
      </AuthLayout>
    )
  }

  // ---------- 4. Localisation GPS ----------
  if (step === 'gps') {
    return (
      <AuthLayout onBack={back} maxWidth={640} showLogo={false}>
        {progress}
        <GpsStep
          city={info?.city ?? 'douala'}
          position={position}
          onChange={setPosition}
          onNext={() => go('details')}
        />
      </AuthLayout>
    )
  }

  // ---------- 5. Détails ----------
  if (step === 'details') {
    return (
      <AuthLayout onBack={back} maxWidth={640} showLogo={false}>
        {progress}
        <DetailsStep
          value={details}
          onChange={setDetails}
          onNext={() => go('review')}
        />
      </AuthLayout>
    )
  }

  // ---------- 6. Vérification ----------
  if (step === 'review' && info) {
    const hoursSummary = DAYS.filter((d) => !details.hours[d].closed).length
    const rows: { label: string; value: string }[] = [
      { label: t('pro.managerName'), value: user?.name ?? t('pro.notProvided') },
      { label: t('pro.estName'), value: info.name },
      { label: t('pro.category'), value: t(`categories.${info.category}`) },
      { label: t('pro.city'), value: `${t(`cities.${info.city}`)} — ${info.neighborhood}` },
      { label: t('pro.address'), value: info.address },
      {
        label: t('pro.gpsCurrent'),
        value: position ? `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}` : t('pro.notProvided'),
      },
      { label: t('pro.priceRange'), value: '₣'.repeat(details.price ?? 0) || t('pro.notProvided') },
      { label: t('pro.hours'), value: `${hoursSummary}/7` },
      { label: t('pro.description'), value: details.description || t('pro.notProvided') },
      {
        label: t('pro.mainPhoto'),
        value: `${details.mainPhoto ? 1 : 0} + ${details.extraPhotos.length}`,
      },
    ]
    return (
      <AuthLayout onBack={back} maxWidth={640} showLogo={false}>
        {progress}
        <AuthHeading title={t('pro.reviewTitle')} subtitle={t('pro.reviewSubtitle')} />
        <dl className="card divide-y" style={{ borderColor: 'var(--border-default)' }}>
          {rows.map((r) => (
            <div
              key={r.label}
              className="p-4 flex flex-col gap-0.5"
              style={{ borderTop: '1px solid var(--border-default)' }}
            >
              <dt className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {r.label}
              </dt>
              <dd className="text-sm break-words">{r.value}</dd>
            </div>
          ))}
        </dl>
        <Checkbox
          checked={acceptCgu}
          onChange={(e) => {
            setAcceptCgu(e.target.checked)
            if (e.target.checked) setCguError('')
          }}
          label={t('pro.acceptCgu')}
          error={cguError}
        />
        <Button size="lg" onClick={submit} loading={submitting}>
          {t('pro.submit')}
        </Button>
        <p className="text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
          {t('pro.verifyNote')}
        </p>
      </AuthLayout>
    )
  }

  // ---------- Confirmation ----------
  return (
    <AuthLayout maxWidth={520}>
      <div className="flex flex-col items-center gap-4 text-center">
        <span
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'var(--gradient-komot)', color: '#1a1a1a' }}
        >
          <Icon name="action_check" size={36} strokeWidth={3} />
        </span>
        <AuthHeading title={t('pro.doneTitle')} subtitle={t('pro.doneBody')} />
      </div>
      <Button size="lg" onClick={() => navigate('/pro/dashboard')}>
        {t('pro.goDashboard')}
      </Button>
      <button
        type="button"
        onClick={() => navigate('/pro/pricing')}
        className="text-sm text-center"
        style={{ color: 'var(--accent-primary)' }}
      >
        {t('pro.discoverPlus')}
      </button>
    </AuthLayout>
  )
}

/* ------------------------------------------------------------------ */

function ManagerNameForm({ defaultName, onSubmit }: { defaultName: string; onSubmit: (name: string) => void }) {
  const { t } = useTranslation()
  const schema = z.object({ name: z.string().trim().min(2, t('validation.name')).max(50, t('validation.name')) })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({ resolver: zodResolver(schema), defaultValues: { name: defaultName } })

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit((v) => onSubmit(v.name))} noValidate>
      <AuthHeading title={t('pro.accountTitle')} subtitle={t('pro.accountSubtitle')} />
      <Input label={t('pro.managerName')} autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Button type="submit" size="lg">
        {t('common.continue')}
      </Button>
    </form>
  )
}

function InfoForm({
  defaultValues,
  onSubmit,
}: {
  defaultValues: EstablishmentInfo | null
  onSubmit: (values: EstablishmentInfo) => void
}) {
  const { t } = useTranslation()
  const schema = z.object({
    name: z.string().trim().min(2, t('validation.required')),
    category: z.enum(['restaurant', 'snack', 'club'], { error: t('validation.required') }),
    city: z.enum(['douala', 'yaounde'], { error: t('validation.required') }),
    neighborhood: z.string().min(1, t('validation.required')),
    address: z.string().trim().min(3, t('validation.required')),
  })

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EstablishmentInfo>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? { name: '', neighborhood: '', address: '' },
  })
  const city = watch('city')

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
      <AuthHeading title={t('pro.infoTitle')} />
      <Input label={t('pro.estName')} error={errors.name?.message} {...register('name')} />
      <Controller
        control={control}
        name="category"
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <SegmentedControl
              label={t('pro.category')}
              value={field.value ?? null}
              onChange={field.onChange}
              options={(['restaurant', 'snack', 'club'] as const).map((c) => ({
                value: c,
                label: t(`categories.${c}`),
              }))}
            />
            {errors.category && (
              <span className="text-xs" style={{ color: 'var(--error)' }}>
                {errors.category.message}
              </span>
            )}
          </div>
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field }) => (
          <div className="flex flex-col gap-1">
            <SegmentedControl
              label={t('pro.city')}
              value={field.value ?? null}
              onChange={(v) => {
                field.onChange(v)
                setValue('neighborhood', '')
              }}
              options={(['douala', 'yaounde'] as const).map((c) => ({ value: c, label: t(`cities.${c}`) }))}
            />
            {errors.city && (
              <span className="text-xs" style={{ color: 'var(--error)' }}>
                {errors.city.message}
              </span>
            )}
          </div>
        )}
      />
      <Select
        label={t('pro.neighborhood')}
        placeholder={t('pro.neighborhoodPlaceholder')}
        disabled={!city}
        error={errors.neighborhood?.message}
        {...register('neighborhood')}
      >
        {(city ? NEIGHBORHOODS[city] : []).map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </Select>
      <Input label={t('pro.address')} autoComplete="street-address" error={errors.address?.message} {...register('address')} />
      <Button type="submit" size="lg">
        {t('common.continue')}
      </Button>
    </form>
  )
}

function GpsStep({
  city,
  position,
  onChange,
  onNext,
}: {
  city: City
  position: LatLng | null
  onChange: (p: LatLng) => void
  onNext: () => void
}) {
  const { t } = useTranslation()
  const [method, setMethod] = useState<'auto' | 'map' | 'manual'>('auto')
  const [locating, setLocating] = useState(false)
  const [geoError, setGeoError] = useState('')
  const [latText, setLatText] = useState('')
  const [lngText, setLngText] = useState('')
  const [showError, setShowError] = useState(false)

  // En mode manuel, l'utilisateur pilote les champs ; sinon ils suivent la position.
  useEffect(() => {
    if (method !== 'manual' && position) {
      setLatText(position.lat.toFixed(6))
      setLngText(position.lng.toFixed(6))
    }
  }, [position, method])

  const locate = () => {
    if (!navigator.geolocation) {
      setGeoError(t('pro.gpsDenied'))
      return
    }
    setGeoError('')
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        onChange({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setLocating(false)
      },
      () => {
        setGeoError(t('pro.gpsDenied'))
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }

  const onManual = (which: 'lat' | 'lng', text: string) => {
    const nextLat = which === 'lat' ? text : latText
    const nextLng = which === 'lng' ? text : lngText
    if (which === 'lat') setLatText(text)
    else setLngText(text)
    const lat = Number(nextLat.replace(',', '.'))
    const lng = Number(nextLng.replace(',', '.'))
    if (nextLat.trim() && nextLng.trim() && Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180) {
      onChange({ lat, lng })
    }
  }

  const latInvalid = method === 'manual' && latText.trim() !== '' && !(Math.abs(Number(latText.replace(',', '.'))) <= 90)
  const lngInvalid = method === 'manual' && lngText.trim() !== '' && !(Math.abs(Number(lngText.replace(',', '.'))) <= 180)

  return (
    <div className="flex flex-col gap-5">
      <AuthHeading title={t('pro.gpsTitle')} subtitle={t('pro.gpsSubtitle')} />

      <div role="tablist" className="flex gap-2">
        {(
          [
            { id: 'auto', icon: 'gps_recenter', label: t('pro.gpsAuto') },
            { id: 'map', icon: 'gps_pin', label: t('pro.gpsMap') },
            { id: 'manual', icon: 'gps_coordinates', label: t('pro.gpsManual') },
          ] as const
        ).map((m) => (
          <button
            key={m.id}
            type="button"
            role="tab"
            aria-selected={method === m.id}
            onClick={() => setMethod(m.id)}
            className={`chip h-12 flex-1 justify-center ${method === m.id ? 'chip-active' : ''}`}
          >
            <Icon name={m.icon} size={18} />
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        ))}
      </div>

      {method === 'auto' && (
        <div className="flex flex-col gap-2">
          <Button type="button" variant="secondary" iconLeft="gps_recenter" onClick={locate} loading={locating}>
            {t('pro.gpsAutoBtn')}
          </Button>
          {geoError && (
            <p className="text-sm" style={{ color: 'var(--error)' }} role="alert">
              {geoError}
            </p>
          )}
        </div>
      )}
      {method === 'map' && (
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {t('pro.gpsMapHint')}
        </p>
      )}
      {method === 'manual' && (
        <div className="grid grid-cols-2 gap-3">
          <Input
            label={t('pro.gpsLat')}
            inputMode="decimal"
            value={latText}
            onChange={(e) => onManual('lat', e.target.value)}
            error={latInvalid ? t('validation.lat') : undefined}
          />
          <Input
            label={t('pro.gpsLng')}
            inputMode="decimal"
            value={lngText}
            onChange={(e) => onManual('lng', e.target.value)}
            error={lngInvalid ? t('validation.lng') : undefined}
          />
        </div>
      )}

      <LocationPicker
        position={position}
        onChange={(p) => {
          onChange(p)
          setShowError(false)
        }}
        center={CITY_CENTER[city]}
      />

      <div className="card p-4 flex items-center gap-3">
        <Icon name="gps_pin" size={22} color="var(--accent-primary)" />
        <div className="text-sm">
          <div className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            {t('pro.gpsCurrent')}
          </div>
          {position ? `${position.lat.toFixed(6)}, ${position.lng.toFixed(6)}` : t('pro.gpsNone')}
        </div>
      </div>

      {showError && !position && (
        <p className="text-sm" style={{ color: 'var(--error)' }} role="alert">
          {t('pro.gpsNone')}
        </p>
      )}
      <Button
        size="lg"
        onClick={() => {
          if (!position) setShowError(true)
          else onNext()
        }}
      >
        {t('common.continue')}
      </Button>
    </div>
  )
}

function ExtraPhotos({ files, onChange }: { files: File[]; onChange: (files: File[]) => void }) {
  const { t } = useTranslation()
  const urls = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files])
  useEffect(() => () => urls.forEach((u) => URL.revokeObjectURL(u)), [urls])

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
        {t('pro.extraPhotos')}
      </span>
      <div className="grid grid-cols-3 gap-3">
        {urls.map((u, i) => (
          <div key={u} className="relative aspect-square rounded-md overflow-hidden">
            <img src={u} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(files.filter((_, j) => j !== i))}
              aria-label={t('pro.remove')}
              className="absolute top-1 right-1 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff' }}
            >
              <Icon name="action_close" size={16} />
            </button>
          </div>
        ))}
        {files.length < 5 && (
          <label
            className="aspect-square rounded-md flex flex-col items-center justify-center gap-1 cursor-pointer text-xs"
            style={{ border: '2px dashed var(--border-strong)', color: 'var(--text-tertiary)' }}
          >
            <Icon name="action_add_photo" size={24} />
            {t('pro.addPhoto')}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const picked = Array.from(e.target.files ?? [])
                onChange([...files, ...picked].slice(0, 5))
                e.target.value = ''
              }}
            />
          </label>
        )}
      </div>
    </div>
  )
}

function DetailsStep({
  value,
  onChange,
  onNext,
}: {
  value: DetailsData
  onChange: (v: DetailsData) => void
  onNext: () => void
}) {
  const { t } = useTranslation()
  const [errors, setErrors] = useState<{ price?: string; description?: string; mainPhoto?: string }>({})

  const setHours = (day: DayKey, patch: Partial<Hours[DayKey]>) =>
    onChange({ ...value, hours: { ...value.hours, [day]: { ...value.hours[day], ...patch } } })

  const next = () => {
    const e: typeof errors = {}
    if (!value.price) e.price = t('validation.required')
    if (value.description.trim().length < 10) e.description = t('validation.required')
    if (!value.mainPhoto) e.mainPhoto = t('validation.required')
    setErrors(e)
    if (Object.keys(e).length === 0) onNext()
  }

  return (
    <div className="flex flex-col gap-6">
      <AuthHeading title={t('pro.detailsTitle')} />

      <section className="flex flex-col gap-3">
        <h2 className="font-display font-semibold">{t('pro.hours')}</h2>
        <div className="card divide-y">
          {DAYS.map((d) => {
            const h = value.hours[d]
            return (
              <div
                key={d}
                className="p-3 flex items-center gap-3 flex-wrap"
                style={{ borderTop: d === 'mon' ? 'none' : '1px solid var(--border-default)' }}
              >
                <span className="w-24 text-sm font-medium">{t(`days.${d}`)}</span>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={h.closed}
                    onChange={(e) => setHours(d, { closed: e.target.checked })}
                    className="w-4 h-4 accent-[#ffc300]"
                  />
                  {t('pro.closed')}
                </label>
                {!h.closed && (
                  <div className="flex items-center gap-2 ml-auto">
                    <input
                      type="time"
                      aria-label={`${t(`days.${d}`)} — ${t('pro.opensAt')}`}
                      value={h.open}
                      onChange={(e) => setHours(d, { open: e.target.value })}
                      className="h-10 px-2 rounded-sm"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    />
                    <span style={{ color: 'var(--text-tertiary)' }}>–</span>
                    <input
                      type="time"
                      aria-label={`${t(`days.${d}`)} — ${t('pro.closesAt')}`}
                      value={h.close}
                      onChange={(e) => setHours(d, { close: e.target.value })}
                      className="h-10 px-2 rounded-sm"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <div className="flex flex-col gap-1">
        <SegmentedControl
          label={t('pro.priceRange')}
          value={value.price}
          onChange={(p) => onChange({ ...value, price: p })}
          options={[
            { value: 1 as const, label: '₣' },
            { value: 2 as const, label: '₣₣' },
            { value: 3 as const, label: '₣₣₣' },
          ]}
        />
        {errors.price && (
          <span className="text-xs" style={{ color: 'var(--error)' }}>
            {errors.price}
          </span>
        )}
      </div>

      <Textarea
        label={t('pro.description')}
        placeholder={t('pro.descriptionPlaceholder')}
        value={value.description}
        onChange={(e) => onChange({ ...value, description: e.target.value })}
        error={errors.description}
      />

      <section className="flex flex-col gap-4">
        <div className="flex items-start gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-1">
            <ImageUpload
              file={value.mainPhoto}
              onChange={(f) => onChange({ ...value, mainPhoto: f })}
              label={t('pro.mainPhoto')}
              size={112}
            />
            {errors.mainPhoto && (
              <span className="text-xs" style={{ color: 'var(--error)' }}>
                {errors.mainPhoto}
              </span>
            )}
          </div>
          <ImageUpload
            file={value.logo}
            onChange={(f) => onChange({ ...value, logo: f })}
            label={t('pro.logo')}
            round
            size={112}
          />
        </div>
        <ExtraPhotos files={value.extraPhotos} onChange={(extraPhotos) => onChange({ ...value, extraPhotos })} />
      </section>

      <Button size="lg" onClick={next}>
        {t('common.continue')}
      </Button>
    </div>
  )
}
