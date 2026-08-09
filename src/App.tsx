import { useEffect, useRef, useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Services } from './components/sections/Services'
import { Pricing } from './components/sections/Pricing'
import { Barbers } from './components/sections/Barbers'
import { Gallery } from './components/sections/Gallery'
import { Reviews } from './components/sections/Reviews'
import { Faq } from './components/sections/Faq'
import { Contact } from './components/sections/Contact'
import { BookingModal } from './components/booking/BookingModal'
import { PrivacyPolicyModal } from './components/legal/PrivacyPolicyModal'
import type { BookingModalPreset } from './components/booking/types'
import { trackYandexMetrikaGoal } from './api/yandexMetrika'

const NAV = [
  { href: '#top', label: 'О клинике' },
  { href: '#services', label: 'Решения' },
  { href: '#doctors', label: 'Специалисты' },
  { href: '#reviews', label: 'Запись' },
  { href: '#contact', label: 'Как найти' },
] as const

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [consentOpen, setConsentOpen] = useState(false)
  const [cookiesAccepted, setCookiesAccepted] = useState(() => window.localStorage.getItem('barbershop-cookie-consent') === 'accepted')
  const [preset, setPreset] = useState<BookingModalPreset | null>(null)
  const [servicesBackdropOpacity, setServicesBackdropOpacity] = useState(0)
  const servicesStageRef = useRef<HTMLDivElement | null>(null)

  const onOpenBooking = (nextPreset?: BookingModalPreset) => {
    setPreset(nextPreset ?? null)
    setBookingOpen(true)
    trackYandexMetrikaGoal('ym-open-leadform')
  }

  useEffect(() => {
    document.documentElement.classList.add('scroll-smooth')
    return () => document.documentElement.classList.remove('scroll-smooth')
  }, [])

  useEffect(() => {
    if (cookiesAccepted) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [cookiesAccepted])

  useEffect(() => {
    const updateBackdrop = () => {
      const stage = servicesStageRef.current
      if (!stage) return

      const rect = stage.getBoundingClientRect()
      const fadeDistance = Math.max(window.innerHeight * 0.45, 220)
      const nextOpacity = 1 - Math.min(Math.max(rect.top / fadeDistance, 0), 1)

      setServicesBackdropOpacity((current) =>
        Math.abs(current - nextOpacity) < 0.01 ? current : nextOpacity,
      )
    }

    updateBackdrop()
    window.addEventListener('scroll', updateBackdrop, { passive: true })
    window.addEventListener('resize', updateBackdrop)

    return () => {
      window.removeEventListener('scroll', updateBackdrop)
      window.removeEventListener('resize', updateBackdrop)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] [font-family:var(--font-body)]">
      <div inert={!cookiesAccepted}>
        <div
          aria-hidden="true"
          className="services-scroll-backdrop"
          style={{ opacity: servicesBackdropOpacity }}
        />
        <Header nav={NAV} onOpenBooking={() => onOpenBooking()} />
        <main className="relative z-10">
          <Hero onPrimaryCta={() => onOpenBooking()} />
          <Gallery id="clinic" />
          <div ref={servicesStageRef} className="services-scroll-stage">
            <Services id="services" onPickService={(service) => onOpenBooking({ service })} />
            <Pricing id="quiz" onOpenConsent={() => setConsentOpen(true)} onOpenPrivacy={() => setPrivacyOpen(true)} />
            <Barbers id="doctors" onBook={(barber) => onOpenBooking({ barber })} />
            <Reviews
              id="reviews"
              onOpenBooking={() => onOpenBooking()}
              onOpenConsent={() => setConsentOpen(true)}
              onOpenPrivacy={() => setPrivacyOpen(true)}
            />
            <Faq />
            <Contact id="contact" />
          </div>
        </main>
        <div className="services-scroll-stage">
          <Footer
            nav={NAV}
            onOpenBooking={() => onOpenBooking()}
            onOpenPrivacy={() => setPrivacyOpen(true)}
          />
        </div>
      </div>

      {!cookiesAccepted ? (
        <>
          <div className="fixed inset-0 z-[60] bg-[rgba(15,55,64,0.3)] backdrop-blur-[2px]" aria-hidden="true" />
          <section
            className="fixed inset-x-3 bottom-[calc(96px+env(safe-area-inset-bottom))] z-[70] mx-auto max-w-xl rounded-[28px] border border-white/80 bg-white/[0.96] p-5 shadow-[0_20px_60px_rgba(15,55,64,0.25)] backdrop-blur-2xl sm:bottom-6 sm:p-6 lg:bottom-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-title"
          >
            <p id="cookie-consent-title" className="text-lg font-semibold text-[var(--color-heading)]">Используем cookies</p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Оставаясь на сайте, вы соглашаетесь с использованием файлов cookie,{' '}
              <button type="button" onClick={() => setConsentOpen(true)} className="font-semibold text-[var(--color-accent-strong)] transition hover:text-[var(--color-heading)]">согласием на обработку персональных данных</button>{' '}
              и{' '}
              <button type="button" onClick={() => setPrivacyOpen(true)} className="font-semibold text-[var(--color-accent-strong)] transition hover:text-[var(--color-heading)]">политикой обработки персональных данных</button>.
            </p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  window.localStorage.setItem('barbershop-cookie-consent', 'accepted')
                  setCookiesAccepted(true)
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-[16px] bg-[var(--color-accent-strong)] px-5 text-sm font-semibold text-white transition hover:bg-[var(--color-heading)]"
              >
                Принять
              </button>
              <button
                type="button"
                onClick={() => {
                  window.close()
                  window.location.replace('about:blank')
                }}
                className="inline-flex min-h-12 items-center justify-center rounded-[16px] border border-[var(--color-line)] px-5 text-sm font-semibold text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
              >
                Выйти
              </button>
            </div>
          </section>
        </>
      ) : null}

      <BookingModal
        open={bookingOpen}
        preset={preset}
        onClose={() => setBookingOpen(false)}
        onOpenConsent={() => setConsentOpen(true)}
        onOpenPrivacy={() => setPrivacyOpen(true)}
      />
      <PrivacyPolicyModal open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
      <PrivacyPolicyModal open={consentOpen} mode="consent" onClose={() => setConsentOpen(false)} />
    </div>
  )
}
