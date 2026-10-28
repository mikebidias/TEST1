import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

/** Écran temporaire : les routes existent et naviguent déjà (Phase 0),
 * le contenu réel est construit dans la phase indiquée. */
export function PlaceholderPage({ title, phase }: { title: string; phase: number }) {
  const navigate = useNavigate()
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="font-display font-bold text-2xl">{title}</h1>
      <p style={{ color: 'var(--text-secondary)' }}>Écran prévu en Phase {phase}.</p>
      <Button variant="secondary" onClick={() => navigate('/')}>
        Retour à l'accueil public
      </Button>
    </div>
  )
}
