export type UserRole = 'user' | 'pro' | 'admin'
export type City = 'douala' | 'yaounde'
export type PriceRange = 1 | 2 | 3

export interface AppUser {
  id: string
  name: string
  phone: string
  email?: string
  avatarUrl?: string
  city: City
  role: UserRole
  memberSince: string
}

export interface Establishment {
  id: string
  name: string
  category: 'restaurant' | 'snack' | 'club'
  city: City
  neighborhood: string
  address: string
  lat: number
  lng: number
  phone: string
  whatsapp: string
  priceRange: PriceRange
  rating: number
  reviewCount: number
  openNow: boolean
  closingTime: string
  image: string
  verified: boolean
  pro: boolean
}

export interface Review {
  id: string
  establishmentId: string
  authorName: string
  rating: number
  text: string
  createdAt: string
  likes: number
}
