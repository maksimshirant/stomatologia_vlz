import { assetUrl } from '../../lib/assetUrl'
import { Container } from '../ui/Container'

const GALLERY = [
  { title: 'Спокойствие с первых минут', text: 'Светлая зона ожидания, где легко расслабиться перед приёмом.', image: '/dental/clinic-reception.png' },
  { title: 'Вас слышат', text: 'Обсуждаем ваши цели и подбираем решение вместе с вами.', image: '/dental/consultation.png' },
  { title: 'Комфортный приём', text: 'Подготовленное пространство для внимательной заботы о вашей улыбке.', image: '/dental/treatment-room.png' },
  { title: 'Уверенность в решении', text: 'Разбираем результаты исследования и отвечаем на все важные вопросы.', image: '/dental/diagnostics.png' },
]

export function Gallery({ id }: { id: string }) {
  return (
    <section id={id} className="bg-[var(--color-accent-pale)] py-16 md:py-24">
      <Container>
        <div className="border-b border-[var(--color-line)] pb-10">
          <h2 className="section-heading text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]"><span className="text-[var(--color-accent-strong)]">Место</span>, где о вашей улыбке заботятся</h2>
        </div>

        <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2">
          {GALLERY.map((item) => (
            <article key={item.title} className="relative flex h-full flex-col overflow-hidden rounded-[30px] bg-white">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={assetUrl(item.image)} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,31,35,0.08)_15%,rgba(4,31,35,0.74)_100%)] md:hidden" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white md:static md:p-7 md:text-inherit">
                <h3 className="text-balance text-2xl font-semibold leading-[0.93] tracking-[-0.055em] [font-family:var(--font-display)] sm:font-medium sm:leading-[0.98] md:text-[var(--color-heading)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/85 md:text-[var(--color-muted)]">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
