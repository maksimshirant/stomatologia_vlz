import { useEffect, useState } from 'react'
import hospitalIcon from '../../assets/menu-icons/hospital.svg'
import heartPulseIcon from '../../assets/menu-icons/heart-pulse.svg'
import stethoscopeIcon from '../../assets/menu-icons/stethoscope.svg'
import calendarCheckIcon from '../../assets/menu-icons/calendar-check.svg'
import mapPinnedIcon from '../../assets/menu-icons/map-pinned.svg'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export type HeaderNavItem = { href: string; label: string }

const NAV_ICON_SOURCES = [hospitalIcon, heartPulseIcon, stethoscopeIcon, calendarCheckIcon, mapPinnedIcon] as const

// Returns the downloaded navigation icon that matches the item's position.
function NavIcon({ index }: { index: number }) {
  const iconSource = NAV_ICON_SOURCES[index] ?? mapPinnedIcon

  return (
    <img src={iconSource} alt="" aria-hidden="true" className="h-[18px] w-[18px] opacity-70" />
  )
}

export function Header({ nav, onOpenBooking }: { nav: ReadonlyArray<HeaderNavItem>; onOpenBooking: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [activeHref, setActiveHref] = useState('#top')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 72)
      setHasScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    // Keeps the highlighted navigation item synchronized after a hash link is selected.
    const syncActiveHref = () => setActiveHref(window.location.hash)
    window.addEventListener('hashchange', syncActiveHref)
    return () => window.removeEventListener('hashchange', syncActiveHref)
  }, [])

  return (
    <>
      <header className={cx(
        'sticky top-0 z-40 backdrop-blur-sm transition-colors duration-300 min-[1166px]:relative min-[1166px]:border-b min-[1166px]:border-white/40',
        hasScrolled ? 'bg-white/[0.88] shadow-[0_8px_24px_rgba(15,55,64,0.12)]' : 'bg-white/20',
      )}>
        <Container>
          <div className="flex min-h-[72px] items-center justify-between gap-4 py-3">
            <a href="#top" onClick={() => setActiveHref('#top')} className="inline-flex shrink-0 items-center gap-3" aria-label="Бетка">
              <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[var(--color-accent)] text-white shadow-[0_10px_24px_rgba(20,184,196,0.2)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M7.2 3.6c1.7 0 2.7.9 4.8.9s3.1-.9 4.8-.9c2.5 0 4.2 2 4.2 4.5 0 2.1-1 3.4-1.8 5.5-.9 2.3-1.1 6.8-3.6 6.8-1.8 0-1.4-4.7-3.6-4.7s-1.8 4.7-3.6 4.7c-2.5 0-2.7-4.5-3.6-6.8C4 11.5 3 10.2 3 8.1c0-2.5 1.7-4.5 4.2-4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg>
              </span>
              <span><span className="block text-xl font-bold tracking-[-0.03em] text-[var(--color-heading)]">Бетка</span><span className="block text-[9px] uppercase tracking-[0.2em] text-[var(--color-muted)]">тут логотип</span></span>
            </a>

            <nav className="ml-auto hidden items-center gap-7 min-[1166px]:flex">
              {nav.map((item) => (
                <a key={item.href} href={item.href} aria-current={activeHref === item.href ? 'page' : undefined} onClick={() => setActiveHref(item.href)} className={cx(
                  'group relative px-3 py-2 text-xs font-semibold transition-colors duration-300 hover:text-[var(--color-accent-strong)]',
                  activeHref === item.href ? 'text-[var(--color-accent-strong)]' : 'text-slate-600',
                )}>
                  <span>{item.label}</span>
                  <span className={cx(
                    'absolute inset-x-3 bottom-1 h-px origin-left bg-[var(--color-accent-strong)] transition-transform duration-300',
                    activeHref === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                  )} aria-hidden="true" />
                </a>
              ))}
            </nav>

            <div className="ml-auto hidden items-center gap-5 min-[1166px]:flex">
              <a href="tel:+79000000000" className="group relative px-3 py-2 text-sm font-semibold text-[var(--color-heading)] transition-colors duration-300 hover:text-[var(--color-accent-strong)]">
                <span>+7 (900) 000-00-00</span>
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-[var(--color-accent-strong)] transition-transform duration-300 group-hover:scale-x-100" aria-hidden="true" />
              </a>
              <Button type="button" size="xs" className="hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white" onClick={onOpenBooking}>Бесплатная консультация</Button>
            </div>

            <button type="button" className="ml-auto hidden h-10 items-center justify-center rounded-md bg-[var(--color-accent)] px-4 text-xs font-semibold text-white shadow-[0_8px_22px_rgba(20,184,196,0.28)] transition duration-300 hover:bg-[var(--color-accent-strong)] active:scale-[0.94] md:inline-flex min-[1166px]:!hidden" onClick={onOpenBooking}>Бесплатная консультация</button>
            <a href="tel:+7900000000" aria-label="Позвонить в клинику Бетку" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--color-accent)] text-white shadow-[0_8px_22px_rgba(20,184,196,0.28)] transition duration-300 active:scale-[0.94] min-[1166px]:hidden">
              <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.3 2.3.5 3.5.5a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.5a1 1 0 0 1-.3 1l-2.2 2.3Z" fill="currentColor" /></svg>
            </a>
          </div>
        </Container>
      </header>

      <nav aria-label="Навигация по клинике" className={cx(
        'fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-[28px] border border-white/75 bg-white/[0.88] p-2 shadow-[0_16px_46px_rgba(18,52,61,0.2),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-2xl transition-[transform,opacity] duration-500 ease-out min-[1166px]:flex',
        scrolled ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-8 opacity-0',
      )}>
        {nav.map((item, index) => (
          <a key={item.href} href={item.href} aria-current={activeHref === item.href ? 'page' : undefined} onClick={() => setActiveHref(item.href)} className={cx(
            'flex min-h-14 min-w-[76px] flex-col items-center justify-center gap-1 rounded-[20px] px-2 py-1.5 text-[10px] font-semibold transition-colors duration-300',
            activeHref === item.href ? 'bg-[var(--color-accent-pale)] text-[var(--color-accent-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]' : 'text-[var(--color-muted)] hover:bg-[var(--color-accent-pale)] hover:text-[var(--color-accent-strong)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
          )}>
            <NavIcon index={index} />
            <span>{item.label}</span>
          </a>
        ))}
        <span className="mx-1 h-10 w-px bg-[var(--color-line)]" aria-hidden="true" />
        <a href="tel:+79000000000" className="flex min-h-14 w-[76px] flex-col items-center justify-center gap-1 rounded-[20px] px-2 py-1.5 text-center text-[10px] font-semibold text-[var(--color-heading)] transition-colors duration-300 hover:bg-[var(--color-accent-pale)] hover:text-[var(--color-accent-strong)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
          <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-[var(--color-accent)]" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.2c1.1.3 2.3.5 3.5.5a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.2.2 2.4.6 3.5a1 1 0 0 1-.3 1l-2.2 2.3Z" fill="currentColor" /></svg>
          Позвонить
        </a>
      </nav>

      <nav aria-label="Навигация по клинике" className="fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-50 mx-auto max-w-xl rounded-[28px] border border-white/75 bg-white/[0.88] p-1.5 shadow-[0_16px_46px_rgba(18,52,61,0.22),inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-2xl min-[1166px]:hidden">
        <div className="grid grid-cols-5 gap-1">
          {nav.map((item, index) => (
            <a key={item.href} href={item.href} aria-current={activeHref === item.href ? 'page' : undefined} onClick={() => setActiveHref(item.href)} className={cx(
              'relative flex min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-[20px] px-1 py-1.5 text-[10px] font-semibold transition-colors active:scale-[0.96]',
              activeHref === item.href ? 'bg-[var(--color-accent-pale)] text-[var(--color-accent-strong)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]' : 'text-[var(--color-muted)]',
            )}>
              <NavIcon index={index} />
              <span className="max-w-full truncate">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
