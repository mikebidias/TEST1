import type { AppUser, Establishment, Review } from '@/types'

// Backend mocké — Phase 0. À remplacer par de vrais appels API (voir lib/api.ts
// à créer en Phase 3) une fois le backend NestJS disponible.

export const NEIGHBORHOODS: Record<'douala' | 'yaounde', string[]> = {
  douala: ['Bonapriso', 'Akwa', 'Bonamoussadi', 'Makepe', 'Bonanjo', 'Bonabéri'],
  yaounde: ['Bastos', 'Nlongkak', 'Odza', 'Mvan', 'Centre-ville', 'Biyem-Assi'],
}

export const CATEGORIES = ['restaurant', 'snack', 'club'] as const

export const MOCK_USERS: AppUser[] = [
  {
    id: 'u1',
    name: 'Junior Mbarga',
    phone: '+237 6 99 12 34 56',
    city: 'douala',
    role: 'user',
    memberSince: '2025-03-01',
  },
  {
    id: 'u2',
    name: 'Aïcha Kamdem',
    phone: '+237 6 77 88 99 00',
    city: 'yaounde',
    role: 'pro',
    memberSince: '2025-01-15',
  },
  {
    id: 'u3',
    name: 'Admin Komot',
    phone: '+237 6 55 00 11 22',
    city: 'douala',
    role: 'admin',
    memberSince: '2024-12-01',
  },
]

function seedImage(seed: string) {
  return `https://picsum.photos/seed/${seed}/800/600`
}

const DOUALA_NAMES = [
  'Le Poulet Doré', 'Chez Mama Ngo', 'Le Wouri Lounge', 'Le Bistrot',
  'Le Platinum', 'Le VIP Club', 'Poulet Braisé du Wouri', 'Akwa Grill',
  'Bonapriso Café', 'Le Manguier', "Chez Tantine", 'Le Lagon Bleu',
  'Sunset Bonanjo', 'Le Braisier', 'Makepe Snack', 'La Terrasse',
  'Le Night Club', 'Le Nkondo', 'Le Petit Paris', 'Douala By Night',
]
const YAOUNDE_NAMES = [
  'Le Bastos Grill', 'Chez Fifi', 'Le Nlongkak Lounge', 'Odza Café',
  'Le Mvan Snack', 'Centre-Ville Resto', 'Biyem-Assi Braise', 'Le Cristal',
  'Le Palace', 'La Corniche', 'Le Jardin', 'Le Nkolbisson',
  "L'Escale", 'Yaoundé By Night', 'Le Sable Fin',
]

function buildEstablishments(names: string[], city: 'douala' | 'yaounde', offset: number) {
  const hoods = NEIGHBORHOODS[city]
  return names.map((name, i) => {
    const category = CATEGORIES[i % 3]
    return {
      id: `${city}-${i + 1}`,
      name,
      category,
      city,
      neighborhood: hoods[i % hoods.length],
      address: `Rue ${100 + i}, ${hoods[i % hoods.length]}`,
      lat: (city === 'douala' ? 4.05 : 3.87) + (i % 5) * 0.01,
      lng: (city === 'douala' ? 9.7 : 11.52) + (i % 5) * 0.01,
      phone: `+237 6 9${offset}${i} 00 00`,
      whatsapp: `+237 6 9${offset}${i} 00 00`,
      priceRange: ((i % 3) + 1) as 1 | 2 | 3,
      rating: 3.8 + ((i * 7) % 12) / 10,
      reviewCount: 20 + i * 11,
      openNow: i % 4 !== 0,
      closingTime: i % 2 === 0 ? '23h' : '2h',
      image: seedImage(`${city}-${i}`),
      verified: i % 3 === 0,
      pro: i % 4 === 0,
    } satisfies Establishment
  })
}

export const MOCK_ESTABLISHMENTS: Establishment[] = [
  ...buildEstablishments(DOUALA_NAMES, 'douala', 1),
  ...buildEstablishments(YAOUNDE_NAMES, 'yaounde', 2),
]

const REVIEW_TEXTS = [
  'Le meilleur endroit du quartier, ambiance chaleureuse et service rapide.',
  'Très bon rapport qualité-prix. Un peu d\'attente le week-end.',
  "Ambiance au top, je reviendrai c'est sûr.",
  'Accueil très sympa, à recommander.',
  'Correct sans plus, mais les prix sont raisonnables.',
]

export const MOCK_REVIEWS: Review[] = MOCK_ESTABLISHMENTS.flatMap((est, ei) =>
  Array.from({ length: 4 + (ei % 4) }, (_, i) => ({
    id: `${est.id}-r${i}`,
    establishmentId: est.id,
    authorName: ['Junior M.', 'Aïcha K.', 'Patrick N.', 'Sarah B.', 'Yves T.'][i % 5],
    rating: 3 + ((i + ei) % 3),
    text: REVIEW_TEXTS[(i + ei) % REVIEW_TEXTS.length],
    createdAt: `2026-0${(i % 9) + 1}-1${i}`,
    likes: (i * 3 + ei) % 20,
  }))
)
