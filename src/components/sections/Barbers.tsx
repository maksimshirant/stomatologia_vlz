import { useRef } from 'react'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

type Doctor = {
  name: string
  role: string
  image: string
}

const DOCTORS: ReadonlyArray<Doctor> = [
  { name: 'Анна Лебедева', role: 'Врач-стоматолог', image: '/dental/doctor-anna.png' },
  { name: 'Михаил Орлов', role: 'Стоматолог-хирург', image: '/dental/doctor-mikhail.png' },
  { name: 'Елена Соколова', role: 'Врач-ортодонт', image: '/dental/doctor-elena.png' },
  { name: 'Артём Волков', role: 'Стоматолог-гигиенист', image: '/dental/doctor-artem.png' },
]

export function Barbers({ id, onBook }: { id: string; onBook: (doctor: string) => void }) {
  const sliderRef = useRef<HTMLDivElement | null>(null)

  // Перелистывает карточки врачей на мобильных устройствах с циклическим переходом.
  const scrollCards = (direction: 'prev' | 'next') => {
    const slider = sliderRef.current
    if (!slider) return

    const cards = Array.from(slider.querySelectorAll('article'))
    const firstCard = cards[0]
    const cardWidth = firstCard instanceof HTMLElement ? firstCard.offsetWidth : slider.clientWidth
    const styles = window.getComputedStyle(slider)
    const gap = Number.parseFloat(styles.columnGap || styles.gap || '0') || 0
    const offset = cardWidth + gap
    const lastCard = cards[cards.length - 1]
    const lastCardLeft = lastCard instanceof HTMLElement ? lastCard.offsetLeft - slider.offsetLeft : slider.scrollWidth - slider.clientWidth

    if (direction === 'next' && slider.scrollLeft >= lastCardLeft - 4) {
      slider.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }
    if (direction === 'prev' && slider.scrollLeft <= 4) {
      slider.scrollTo({ left: lastCardLeft, behavior: 'smooth' })
      return
    }
    slider.scrollBy({ left: direction === 'next' ? offset : -offset, behavior: 'smooth' })
  }

  return (
    <section id={id} className="bg-[var(--color-bg)] py-16 md:py-24">
      <Container>
        <div className="border-b border-[var(--color-line)] pb-10">
          <h2 className="section-heading text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]">Специалисты, которым доверяют <span className="text-[var(--color-accent-strong)]">улыбку</span></h2>
        </div>
      </Container>

      <Container>
        <div className="mt-10">
        <div ref={sliderRef} className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-4">
          {DOCTORS.map((doctor) => (
            <article key={doctor.name} className="group min-w-full snap-start overflow-hidden rounded-[28px] border border-[var(--color-line)] bg-white shadow-[0_18px_45px_rgba(27,91,105,0.07)] md:min-w-0">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-accent-pale)]">
                <img src={doctor.image} alt={`${doctor.name}, ${doctor.role}`} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-5 pb-5 pt-16 text-white">
                  <div className="text-2xl [font-family:var(--font-display)]">{doctor.name}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/75">{doctor.role}</div>
                  <Button type="button" variant="primary" size="xs" className="mt-4" onClick={() => onBook(doctor.name)}>Записаться</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4 flex gap-3 md:hidden">
          <Button type="button" variant="outline" className="flex-1" onClick={() => scrollCards('prev')} aria-label="Предыдущий специалист">←</Button>
          <Button type="button" variant="outline" className="flex-1" onClick={() => scrollCards('next')} aria-label="Следующий специалист">→</Button>
        </div>
        </div>
      </Container>
    </section>
  )
}
