import { useState } from 'react'
import { Container } from '../ui/Container'

const ITEMS = [
  { question: 'Как подготовиться к первому приёму?', answer: 'Просто расскажите администратору, что вас беспокоит. Если есть результаты прошлых исследований, уточните при записи, нужно ли взять их с собой — остальное мы подскажем.' },
  { question: 'Что делать, если зуб болит прямо сейчас?', answer: 'Позвоните нам или оставьте заявку и отметьте, что нужна срочная помощь. Мы сориентируем по ближайшему возможному времени. Информация на сайте не заменяет очную консультацию врача.' },
  { question: 'Можно сначала прийти только на консультацию?', answer: 'Конечно. На первом приёме врач выслушает вас, проведёт осмотр и спокойно объяснит возможные дальнейшие шаги.' },
  { question: 'Квиз поставит диагноз?', answer: 'Нет, он лишь помогает заранее понять ваш запрос и быстрее подобрать специалиста. Диагноз ставит врач только после очной консультации.' },
  { question: 'Как узнать стоимость лечения?', answer: 'После осмотра врач предложит подходящие варианты, а администратор подробно сориентирует по стоимости выбранного плана.' },
]

export function Faq() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="border-y border-[var(--color-line)] bg-[var(--color-accent-pale)] py-16 md:py-24">
      <Container>
        <div className="border-b border-[var(--color-line)] pb-10">
          <h2 className="section-heading text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]"><span className="text-[var(--color-accent-strong)]">Всё важное</span> перед визитом</h2>
        </div>
        <div className="mt-8 grid gap-3">
          {ITEMS.map((item, index) => {
            const open = index === active
            return (
              <article key={item.question} className="overflow-hidden rounded-[22px] border border-[var(--color-line)] bg-white">
                <button type="button" onClick={() => setActive(open ? null : index)} className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-7">
                  <span className="text-lg font-medium text-[var(--color-heading)] sm:text-xl">{item.question}</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-pale)] text-xl text-[var(--color-accent-strong)]">{open ? '−' : '+'}</span>
                </button>
                {open ? <div className="border-t border-[var(--color-line)] px-5 py-5 text-sm leading-7 text-[var(--color-muted)] sm:px-7">{item.answer}</div> : null}
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
