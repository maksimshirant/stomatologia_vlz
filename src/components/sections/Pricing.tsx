import { useState } from 'react'
import type { FormEvent } from 'react'
import { useBookingMutation } from '../booking/useBookingMutation'
import { formatRussianPhone, isValidRussianPhone } from '../../api/contact'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

type QuizQuestionId = 'reason' | 'symptoms' | 'previous-treatment' | 'service' | 'timing'

type QuizQuestion = {
  id: QuizQuestionId
  title: string
  hint: string
  options: ReadonlyArray<string>
}

type QuizAnswers = Partial<Record<QuizQuestionId, string>>

const STORAGE_PREFIX = 'denta-vlg-quiz'

const QUESTIONS: ReadonlyArray<QuizQuestion> = [
  {
    id: 'reason',
    title: 'С чем вы хотите разобраться?',
    hint: 'Выберите близкий вариант — так мы быстрее подберём нужного специалиста.',
    options: ['Боль — нужна помощь как можно скорее', 'Хочу сделать улыбку красивее', 'Повреждён или отсутствует зуб', 'Хочу пройти профилактический осмотр', 'У меня другой вопрос'],
  },
  {
    id: 'symptoms',
    title: 'Что ощущаете сейчас?',
    hint: 'Это поможет бережно сориентировать вас и подобрать подходящего специалиста.',
    options: ['Ничего не беспокоит — хочу профилактику', 'Есть чувствительность зубов', 'Есть умеренная боль', 'Сильная боль', 'Есть отёк или кровоточивость'],
  },
  {
    id: 'previous-treatment',
    title: 'Вы уже обращались с этим вопросом?',
    hint: 'Это не диагностика: нам важно лишь понять вашу ситуацию до консультации.',
    options: ['Обращаюсь впервые', 'Уже консультировался(ась)', 'Недавно проходил(а) лечение', 'Лечение продолжается', 'Пока затрудняюсь ответить'],
  },
  {
    id: 'service',
    title: 'Какое решение вас интересует?',
    hint: 'Не уверены — выберите консультацию, врач поможет сориентироваться.',
    options: ['Консультация и диагностика', 'Лечение кариеса', 'Гигиена или улучшение цвета зубов', 'Имплантация или протезирование', 'Выравнивание зубов и прикуса'],
  },
  {
    id: 'timing',
    title: 'Когда вам было бы удобно прийти?',
    hint: 'Администратор предложит доступное время и согласует визит с вами.',
    options: ['Сегодня или как можно скорее', 'На этой неделе', 'В течение месяца', 'Планирую позже', 'Пока выбираю клинику'],
  },
]

// Восстанавливает только допустимые ответы текущей версии квиза.
function readStoredAnswers(): QuizAnswers {
  if (typeof window === 'undefined') return {}

  const restored: QuizAnswers = {}
  QUESTIONS.forEach((question) => {
    const stored = window.sessionStorage.getItem(`${STORAGE_PREFIX}-${question.id}`)
    if (stored && question.options.includes(stored)) {
      restored[question.id] = stored
    }
  })
  return restored
}

// Восстанавливает сохранённый шаг в допустимых границах квиза.
function readStoredStep() {
  if (typeof window === 'undefined') return 0

  const stored = Number.parseInt(window.sessionStorage.getItem(`${STORAGE_PREFIX}-step`) ?? '0', 10)
  return Number.isInteger(stored) && stored >= 0 && stored <= QUESTIONS.length ? stored : 0
}

