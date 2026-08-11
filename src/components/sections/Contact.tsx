import { assetUrl } from '../../lib/assetUrl'
import { Container } from '../ui/Container'

export function Contact({ id }: { id: string }) {
  return (
    <section id={id} className="bg-[var(--color-surface)] py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-5 lg:items-stretch lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-6">
          <div className="overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--color-accent-pale)] shadow-[0_18px_45px_rgba(18,52,61,0.1)]">
            <div className="relative min-h-[360px] sm:min-h-[460px] lg:h-full lg:min-h-0">
              <iframe title="Карта проезда в клинику" src="https://yandex.ru/map-widget/v1/?ll=44.509914%2C48.746256&pt=44.509914%2C48.746256%2Cpm2rdm&z=16" className="absolute inset-0 h-full w-full border-0" loading="lazy" />
            </div>
          </div>

          <article className="relative isolate overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--color-accent-pale)] p-5 shadow-[0_18px_45px_rgba(18,52,61,0.1)] sm:p-6 lg:p-8">
            <img src={assetUrl('dental/contact-doctor-cutout.png')} alt="" aria-hidden="true" loading="lazy" className="pointer-events-none absolute bottom-[-1.5rem] right-0 z-0 hidden h-[108%] w-[48%] object-contain object-bottom sm:block" />
            <div className="relative z-10 max-w-none [&>h2]:text-3xl sm:max-w-[58%] sm:[&>h2]:text-4xl">
              <h2 className="text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]">На связи с вами</h2>
              <a href="tel:+79000000000" className="mt-6 block whitespace-nowrap text-2xl font-semibold text-[var(--color-heading)] transition hover:text-[var(--color-accent-strong)] sm:text-3xl">+7 (900) 000-00-00</a>
              <div className="hidden">
                <a href="tel:+79000000000" className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-line)] bg-white/80 px-4 text-sm font-semibold text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]">Позвонить</a>
                <a href="mailto:example@example.ru" className="inline-flex min-h-11 items-center rounded-md border border-[var(--color-line)] bg-white/80 px-4 text-sm font-semibold text-[var(--color-heading)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]">Написать</a>
              </div>
              <p className="mt-6 text-base leading-7 text-[var(--color-heading)]">Волгоград, Аллея Героев</p>
              <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">Каждый день, 10:00-21:00</p>
              <p className="mt-6 text-sm leading-6 text-[var(--color-muted)]">Выберите удобный способ связи, мы ответим на вопросы и поможем подобрать время.</p>
            </div>
          </article>
        </div>
      </Container>
    </section>
  )
}
