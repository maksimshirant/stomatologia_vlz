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

const SERVICE_OBJECT_POSITIONS = ['0% 0%', '100% 0%', '0% 100%', '100% 100%'] as const

const SERVICE_OBJECT_LAYOUT = [
  { imageClass: 'bottom-[-0.5rem] right-[-0.5rem] h-40 w-40 sm:h-48 sm:w-48 md:h-52 md:w-52', contentClass: 'max-w-[80%] md:max-w-[72%]' },
  { imageClass: 'bottom-[-0.25rem] right-[-0.25rem] h-28 w-28 sm:h-36 sm:w-36 md:h-40 md:w-40', contentClass: 'max-w-[80%] md:max-w-[74%]' },
  { imageClass: 'bottom-[-0.5rem] right-[-0.5rem] h-32 w-32 sm:h-40 sm:w-40 md:h-44 md:w-44', contentClass: 'max-w-[80%] md:max-w-[74%]' },
  { imageClass: 'bottom-[-0.75rem] right-[-0.5rem] h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48', contentClass: 'max-w-[80%] md:max-w-[72%]' },
] as const

export function Services({ id, onPickService }: { id: string; onPickService: (service: string) => void }) {
  return (
    <section id={id} className="relative overflow-hidden border-t border-[var(--color-line)] bg-[var(--color-bg)] py-16 md:py-24">
      <Container>
        <div className="pb-10">
          <h2 className="section-heading text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]">Решения для <span className="text-[var(--color-accent-strong)]">здоровья</span>, комфорта и красоты улыбки</h2>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-12">
          {SERVICES.map((service, index) => (
            <article key={service.title} className={`relative flex min-h-[300px] flex-col overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-[#edf3ff] p-5 sm:p-6 md:min-h-[340px] ${index === 0 || index === 3 ? 'md:col-span-7' : 'md:col-span-5'}`}>
              <div aria-hidden="true" style={{ backgroundImage: `url(${assetUrl('dental/service-objects-cutout.png')})`, backgroundPosition: SERVICE_OBJECT_POSITIONS[index], backgroundSize: '200% 200%' }} className={`pointer-events-none absolute z-0 bg-no-repeat opacity-95 ${SERVICE_OBJECT_LAYOUT[index].imageClass}`} />
              <h3 className={`relative z-10 text-balance text-3xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-4xl sm:font-medium sm:leading-[0.98] ${SERVICE_OBJECT_LAYOUT[index].contentClass}`}>{service.title}</h3>
              <p className={`relative z-10 mt-4 text-sm leading-6 text-[var(--color-muted)] ${SERVICE_OBJECT_LAYOUT[index].contentClass}`}>{service.desc}</p>
              <ul className="hidden">
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
