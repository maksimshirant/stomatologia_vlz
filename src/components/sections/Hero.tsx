import { Button } from '../ui/Button'
import { assetUrl } from '../../lib/assetUrl'
import { Container } from '../ui/Container'

const HERO_FACTS = [
  { value: '5/5', label: 'оценка заботы о пациентах' },
  { value: '7 дней', label: 'на связи без выходных' },
  { value: '10 минут', label: 'от центра Волгограда' },
]

export function Hero({ onPrimaryCta }: { onPrimaryCta: () => void }) {
  return (
    <section id="top" className="relative -mt-[73px] overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-accent-pale)]">
      <div className="absolute inset-0">
        <img src={assetUrl('dental/hero.png')} alt="Пациентка в комфортной стоматологической клинике" fetchPriority="high" className="hidden h-full w-full object-cover object-[68%_center] sm:object-center md:block" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden md:hidden">
        <img src={assetUrl('фон на мобилку бирюзовый.png')} alt="" fetchPriority="high" className="h-full w-full object-cover" />
      </div>

      <Container>
        <div className="relative flex min-h-[100svh] pb-24 pt-[120px] sm:items-center sm:py-24">
          <div className="flex max-w-2xl flex-1 flex-col md:block md:max-w-4xl">
            <div className="relative flex flex-1 flex-col justify-center md:block">
              <h1 className="relative w-full max-w-none text-balance text-[clamp(3.25rem,17vw,5rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] md:text-[4rem] md:font-medium md:leading-[0.98] lg:text-[5.4rem]">
                <span className="block">Улыбка,</span>
                <span className="inline-flex items-center gap-2 text-[var(--color-accent-strong)]">которой <svg viewBox="0 0 36 36" fill="none" className="h-[0.65em] w-[0.65em] shrink-0" aria-hidden="true"><path d="M10.5 5.5c3.1 0 3.9 1.7 7.5 1.7s4.4-1.7 7.5-1.7c4.1 0 6.9 3.3 6.9 7.3 0 3.4-1.7 5.5-2.9 8.5-1.5 3.8-1.8 9.5-5.5 9.5-2.7 0-1.8-6.6-6-6.6s-3.3 6.6-6 6.6c-3.7 0-4-5.7-5.5-9.5-1.2-3-2.9-5.1-2.9-8.5 0-4 2.8-7.3 6.9-7.3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg></span>
                <span className="block">хочется гордиться</span>
              </h1>
              <svg viewBox="0 0 220 32" fill="none" className="relative mt-4 h-6 w-44 text-[var(--color-accent)] md:mt-6 md:h-8 md:w-52" aria-hidden="true"><path d="M4 8c43 29 169 29 212 0" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /><path d="M52 4 58 13M110 12l2 10M169 4l-6 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" /></svg>
            </div>
            <p className="mt-6 hidden max-w-xl text-base leading-7 text-[var(--color-muted)] md:block md:text-lg md:leading-8">
              Выслушаем без спешки, бережно разберём вашу ситуацию и подскажем путь к здоровой, красивой улыбке.
            </p>

            <div className="mt-auto flex w-full flex-col gap-3 pt-8 md:mt-8 md:pt-0 md:flex-row">
              <Button onClick={onPrimaryCta} className="w-full md:w-auto">Выбрать время для консультации</Button>
              <Button type="button" variant="outline" className="w-full md:w-auto" onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
                Найти своё решение
              </Button>
            </div>

            <div className="mt-10 hidden max-w-xl grid-cols-3 gap-2 border-t border-[var(--color-line)] pt-6 md:grid md:gap-3">
              {HERO_FACTS.map((fact) => (
                <div key={fact.label}>
                  <div className="text-xl font-semibold text-[var(--color-heading)] md:text-2xl">{fact.value}</div>
                  <div className="mt-1 text-[10px] leading-4 text-[var(--color-muted)] md:text-xs">{fact.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
