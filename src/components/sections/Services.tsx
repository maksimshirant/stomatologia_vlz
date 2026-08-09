import { Button } from '../ui/Button'
import { assetUrl } from '../../lib/assetUrl'
import { Container } from '../ui/Container'

type Service = {
  title: string
  desc: string
  features: ReadonlyArray<string>
}

const SERVICES: ReadonlyArray<Service> = [
  { title: 'Лечение и восстановление', desc: 'Поможем сохранить здоровье зубов, устранить кариес и вернуть комфорт при каждом приёме пищи.', features: ['Осмотр и понятные рекомендации', 'Бережное лечение кариеса', 'Эстетичное восстановление зубов'] },
  { title: 'Чистота и сияние улыбки', desc: 'Профессиональный уход для свежего дыхания, здоровых дёсен и улыбки, которую хочется показывать.', features: ['Профессиональная гигиена', 'Персональные рекомендации по уходу', 'Подбор эстетического решения'] },
  { title: 'Имплантация и хирургия', desc: 'Восстановим утраченные зубы и уверенность в себе, составив последовательный план лечения.', features: ['Консультация хирурга', 'Имплантация', 'Подготовка к протезированию'] },
  { title: 'Ровная улыбка и протезирование', desc: 'Подберём решение для правильного прикуса, комфорта и естественной эстетики вашей улыбки.', features: ['Консультация ортодонта', 'Коррекция прикуса', 'Современное протезирование'] },
]

const SERVICE_IMAGES = [
  '/dental/treatment-room.png',
  '/dental/consultation.png',
  '/dental/diagnostics.png',
  '/dental/hero.png',
] as const

export function Services({ id, onPickService }: { id: string; onPickService: (service: string) => void }) {
  return (
    <section id={id} className="relative overflow-hidden bg-[var(--color-bg)] py-16 md:py-24">
      <Container>
        <div className="border-b border-[var(--color-line)] pb-10">
          <h2 className="section-heading text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]">Решения для <span className="text-[var(--color-accent-strong)]">здоровья</span>, комфорта и красоты улыбки</h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <article key={service.title} style={{ backgroundImage: `linear-gradient(110deg, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 52%, rgba(255,255,255,0.36) 100%), url(${assetUrl(SERVICE_IMAGES[index])})` }} className="flex min-h-[340px] flex-col overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[var(--color-accent-pale)] bg-cover bg-center p-7 sm:p-9">
              <h3 className="text-balance text-3xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-4xl sm:font-medium sm:leading-[0.98]">{service.title}</h3>
              <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-muted)]">{service.desc}</p>
              <ul className="mt-7 grid gap-3">
                {service.features.map((feature) => <li key={feature} className="flex items-center gap-3 text-sm text-slate-600"><span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />{feature}</li>)}
              </ul>
              <div className="mt-auto pt-8"><Button type="button" variant="outline" onClick={() => onPickService(service.title)}>Хочу узнать подробнее</Button></div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
