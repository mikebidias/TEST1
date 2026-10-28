// Registre des icônes Komot. Chaque icône est un tracé SVG 24x24, trait 2px,
// extrémités arrondies — conforme au brief "aucun emoji standard".
// Phase 0 couvre le sous-ensemble utilisé par les composants de base et les
// écrans publics ; les icônes restantes du set de 82 se rajoutent ici au fil
// des phases suivantes, suivant le même gabarit.
import type { SVGProps } from 'react'

export type IconName =
  | 'nav_home'
  | 'nav_explore'
  | 'nav_search'
  | 'nav_favorite'
  | 'nav_profile'
  | 'action_route'
  | 'action_call'
  | 'action_whatsapp'
  | 'action_share'
  | 'action_star'
  | 'action_close'
  | 'action_back'
  | 'action_chevron_right'
  | 'action_chevron_down'
  | 'action_more'
  | 'action_settings'
  | 'action_notification'
  | 'action_theme'
  | 'action_edit'
  | 'action_view'
  | 'action_check'
  | 'action_warning'
  | 'action_filter'
  | 'action_google'
  | 'action_add_photo'
  | 'action_plus'
  | 'gps_my_position'
  | 'gps_pin'
  | 'gps_recenter'
  | 'gps_coordinates'
  | 'category_restaurant'
  | 'category_snack'
  | 'category_club'
  | 'status_open'
  | 'status_closed'
  | 'status_verified'
  | 'pro_diamond'
  | 'system_cameroon'
  | 'system_clock'
  | 'system_globe'
  | 'system_lock'
  | 'admin_establishment'
  | 'system_bell'
  | 'system_door'
  | 'system_confetti'

type PathDef = { d?: string; children?: React.ReactNode }

