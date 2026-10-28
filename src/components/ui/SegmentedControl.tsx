interface Option<T extends string | number> {
  value: T
  label: string
}

/** Sélecteur exclusif (ville, catégorie, prix...). */
export function SegmentedControl<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: Option<T>[]
  value: T | null
  onChange: (value: T) => void
  label?: string
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
      <div role="radiogroup" className="flex gap-2 flex-wrap">
        {options.map((o) => {
          const active = o.value === value
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(o.value)}
              className={`chip h-11 px-4 flex-1 justify-center ${active ? 'chip-active' : ''}`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
