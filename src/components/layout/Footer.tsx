import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import type { HeaderNavItem } from './Header'

export function Footer({ nav, onOpenBooking, onOpenPrivacy }: { nav: ReadonlyArray<HeaderNavItem>; onOpenBooking: () => void; onOpenPrivacy: () => void }) {
  return (
    <footer className="bg-[var(--color-heading)] text-white">
      <Container>
        <div className="grid gap-10 py-12 md:grid-cols-2 xl:grid-cols-[1.25fr_0.75fr_0.9fr] xl:py-16">
          <div>
            <a href="#top" className="inline-flex items-center gap-3" aria-label="Denta VLG">
              <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[var(--color-accent)] text-white"><svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true"><path d="M7.2 3.6c1.7 0 2.7.9 4.8.9s3.1-.9 4.8-.9c2.5 0 4.2 2 4.2 4.5 0 2.1-1 3.4-1.8 5.5-.9 2.3-1.1 6.8-3.6 6.8-1.8 0-1.4-4.7-3.6-4.7s-1.8 4.7-3.6 4.7c-2.5 0-2.7-4.5-3.6-6.8C4 11.5 3 10.2 3 8.1c0-2.5 1.7-4.5 4.2-4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" /></svg></span>
              <span className="text-2xl font-bold">Бетка</span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-7 text-cyan-50/65">Начните с консультации: врач поможет понять ситуацию и выбрать комфортный путь к здоровой улыбке.</p>
            <Button type="button" onClick={onOpenBooking} className="mt-7">Получить консультацию</Button>
          </div>
          <div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-light)]">Узнайте больше</div><div className="mt-5 grid gap-3">{nav.map((item) => <a key={item.href} href={item.href} className="text-sm text-cyan-50/70 transition hover:text-white">{item.label}</a>)}</div></div>
          <div><div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-light)]">На связи с вами</div><div className="mt-5 grid gap-3 text-sm text-cyan-50/70"><a href="tel:+79000000000" className="transition hover:text-white">+7 (900) 000-00-00</a><a href="mailto:example@example.ru" className="transition hover:text-white">example@example.ru</a><span>Волгоград, Аллея Героев</span><span>Каждый день, 10:00–21:00</span></div></div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-cyan-50/45 [&>button]:hidden md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Бетка. Забота о вашей улыбке.</div>
          <button type="button" onClick={onOpenPrivacy} className="text-left uppercase tracking-[0.14em] transition hover:text-white">Конфиденциальность данных</button>
          <div className="flex flex-col gap-2 text-left uppercase tracking-[0.14em] md:flex-row md:gap-5">
            <button type="button" onClick={onOpenPrivacy} className="transition hover:text-white">Согласие на обработку персональных данных</button>
            <button type="button" onClick={onOpenPrivacy} className="transition hover:text-white">Политика обработки персональных данных</button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