// d = tracé "outline" par défaut ; pour l'instant outline et filled partagent
// le même tracé (un remplissage dédié pourra être ajouté icône par icône).
const PATHS: Record<IconName, PathDef> = {
  nav_home: { d: 'M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h4v-6h2v6h4a1 1 0 0 0 1-1v-9' },
  nav_explore: {
    children: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="m15 9-4.2 1.8L9 15l4.2-1.8L15 9Z" />
      </>
    ),
  },
  nav_search: {
    children: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-4.3-4.3" />
      </>
    ),
  },
  nav_favorite: {
    d: 'M12 20.5S4 15.4 4 9.9C4 6.9 6.2 5 8.6 5c1.6 0 3 .8 3.9 2.1C13.4 5.8 14.8 5 16.4 5 18.8 5 21 6.9 21 9.9c0 5.5-9 10.6-9 10.6Z',
  },
  nav_profile: {
    children: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1-3.3 4-5 7-5s6 1.7 7 5" />
      </>
    ),
  },
  action_route: {
    children: (
      <>
        <path d="M5 12a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
        <path d="M6.6 9.6 17 6l-3.6 10.4L9.9 12l-3.3-2.4Z" />
      </>
    ),
  },
  action_call: {
    d: 'M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.3-.3.7-.4 1-.3 1.1.4 2.3.6 3.4.6.6 0 1 .4 1 1V19c0 .6-.4 1-1 1C10.7 20 4 13.3 4 5c0-.6.4-1 1-1h3c.6 0 1 .4 1 1 0 1.2.2 2.3.6 3.4.1.4 0 .8-.3 1l-2 2Z',
  },
  action_whatsapp: {
    children: (
      <>
        <path d="M12 4a8 8 0 0 0-6.9 12l-1.1 4 4.1-1.1A8 8 0 1 0 12 4Z" />
        <path d="M9 9.5c.2 2.6 2.4 4.8 5 5l1-1.5-2.2-.9-.6.6a5.4 5.4 0 0 1-2.4-2.4l.6-.6L9.5 8.5 9 9.5Z" />
      </>
    ),
  },
  action_share: {
    children: (
      <>
        <circle cx="18" cy="6" r="2.3" />
        <circle cx="6" cy="12" r="2.3" />
        <circle cx="18" cy="18" r="2.3" />
        <path d="m8 10.8 8-3.6M8 13.2l8 3.6" />
      </>
    ),
  },
  action_star: {
    d: 'm12 4 2.3 5 5.4.6-4 3.8 1 5.4L12 16.2 7.3 18.8l1-5.4-4-3.8 5.4-.6L12 4Z',
  },
  action_close: { d: 'M6 6l12 12M18 6 6 18' },
  action_back: { d: 'M15 5 8 12l7 7' },
  action_chevron_right: { d: 'm9 5 7 7-7 7' },
  action_chevron_down: { d: 'm5 9 7 7 7-7' },
  action_more: {
    children: (
      <>
        <circle cx="5" cy="12" r="1.6" />
        <circle cx="12" cy="12" r="1.6" />
        <circle cx="19" cy="12" r="1.6" />
      </>
    ),
  },
  action_settings: {
    children: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
      </>
    ),
  },
  action_notification: {
    d: 'M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16Z M10 20a2 2 0 0 0 4 0',
  },
  action_theme: {
    children: (
      <>
        <circle cx="9" cy="9" r="3.4" />
        <path d="M17 15.5A7 7 0 0 1 8.5 7 7 7 0 1 0 17 15.5Z" opacity="0" />
        <path d="M9 2.6v1.8M9 13.6v1.8M2.6 9h1.8M13.6 9h1.8M4.5 4.5l1.3 1.3M12.2 12.2l1.3 1.3M13.5 4.5l-1.3 1.3M5.8 12.2 4.5 13.5" />
      </>
    ),
  },
  action_edit: {
    d: 'm14.5 4.5 5 5L8 21l-5 1 1-5 10.5-12.5ZM13 6l5 5',
  },
  action_view: {
    children: (
      <>
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
        <circle cx="12" cy="12" r="2.6" />
      </>
    ),
  },
  action_check: { d: 'm5 12.5 4.5 4.5L19 7' },
  action_warning: {
    children: (
      <>
        <path d="M12 3.5 21.5 20h-19L12 3.5Z" />
        <path d="M12 10v4M12 16.8v.1" />
      </>
    ),
  },
  action_filter: { d: 'M4 6h16M7.5 12h9M11 18h2' },
  action_google: { d: 'M18.5 7.8A7.5 7.5 0 1 0 19.5 12.5H12' },
  action_add_photo: {
    children: (
      <>
        <path d="M4 8.500A1.500 1.500 0 0 1 5.500 7h2L9 5h6l1.500 2h2A1.500 1.500 0 0 1 20 8.500V18a1.500 1.500 0 0 1-1.500 1.500h-13A1.500 1.500 0 0 1 4 18V8.500Z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
  },
  action_plus: { d: 'M12 5v14M5 12h14' },
  gps_my_position: {
    children: (
      <>
        <circle cx="12" cy="12" r="3.2" />
        <circle cx="12" cy="12" r="8" />
      </>
    ),
  },
  gps_pin: {
    d: 'M12 21s7-6.6 7-11.5A7 7 0 1 0 5 9.5C5 14.4 12 21 12 21Z',
    children: <circle cx="12" cy="9.5" r="2.4" />,
  },
  gps_recenter: {
    children: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      </>
    ),
  },
  gps_coordinates: { d: 'M4 4v12h12M16 8v8h-8' },
  category_restaurant: {
    d: 'M7 3v7M5 3v4a2 2 0 0 0 4 0V3M7 10v11M17 3c-1.7 0-3 2-3 5s1.3 5 3 5M17 3v18',
  },
  category_snack: {
    d: 'M5 11a7 7 0 0 0 14 0H5ZM10 4c-.6.8-.6 1.6 0 2.4M13 4c-.6.8-.6 1.6 0 2.4',
  },
  category_club: {
    children: (
      <>
        <circle cx="8" cy="18" r="2.2" />
        <path d="M10 18V5l8-2v11" />
        <circle cx="18" cy="14" r="2.2" />
      </>
    ),
  },
  status_open: { d: 'M12 2.5A9.5 9.5 0 1 0 21.5 12 9.5 9.5 0 0 0 12 2.5Z M12 7v5l3.2 2' },
  status_closed: { d: 'M12 2.5A9.5 9.5 0 1 0 21.5 12 9.5 9.5 0 0 0 12 2.5Z M8 8l8 8M16 8l-8 8' },
  status_verified: {
    d: 'm12 2 2.5 1.5L17.5 3l1 3 3 1-.5 3 .5 3-3 1-1 3-3-.5L12 22l-2.5-1.5L6.5 21l-1-3-3-1 .5-3-.5-3 3-1 1-3 3 .5L12 2Z',
    children: <path d="m8.5 12.3 2.2 2.2 4.8-4.8" />,
  },
  pro_diamond: { d: 'M4 9 8 3h8l4 6-8 12L4 9Z' },
  system_cameroon: {
    children: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="1.5" fill="none" />
        <path d="M9.3 5v14M14.7 5v14" />
        <path d="m12 9.8 1 2h-2l1-2Z" />
      </>
    ),
  },
  system_clock: {
    children: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
  },
  system_globe: {
    children: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18" />
      </>
    ),
  },
  system_lock: {
    d: 'M6 11V8a6 6 0 1 1 12 0v3',
    children: <rect x="5" y="11" width="14" height="10" rx="2" fill="none" />,
  },
  system_bell: {
    d: 'M6 16V11a6 6 0 1 1 12 0v5l1.5 2.5h-15L6 16Z',
    children: <path d="M10 20a2 2 0 0 0 4 0" />,
  },
  system_door: {
    children: (
      <>
        <rect x="6" y="3" width="10" height="18" rx="1" fill="none" />
        <circle cx="13.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
        <path d="M16 7c2.2.4 4 2 4.6 4.2M16 9.5c1 .3 1.9 1 2.3 2" />
      </>
    ),
  },
  system_confetti: {
    children: (
      <>
        <path d="M5 3v2.4M3 5h2.4M18 4l1.5 1.5M20.5 2.5 19 4M9 15l6-6M4 20l3-7 7-3-3 7-7 3Z" />
      </>
    ),
  },
  admin_establishment: {
    children: (
      <>
        <rect x="4" y="9" width="16" height="12" rx="1" fill="none" />
        <path d="M4 9 12 3l8 6M10 21v-5h4v5" />
      </>
    ),
  },
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: number
  variant?: 'outline' | 'filled'
}

/** Icône Komot : trait 2px, coins arrondis, hérite de la couleur du texte
 * parent (currentColor) sauf si `color`/`className` la fixent. */
export function Icon({ name, size = 24, variant = 'outline', className, ...rest }: IconProps) {
  const def = PATHS[name]
  if (!def) return null
  const fill = variant === 'filled' ? 'currentColor' : 'none'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={variant === 'filled' ? 0 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {def.d && <path d={def.d} />}
      {def.children}
    </svg>
  )
}
