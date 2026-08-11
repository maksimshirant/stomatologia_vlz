import { useEffect, useRef, useState } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Button } from './components/ui/Button'
import { assetUrl } from './lib/assetUrl'
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
  const [cookiesAccepted, setCookiesAccepted] = useState(() => window.localStorage.getItem('stomatologia_vlz-cookie-consent') === 'accepted')
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
          <section aria-labelledby="promotions-title" className="border-b border-[var(--color-line)] bg-[var(--color-bg)] py-16 md:py-24">
            <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
              <div>
                <h2 id="promotions-title" className="section-heading text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]">
                  Действующие <span className="text-[var(--color-accent-strong)]">акции</span>
                </h2>
              </div>

              <div className="mt-10 grid gap-4 lg:grid-cols-2">
                <article className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[30px] bg-[var(--color-heading)] p-6 text-white sm:p-8">
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -right-10 h-64 w-64 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />
                  <div aria-hidden="true" style={{ backgroundImage: `url(${assetUrl('dental/service-objects-cutout.png')})`, backgroundPosition: '100% 0%', backgroundSize: '200% 200%' }} className="pointer-events-none absolute -right-4 top-2 z-0 h-44 w-44 bg-no-repeat opacity-95 sm:-right-6 sm:top-3 sm:h-60 sm:w-60" />
                  <div className="relative z-10 max-w-[56%] sm:max-w-[68%]">
                    <h3 className="text-balance text-3xl font-semibold leading-[0.96] tracking-[-0.05em] [font-family:var(--font-display)] sm:text-4xl sm:font-medium">
                      Имплант Medentika с коронкой из диоксида циркония
                    </h3>
                  </div>
                  <div className="relative z-10 mt-auto pt-10">
                    <p className="text-4xl font-semibold leading-none tracking-[-0.05em] [font-family:var(--font-display)] sm:text-5xl">84&nbsp;900 ₽</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button type="button" onClick={() => onOpenBooking()} className="!border-white !bg-white !text-[var(--color-heading)] hover:!border-[var(--color-accent-strong)] hover:!bg-white hover:!text-[var(--color-accent-strong)]">Записаться на приём</Button>
                    </div>
                  </div>
                </article>

                <article className="relative flex min-h-[300px] flex-col overflow-hidden rounded-[30px] bg-[var(--color-accent-strong)] p-6 text-white sm:p-8">
                  <div aria-hidden="true" style={{ backgroundImage: `url(${assetUrl('dental/service-objects-cutout.png')})`, backgroundPosition: '0% 100%', backgroundSize: '200% 200%' }} className="pointer-events-none absolute right-2 top-4 z-0 h-24 w-36 bg-no-repeat opacity-95 sm:right-4 sm:top-6 sm:h-56 sm:w-80" />
                  <div className="relative z-10 max-w-[40%] sm:max-w-[45%]">
                    <h3 className="text-balance text-3xl font-semibold leading-[0.96] tracking-[-0.05em] [font-family:var(--font-display)] sm:text-4xl sm:font-medium">
                      All-on-4: немецкие импланты Medentika
                    </h3>
                  </div>
                  <div className="relative z-10 mt-auto pt-10">
                    <p className="text-4xl font-semibold leading-none tracking-[-0.05em] [font-family:var(--font-display)] sm:text-5xl">от 6&nbsp;300 ₽ в месяц</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button type="button" onClick={() => onOpenBooking()} className="!border-white !bg-white !text-[var(--color-heading)] hover:!border-[var(--color-accent-strong)] hover:!bg-white hover:!text-[var(--color-accent-strong)]">Записаться на приём</Button>
                    </div>
                  </div>
                </article>
              </div>

              <p className="mt-6 text-center text-xs leading-5 text-[var(--color-muted)] sm:text-sm">Имеются противопоказания. Необходима консультация специалиста.</p>
            </div>
          </section>
          <section aria-labelledby="certificate-title" className="bg-[var(--color-accent-strong)] py-10 sm:py-14">
            <div className="mx-auto w-full max-w-[1360px] px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
                <div className="min-h-[270px] sm:min-h-[360px]">
                  <img src={assetUrl('dental/gift-certificate-cutout.png')} alt="Подарочный сертификат клиники" loading="lazy" className="h-full min-h-[270px] w-full object-contain sm:min-h-[360px]" />
                </div>

                <div className="py-2 sm:py-6">
                  <h2 id="certificate-title" className="max-w-xl text-balance text-3xl font-semibold leading-[0.98] tracking-[-0.05em] text-white [font-family:var(--font-display)] sm:text-4xl sm:font-medium">
                    Подарите своим близким заботу о здоровье их улыбки
                  </h2>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                    Подарочный сертификат в нашу клинику — это искренний жест заботы о здоровье и улыбке тех, кто вам по-настоящему дорог. Подходит для любого повода и запоминается надолго.
                  </p>
                  <div className="flex flex-col gap-3 pt-8 sm:flex-row">
                    <Button type="button" onClick={() => onOpenBooking()} className="!border-white !bg-white !text-[var(--color-accent-strong)] hover:!border-[var(--color-accent-strong)] hover:!bg-white hover:!text-[var(--color-accent-strong)] sm:min-w-56">Заказать сертификат</Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                  window.localStorage.setItem('stomatologia_vlz-cookie-consent', 'accepted')
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
