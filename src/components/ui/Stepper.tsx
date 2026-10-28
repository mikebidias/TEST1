/** Barre de progression d'un formulaire multi-étapes. */
export function Stepper({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100)
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg-tertiary)' }}
    >
      <div
        className="h-full rounded-full transition-all duration-300"
        style={{ width: `${pct}%`, background: 'var(--gradient-komot)' }}
      />
    </div>
  )
}
