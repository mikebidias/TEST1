import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Icon } from '@/shared/icons/registry'

/** Sélecteur d'une image avec aperçu. Le fichier n'est pas envoyé nulle part
 * (backend mocké) : l'aperçu utilise une URL locale, libérée au démontage. */
export function ImageUpload({
  file,
  onChange,
  label,
  round,
  size = 96,
}: {
  file: File | null
  onChange: (file: File | null) => void
  label: string
  round?: boolean
  size?: number
}) {
  const { t } = useTranslation()
  const inputRef = useRef<HTMLInputElement>(null)
  const previewUrl = file ? URL.createObjectURL(file) : null

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-label={label}
        className={`overflow-hidden flex items-center justify-center ${round ? 'rounded-full' : 'rounded-md'}`}
        style={{
          width: size,
          height: size,
          backgroundColor: 'var(--bg-tertiary)',
          border: '2px dashed var(--border-strong)',
          color: 'var(--text-tertiary)',
        }}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="" className="w-full h-full object-cover" />
        ) : (
          <Icon name="action_add_photo" size={28} />
        )}
      </button>
      <span className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </span>
      {file && (
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-xs"
          style={{ color: 'var(--error)' }}
        >
          {t('pro.remove')}
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          onChange(e.target.files?.[0] ?? null)
          e.target.value = ''
        }}
      />
    </div>
  )
}