export function Pricing({ id, onOpenConsent, onOpenPrivacy }: { id: string; onOpenConsent: () => void; onOpenPrivacy: () => void }) {
  const [answers, setAnswers] = useState<QuizAnswers>(readStoredAnswers)
  const [step, setStep] = useState(readStoredStep)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [validationError, setValidationError] = useState('')
  const mutation = useBookingMutation()
  const contactStep = step === QUESTIONS.length
  const activeQuestion = QUESTIONS[Math.min(step, QUESTIONS.length - 1)]
  const selectedAnswer = activeQuestion ? answers[activeQuestion.id] : undefined

  // Сохраняет выбранный ответ и оставляет его доступным при возврате назад.
  const selectAnswer = (answer: string) => {
    if (!activeQuestion) return

    setAnswers((current) => ({ ...current, [activeQuestion.id]: answer }))
    window.sessionStorage.setItem(`${STORAGE_PREFIX}-${activeQuestion.id}`, answer)
  }

  // Переходит на следующий вопрос или к контактной части квиза.
  const goNext = () => {
    if (!selectedAnswer) return

    const nextStep = Math.min(step + 1, QUESTIONS.length)
    setStep(nextStep)
    window.sessionStorage.setItem(`${STORAGE_PREFIX}-step`, String(nextStep))
  }

  // Возвращает пользователя к предыдущему вопросу без потери ответов.
  const goBack = () => {
    const nextStep = Math.max(step - 1, 0)
    setStep(nextStep)
    window.sessionStorage.setItem(`${STORAGE_PREFIX}-step`, String(nextStep))
  }

  // Полностью очищает локальное состояние и сохранённые данные квиза.
  const resetQuiz = () => {
    QUESTIONS.forEach((question) => {
      window.sessionStorage.removeItem(`${STORAGE_PREFIX}-${question.id}`)
    })
    window.sessionStorage.removeItem(`${STORAGE_PREFIX}-step`)
    setAnswers({})
    setStep(0)
    setName('')
    setPhone('')
    setConsent(false)
    setValidationError('')
    mutation.reset()
  }

  // Отправляет контакты вместе с пятью ответами через общий слой обращений.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !isValidRussianPhone(phone) || !consent) {
      setValidationError('Заполните имя и телефон в формате +7 (999) 999-99-99, затем подтвердите согласие на обработку данных.')
      return
    }

    setValidationError('')

    mutation.mutate(
      {
        source: 'quiz',
        name,
        phone,
        quizAnswers: QUESTIONS.flatMap((question) => {
          const answer = answers[question.id]
          return answer ? [{ id: question.id, question: question.title, answer }] : []
        }),
      },
      {
        onSuccess: () => {
          QUESTIONS.forEach((question) => {
            window.sessionStorage.removeItem(`${STORAGE_PREFIX}-${question.id}`)
          })
          window.sessionStorage.removeItem(`${STORAGE_PREFIX}-step`)
        },
      },
    )
  }

  return (
    <section id={id} className="border-y border-[var(--color-line)] bg-[var(--color-accent-pale)] py-16 md:py-24">
      <Container>
        <div className="border-b border-[var(--color-line)] pb-10">
          <h2 className="section-heading text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]">
            <span className="text-[var(--color-accent-strong)]">Подберём</span> решение для вашей улыбки
          </h2>
        </div>

        <div className={`relative mt-10 overflow-hidden rounded-[28px] border border-white bg-[linear-gradient(135deg,#ffffff_0%,#f6fcfc_62%,#e2f3f4_100%)] shadow-[0_24px_70px_rgba(27,91,105,0.1)] transition-[min-height] duration-500 ease-out ${contactStep || mutation.isSuccess ? 'min-h-[390px]' : 'min-h-[590px] sm:min-h-[510px]'}`}>
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-[var(--color-accent)]/10" />
          <div className="pointer-events-none absolute -bottom-28 right-16 h-64 w-64 rounded-full border-[44px] border-[var(--color-accent)]/10" />
          <div className="pointer-events-none absolute left-[42%] top-12 h-20 w-20 rotate-45 rounded-[22px] border border-[var(--color-accent)]/15" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            {mutation.isSuccess ? (
              <div className="mx-auto max-w-lg py-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)] text-2xl text-white">✓</div>
                <h3 className="mt-6 text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:font-medium sm:leading-[0.98]">Спасибо, вы сделали первый шаг</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
                  Заявка принята. Администратор свяжется с вами по указанному телефону, чтобы подобрать удобное время.
                </p>
                <Button type="button" onClick={resetQuiz} className="mt-7">Выбрать другой вариант</Button>
              </div>
            ) : contactStep ? (
              <form noValidate onSubmit={handleSubmit} className="transition-opacity duration-300">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">Почти готово</div>
                <h3 className="mt-4 text-balance text-3xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-4xl sm:font-medium sm:leading-[0.98]">Как с вами связаться?</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">Оставьте контакты — ваши ответы добавятся к заявке, и мы подготовимся к разговору.</p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-medium text-[var(--color-heading)]">
                    Как к вам обращаться
                    <input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Ваше имя" className="min-h-12 rounded-2xl border border-[var(--color-line)] px-4 text-base outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10" />
                  </label>
                  <label className="grid gap-2 text-sm font-medium text-[var(--color-heading)]">
                    Телефон для связи
                    <input value={phone} onChange={(event) => setPhone(formatRussianPhone(event.target.value))} required inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" className="min-h-12 rounded-2xl border border-[var(--color-line)] px-4 text-base outline-none focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10" />
                  </label>
                </div>

                {validationError ? <div role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{validationError}</div> : null}
                {mutation.error ? <div role="alert" className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{mutation.error.message}</div> : null}

                <label className="mt-6 flex cursor-pointer items-start gap-2 text-xs leading-5 text-[var(--color-muted)]">
                  <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="peer sr-only" />
                  <span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${consent ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white' : 'border-[var(--color-line)] bg-white text-[var(--color-accent-strong)]'}`}>
                    <svg viewBox="0 0 36 36" fill="none" className="h-4 w-4"><path d="M10.5 5.5c3.1 0 3.9 1.7 7.5 1.7s4.4-1.7 7.5-1.7c4.1 0 6.9 3.3 6.9 7.3 0 3.4-1.7 5.5-2.9 8.5-1.5 3.8-1.8 9.5-5.5 9.5-2.7 0-1.8-6.6-6-6.6s-3.3 6.6-6 6.6c-3.7 0-4-5.7-5.5-9.5-1.2-3-2.9-5.1-2.9-8.5 0-4 2.8-7.3 6.9-7.3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg>
                  </span>
                  <span>Нажимая на кнопку «Получить консультацию», я даю <button type="button" onClick={onOpenConsent} className="text-[var(--color-accent-strong)] transition hover:text-[var(--color-heading)]">согласие на обработку персональных данных</button> и принимаю <button type="button" onClick={onOpenPrivacy} className="text-[var(--color-accent-strong)] transition hover:text-[var(--color-heading)]">Политику обработки персональных данных</button>.</span>
                </label>
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <Button type="button" variant="outline" onClick={goBack}>Назад</Button>
                  <Button type="submit" disabled={mutation.isPending || !name.trim() || !isValidRussianPhone(phone) || !consent}>{mutation.isPending ? 'Отправляем заявку…' : 'Получить консультацию'}</Button>
                </div>
              </form>
            ) : (
              <div>
                <div className="flex items-center justify-between gap-4">
                  <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">Шаг {step + 1} из {QUESTIONS.length}</div>
                  <div className="text-sm font-medium text-[var(--color-muted)]">{Math.round(((step + 1) / QUESTIONS.length) * 100)}%</div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-[var(--color-accent)] transition-[width] duration-300" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
                </div>

                <h3 className="mt-7 text-balance text-3xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-4xl sm:font-medium sm:leading-[0.98]">{activeQuestion.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{activeQuestion.hint}</p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {activeQuestion.options.map((option) => {
                    const selected = selectedAnswer === option
                    return (
                      <button key={option} type="button" onClick={() => selectAnswer(option)} aria-pressed={selected} className={`flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${selected ? 'border-[var(--color-accent)] bg-[var(--color-accent-pale)] text-[var(--color-heading)] ring-2 ring-[var(--color-accent)]/10' : 'border-[var(--color-line)] bg-white text-slate-700 hover:border-[var(--color-accent)]/55'}`}>
                        <span className={`h-4 w-4 shrink-0 rounded-full border-4 ${selected ? 'border-[var(--color-accent)] bg-white' : 'border-slate-200 bg-white'}`} />
                        {option}
                      </button>
                    )
                  })}
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                  <Button type="button" variant="outline" onClick={step === 0 ? resetQuiz : goBack} disabled={step === 0}>Назад</Button>
                  <Button type="button" onClick={goNext} disabled={!selectedAnswer}>Продолжить</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
