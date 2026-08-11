import { useState } from 'react'
import type { FormEvent } from 'react'
import { useBookingMutation } from '../booking/useBookingMutation'
import { formatRussianPhone, isValidRussianPhone } from '../../api/contact'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function Reviews({
  id,
  onOpenConsent,
  onOpenPrivacy,
}: {
  id: string
  onOpenBooking: () => void
  onOpenConsent: () => void
  onOpenPrivacy: () => void
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [validationError, setValidationError] = useState('')
  const mutation = useBookingMutation()

  // Отправляет заявку на обратный звонок через общий слой обращений.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!name.trim() || !isValidRussianPhone(phone) || !consent) {
      setValidationError('Заполните имя и телефон в формате +7 (999) 999-99-99, затем подтвердите согласие на обработку данных.')
      return
    }

    setValidationError('')
    mutation.mutate({ source: 'feedback', name, phone })
  }

  return (
    <section id={id} className="bg-[var(--color-bg)] py-10 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/65 shadow-[0_12px_28px_rgba(14,137,149,0.13),0_28px_72px_rgba(14,137,149,0.2)] backdrop-blur-sm">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-full bg-[radial-gradient(circle_at_78%_50%,rgba(24,187,199,0.2),rgba(24,187,199,0.05)_28%,transparent_56%)] sm:w-3/5" />
          <div aria-hidden="true" className="absolute -right-24 -top-40 h-[470px] w-[470px] rounded-full border border-[var(--color-accent)]/15" />
          <div aria-hidden="true" className="absolute -right-3 -top-16 h-[330px] w-[330px] rounded-full border border-[var(--color-accent)]/20" />
          <div aria-hidden="true" className="absolute bottom-10 right-[8%] hidden h-10 w-10 rotate-12 rounded-xl bg-[var(--color-accent)]/20 sm:block" />
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="absolute -right-5 bottom-[-54px] h-[290px] w-[290px] rotate-[-9deg] text-[var(--color-accent)] opacity-[0.14] sm:right-[5%] sm:bottom-[-70px] sm:h-[360px] sm:w-[360px]"
          >
            <path
              d="M7.2 3.6c1.7 0 2.7.9 4.8.9s3.1-.9 4.8-.9c2.5 0 4.2 2 4.2 4.5 0 2.1-1 3.4-1.8 5.5-.9 2.3-1.1 6.8-3.6 6.8-1.8 0-1.4-4.7-3.6-4.7s-1.8 4.7-3.6 4.7c-2.5 0-2.7-4.5-3.6-6.8C4 11.5 3 10.2 3 8.1c0-2.5 1.7-4.5 4.2-4.5Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>

          <div className="relative z-10 flex min-h-[360px] items-center px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
            <div className="w-full max-w-2xl">
                <h2 className="section-heading text-balance text-[1.8rem] font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-[2.15rem] sm:font-medium sm:leading-[0.98] lg:whitespace-nowrap">
                  <span className="text-[var(--color-accent-strong)]">Найдём</span> удобное время для вас
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--color-muted)]">
                  Оставьте контакты — администратор поможет выбрать специалиста, ответит на вопросы и согласует удобное время.
                </p>

                {mutation.isSuccess ? (
                  <div className="mt-8 rounded-[24px] border border-[var(--color-accent)]/20 bg-[var(--color-accent-pale)] p-6 sm:p-7">
                    <div className="text-2xl text-[var(--color-heading)] [font-family:var(--font-display)]">
                      Спасибо, заявка принята
                    </div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                      Вскоре администратор свяжется с вами, чтобы подтвердить удобное время.
                    </p>
                  </div>
                ) : (
                  <form noValidate onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="sr-only">Как к вам обращаться</span>
                      <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                        autoComplete="name"
                        placeholder="Как к вам обращаться"
                        className="min-h-12 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 text-sm font-normal text-[var(--color-heading)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
                      />
                    </label>
                    <label>
                      <span className="sr-only">Телефон для связи</span>
                      <input
                        value={phone}
                        onChange={(event) => setPhone(formatRussianPhone(event.target.value))}
                        required
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="Телефон для связи *"
                        className="min-h-12 w-full rounded-2xl border border-[var(--color-line)] bg-white px-4 text-sm font-normal text-[var(--color-heading)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
                      />
                    </label>

                    {validationError ? (
                      <div role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
                        {validationError}
                      </div>
                    ) : null}

                    {mutation.error ? (
                      <div role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
                        {mutation.error.message}
                      </div>
                    ) : null}

                    <div className="grid gap-3 sm:col-span-2">
                      <label className="flex cursor-pointer items-start gap-2 text-xs leading-5 text-[var(--color-muted)]">
                        <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="peer sr-only" />
                        <span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${consent ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white' : 'border-[var(--color-line)] bg-white text-[var(--color-accent-strong)]'}`}>
                          <svg viewBox="0 0 36 36" fill="none" className="h-4 w-4"><path d="M10.5 5.5c3.1 0 3.9 1.7 7.5 1.7s4.4-1.7 7.5-1.7c4.1 0 6.9 3.3 6.9 7.3 0 3.4-1.7 5.5-2.9 8.5-1.5 3.8-1.8 9.5-5.5 9.5-2.7 0-1.8-6.6-6-6.6s-3.3 6.6-6 6.6c-3.7 0-4-5.7-5.5-9.5-1.2-3-2.9-5.1-2.9-8.5 0-4 2.8-7.3 6.9-7.3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg>
                        </span>
                        <span>Нажимая на кнопку «Подобрать время», я даю <button type="button" onClick={onOpenConsent} className="text-[var(--color-accent-strong)] transition hover:text-[var(--color-heading)]">согласие на обработку персональных данных</button> и принимаю <button type="button" onClick={onOpenPrivacy} className="text-[var(--color-accent-strong)] transition hover:text-[var(--color-heading)]">Политику обработки персональных данных</button>.</span>
                      </label>
                      <Button type="submit" size="sm" disabled={mutation.isPending || !name.trim() || !isValidRussianPhone(phone) || !consent} className="min-h-10 w-full px-7 sm:w-fit">
                        {mutation.isPending ? 'Отправляем заявку…' : 'Подобрать время'}
                      </Button>
                    </div>
                  </form>
                )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
