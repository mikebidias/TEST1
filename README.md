# Komot PWA — Phase 0 (socle)

Stack : React 18 + Vite + TypeScript, Tailwind v4 + CSS variables, Zustand, React Router v6,
react-i18next (FR/EN), vite-plugin-pwa. Backend **mocké** (`src/mocks/data.ts`).

## Lancer
    npm install
    npm run dev      # développement
    npm run build    # build de production + service worker + manifest

## Ce que contient la Phase 0
- `src/core/theme/` : tokens CSS Komot (light/dark), `ThemeProvider` (suit le système, persistance localStorage)
- `src/core/i18n.ts` + `src/locales/{fr,en}.json` : bilingue, français par défaut, persistance localStorage
- `src/shared/icons/registry.tsx` : composant `<Icon name="gps_pin" />` (SVG maison, aucun emoji).
  38 icônes sur 82 pour l'instant (nav, actions, GPS, catégories, statuts) ; les autres s'ajoutent
  dans `PATHS` selon le même gabarit.
- `src/components/ui/` : Button, Input, Chip, Badge (les autres composants du brief arrivent avec les écrans qui en ont besoin)
- `src/stores/authStore.ts` : auth simulée (téléphone + n'importe quel code à 6 chiffres, Google simulé, mode invité)
- `src/router.tsx` : toutes les routes existent ; les écrans des phases suivantes sont des `PlaceholderPage`
- `src/features/auth/` : Landing publique + Auth Gateway (fonctionnels)
- `src/assets/branding/` : logos et icônes d'origine, **non modifiés** (pleine résolution).
  `public/icons/` contient uniquement les redimensionnements PWA (192/512, maskable, apple-touch).

## Photos
Placeholders via `https://picsum.photos/seed/{seed}/800/600` (voir `mocks/data.ts`, fonction `seedImage`).
Pour passer aux vraies photos : remplacer `seedImage()` par l'URL réelle de chaque établissement.

## Reste à faire (phases suivantes)
Écrans connexion/inscription/Pro (Phase 1), onboarding (2), écrans utilisateur (3), établissement (4),
Pro+ (5), admin (6), pages utilitaires (7), polish + Lighthouse (8).

## Phase 1 — Écrans publics (fait)
- **Landing** (`/`) : logo intégré, tout le contenu du brief, footer complet avec liens fonctionnels (les pages légales/contact pointent vers des `PlaceholderPage` Phase 7).
- **Auth Gateway** (`/auth`) : les 4 options.
- **Connexion** (`/login`) et **Inscription** (`/signup`) : téléphone + OTP (6 champs, collage du code, renvoi avec minuteur) ou **Google simulé**. L'inscription enchaîne sur l'étape profil (nom, email, ville, photo) puis `/onboarding` (Phase 2).
- **Inscription Pro** (`/pro/onboarding`) : 6 étapes + confirmation — bienvenue, compte (téléphone/OTP ou Google), informations, **localisation GPS** (3 méthodes : GPS auto, carte Leaflet/OpenStreetMap avec repère déplaçable, saisie manuelle avec validation des bornes), détails (horaires jour par jour, prix, description, photos), récapitulatif + CGU pro. Le compte passe en rôle "pro" seulement à la soumission — l'upsell Pro+ n'apparaît qu'après, jamais pendant l'inscription gratuite.
- **Mode invité** : bandeau discret sur les écrans utilisateur (`GuestBanner`), fermable, avec incitation à créer un compte.
- Nouveaux composants : `Logo`, `OtpInput`, `PhoneInput` (format camerounais + validation), `Select`, `Textarea`, `Checkbox`, `SegmentedControl`, `Stepper`, `ImageUpload`, `LocationPicker` (Leaflet/OpenStreetMap, sans dépendance aux icônes PNG par défaut).
- Comptes de démonstration sur l'écran de connexion pour atteindre directement le dashboard Pro ou l'admin sans repasser par tout le flux.

### Limites connues de cette phase
- Le bundle JS n'est pas encore découpé (`chunkSizeWarningLimit`) — prévu en Phase 8 (polish/perf).
- Les pages légales et le contact sont des `PlaceholderPage` (Phase 7).
- Les icônes du registre restent le sous-ensemble de la Phase 0 + `action_google`, `action_add_photo`, `action_plus`, `gps_my_position`.

## Phase 2 — Onboarding (fait)
- `/onboarding` : bienvenue → `/onboarding/city` (choix Douala/Yaoundé, compteur de lieux issu des données mockées, met à jour le profil) → `/onboarding/interests` (catégories multi-select, au moins une requise) → `/onboarding/location` (vraie demande `navigator.geolocation`, "Plus tard" possible) → `/onboarding/notifications` (vraie demande `Notification.requestPermission`, "Plus tard" possible) → `/onboarding/done` → `/home`.
- Indicateur de progression à points (5 étapes visibles, l'écran "Terminé" n'en fait pas partie).
- Nouveau store `usePrefsStore` (`src/stores/prefsStore.ts`) : centres d'intérêt et permissions persistés en localStorage, indépendant du compte (utile aussi pour le mode invité).
- Nouvelles icônes : `system_bell`, `system_door`, `system_confetti`.
