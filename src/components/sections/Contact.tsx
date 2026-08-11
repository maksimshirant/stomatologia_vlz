import { Container } from '../ui/Container'

export function Contact({ id }: { id: string }) {
  return (
    <section id={id} className="bg-[var(--color-surface)] py-16 md:py-24">
      <Container>
        <div>
          <h2 className="section-heading text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]"><span className="text-[var(--color-accent-strong)]">Сделайте шаг</span> к здоровой улыбке</h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-5">
          <article className="min-h-44 rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_45px_rgba(18,52,61,0.06)] sm:p-7">
            <div className="flex items-center gap-3 text-[var(--color-accent-strong)]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                <path d="M7 3H4.5A1.5 1.5 0 0 0 3 4.5C3 13.6 10.4 21 19.5 21a1.5 1.5 0 0 0 1.5-1.5V17l-5-1-1.4 2.1a15.7 15.7 0 0 1-8.7-8.7L8 8 7 3Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">Позвоните нам</div>
            </div>
            <a href="tel:+79000000000" className="mt-6 block text-2xl font-semibold text-[var(--color-heading)] transition hover:text-[var(--color-accent-strong)] sm:text-[1.7rem]">+7 (900) 000-00-00</a>
            <div className="mt-2 text-sm text-[var(--color-muted)]">Подберём время и ответим на вопросы</div>
          </article>

          <article className="min-h-44 rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_45px_rgba(18,52,61,0.06)] sm:p-7">
            <div className="flex items-center gap-3 text-[var(--color-accent-strong)]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">Удобное время</div>
            </div>
            <div className="mt-6 text-xl leading-8 text-[var(--color-heading)] sm:text-2xl">Каждый день</div>
            <div className="mt-1 text-base text-[var(--color-muted)]">10:00–21:00</div>
          </article>

          <article className="min-h-44 rounded-2xl border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_45px_rgba(18,52,61,0.06)] sm:p-7">
            <div className="flex items-center gap-3 text-[var(--color-accent-strong)]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.8">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">Ждём вас</div>
            </div>
            <div className="mt-6 text-xl leading-8 text-[var(--color-heading)] sm:text-2xl">Волгоград, Аллея Героев</div>
          </article>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-accent-pale)] shadow-[0_22px_55px_rgba(18,52,61,0.08)]">
          <div className="relative min-h-[360px] sm:min-h-[460px]">
            <iframe title="Карта проезда в Бетку " src="https://yandex.ru/map-widget/v1/?ll=44.509914%2C48.746256&pt=44.509914%2C48.746256%2Cpm2rdm&z=16" className="absolute inset-0 h-full w-full border-0" loading="lazy" />
          </div>
        </div>
      </Container>
    </section>
  )
}
