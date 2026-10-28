import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/pwa/ThemeToggle'
import { LanguageToggle } from '@/components/pwa/LanguageToggle'
import { Icon } from '@/shared/icons/registry'
import { Logo } from '@/components/ui/Logo'
import { useAuthStore } from '@/stores/authStore'
import { MOCK_ESTABLISHMENTS } from '@/mocks/data'

export function LandingPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const continueAsGuest = useAuthStore((s) => s.continueAsGuest)
  const startGuest = () => {
    continueAsGuest()
    navigate('/home')
  }

  const counts = {
    establishments: MOCK_ESTABLISHMENTS.length,
    restaurants: MOCK_ESTABLISHMENTS.filter((e) => e.category === 'restaurant').length,
    snacks: MOCK_ESTABLISHMENTS.filter((e) => e.category === 'snack').length,
    clubs: MOCK_ESTABLISHMENTS.filter((e) => e.category === 'club').length,
  }

  return (
    <div>
      {/* Top bar publique */}
      <header
        className="h-18 flex items-center justify-between px-4 md:px-10 sticky top-0 z-30 safe-top"
        style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '1px solid var(--border-default)' }}
      >
        <Link to="/" aria-label="Komot">
          <Logo variant="horizontal" height={36} />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span style={{ color: 'var(--text-primary)' }}>{t('landing.navHome')}</span>
          <button type="button" onClick={startGuest}>{t('landing.navExplore')}</button>
          <Link to="/pro/onboarding">{t('landing.navPros')}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <Button variant="secondary" size="sm" onClick={() => navigate('/auth')}>
            {t('landing.login')}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 md:px-10 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
        <div className="flex flex-col gap-6 text-center md:text-left items-center md:items-start">
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight">
            {t('landing.heroTitle')}
          </h1>
          <p className="text-lg max-w-md" style={{ color: 'var(--text-secondary)' }}>
            {t('landing.heroSubtitle')}
          </p>
          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button size="lg" iconRight="action_chevron_right" onClick={() => navigate('/auth?mode=signup')}>
              {t('landing.ctaSignup')}
            </Button>
            <Button variant="ghost" size="lg" onClick={startGuest}>
              {t('landing.ctaGuest')}
            </Button>
          </div>
        </div>
        <div className="hidden md:flex aspect-square rounded-xl items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)', boxShadow: 'var(--elevation-2)' }}>
          <Logo variant="vertical" height={280} />
        </div>
      </section>

      {/* Pourquoi Komot */}
      <section className="py-16 px-4 md:px-10" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <h2 className="font-display font-bold text-2xl md:text-4xl text-center mb-10">
          {t('landing.whyTitle')}
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { icon: 'action_star' as const, title: t('landing.whyReviewsTitle'), body: t('landing.whyReviewsBody') },
            { icon: 'action_route' as const, title: t('landing.whyRoutesTitle'), body: t('landing.whyRoutesBody') },
            { icon: 'action_whatsapp' as const, title: t('landing.whyWhatsappTitle'), body: t('landing.whyWhatsappBody') },
          ].map((f) => (
            <div key={f.title} className="card p-6 flex flex-col gap-3">
              <Icon name={f.icon} size={40} color="var(--accent-primary)" />
              <h3 className="font-display font-semibold text-lg">{f.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 px-4 md:px-10 max-w-5xl mx-auto">
        <h2 className="font-display font-bold text-2xl md:text-4xl text-center mb-10">
          {t('landing.categoriesTitle')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: 'category_restaurant' as const, label: t('landing.categoryRestaurants'), count: counts.restaurants },
            { icon: 'category_snack' as const, label: t('landing.categorySnacks'), count: counts.snacks },
            { icon: 'category_club' as const, label: t('landing.categoryClubs'), count: counts.clubs },
          ].map((c) => (
            <button
              key={c.label}
              onClick={() => navigate('/auth')}
              className="card h-52 flex flex-col items-center justify-center gap-3 text-left"
            >
              <Icon name={c.icon} size={40} color="var(--accent-primary)" />
              <span className="font-display font-semibold text-lg">{c.label}</span>
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {c.count}+ adresses
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Section Pro */}
      <section className="py-16 px-4 md:px-10" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div
          className="max-w-4xl mx-auto rounded-xl p-8 md:p-12 flex flex-col gap-4"
          style={{ background: 'color-mix(in srgb, var(--accent-primary) 10%, transparent)', border: '1px solid var(--accent-primary)' }}
        >
          <h2 className="font-display font-bold text-2xl md:text-3xl">{t('landing.proTitle')}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>{t('landing.proSubtitle')}</p>
          <ul className="flex flex-col gap-2 text-sm">
            {[
              { icon: 'action_view' as const, text: t('landing.proBenefit1') },
              { icon: 'pro_diamond' as const, text: t('landing.proBenefit2') },
              { icon: 'action_edit' as const, text: t('landing.proBenefit3') },
              { icon: 'action_route' as const, text: t('landing.proBenefit4') },
            ].map((b) => (
              <li key={b.text} className="flex items-center gap-2">
                <Icon name={b.icon} size={18} color="var(--accent-primary)" />
                {b.text}
              </li>
            ))}
          </ul>
          <Button className="self-start mt-2" onClick={() => navigate('/pro/onboarding')}>
            {t('landing.proCta')}
          </Button>
        </div>
      </section>

      {/* Chiffres */}
      <section className="py-16 px-4 md:px-10 max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
        {[
          { value: `${counts.establishments}+`, label: t('landing.statsEstablishments') },
          { value: '12 000+', label: t('landing.statsUsers') },
          { value: '4.7', label: t('landing.statsRating') },
        ].map((s) => (
          <div key={s.label}>
            <div className="font-display font-bold text-3xl md:text-5xl" style={{ color: 'var(--accent-primary)' }}>
              {s.value}
            </div>
            <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        className="px-4 md:px-10 py-10 text-sm"
        style={{ borderTop: '1px solid var(--border-default)', color: 'var(--text-tertiary)' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <Logo variant="horizontal" height={32} className="self-start" />
            <p>{t('common.tagline')}</p>
          </div>
          <FooterColumn
            title={t('landing.footerNav')}
            links={[
              { label: t('nav.home'), onClick: () => navigate('/') },
              { label: t('nav.explore'), onClick: startGuest },
              { label: t('nav.favorites'), onClick: () => navigate('/auth') },
              { label: t('nav.reviews'), onClick: () => navigate('/auth') },
            ]}
          />
          <FooterColumn
            title={t('landing.footerPros')}
            links={[
              { label: t('landing.proCta'), onClick: () => navigate('/pro/onboarding') },
              { label: t('landing.footerDashboard'), onClick: () => navigate('/pro/dashboard') },
              { label: t('landing.footerPricing'), onClick: () => navigate('/pro/pricing') },
              { label: t('landing.footerSupport'), onClick: () => navigate('/contact') },
            ]}
          />
          <FooterColumn
            title={t('landing.footerLegal')}
            links={[
              { label: t('landing.footerTerms'), onClick: () => navigate('/legal/terms') },
              { label: t('landing.footerPrivacy'), onClick: () => navigate('/legal/privacy') },
              { label: t('landing.footerLegalNotice'), onClick: () => navigate('/legal/notice') },
            ]}
          />
        </div>
        <div
          className="max-w-6xl mx-auto mt-8 pt-6 flex flex-col md:flex-row justify-between gap-2"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <span>
            {t('landing.footerFollow')} Instagram · TikTok · Facebook
          </span>
          <span>© 2026 Komot. {t('landing.footerRights')}</span>
        </div>
      </footer>
    </div>
  )
}

function FooterColumn({ title, links }: { title: string; links: { label: string; onClick: () => void }[] }) {
  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
        {title}
      </div>
      {links.map((l) => (
        <button key={l.label} type="button" onClick={l.onClick} className="text-left hover:underline">
          {l.label}
        </button>
      ))}
    </div>
  )
}
