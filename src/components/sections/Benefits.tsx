import { Container } from '../ui/Container'

const BENEFITS = [
  { title: 'Начинаем с вас', text: 'Внимательно выслушаем, проведём осмотр и простыми словами объясним, что поможет именно в вашей ситуации.' },
  { title: 'Бережно и без спешки', text: 'Создаём спокойную атмосферу, отвечаем на вопросы и заботимся о вашем комфорте на каждом этапе.' },
  { title: 'План, которому легко доверять', text: 'До начала лечения вы будете понимать последовательность шагов, сроки и возможные варианты решения.' },
  { title: 'Записаться просто', text: 'Оставьте контакты — администратор поможет выбрать удобное время и подходящего специалиста.' },
]

export function Benefits() {
  return (
    <section className="bg-[var(--color-bg)] py-16 md:py-24">
      <Container>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {BENEFITS.map((item) => (
            <article key={item.title} className="min-h-[250px] rounded-[28px] border border-[var(--color-line)] bg-white p-7">
              <h2 className="text-balance text-2xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:font-medium sm:leading-[0.98]">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
