import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import type { BookingModalPreset } from './types'
import { useBookingMutation } from './useBookingMutation'
import { formatRussianPhone, isValidRussianPhone } from '../../api/contact'

export function BookingModal({
  open,
  preset,
  onClose,
  onOpenConsent,
  onOpenPrivacy,
}: {
  open: boolean
  preset: BookingModalPreset | null
  onClose: () => void
  onOpenConsent: () => void
  onOpenPrivacy: () => void
}) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [question, setQuestion] = useState('')
  const [consent, setConsent] = useState(false)
  const [validationError, setValidationError] = useState('')
  const mutation = useBookingMutation()

  useEffect(() => {
    if (!open) return

    setName('')
    setPhone('')
    setConsent(false)
    setValidationError('')
    setQuestion(
      preset?.service
        ? `Хочу узнать, какое решение подойдёт мне в направлении «${preset.service}»`
        : preset?.barber
          ? `Хочу записаться на консультацию к специалисту ${preset.barber}`
          : '',
    )
    mutation.reset()
  }, [open, preset?.barber, preset?.service])

  // Отправляет стандартное обращение через общий тестовый слой данных.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name.trim() || !isValidRussianPhone(phone) || !consent) {
      setValidationError('Заполните имя и телефон в формате +7 (999) 999-99-99, затем подтвердите согласие на обработку данных.')
      return
    }

    setValidationError('')
    mutation.mutate({
      source: 'feedback',
      name,
      phone,
      question: question.trim() || undefined,
    })
  }

  return (
    <Modal
      open={open}
      eyebrow="Сделайте первый шаг"
      title="Оставьте контакты — поможем выбрать специалиста и удобное время для консультации."
      showEyebrowGraphic={false}
      onClose={onClose}
    >
      {mutation.isSuccess ? (
        <div className="rounded-[28px] bg-[var(--color-accent-pale)] p-7 text-center sm:p-9">
          <div className="text-3xl text-[var(--color-heading)] [font-family:var(--font-display)]">
            Спасибо, вы сделали важный шаг
          </div>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--color-muted)]">
            Заявка принята. Администратор свяжется с вами, чтобы подтвердить удобное время и ответить на вопросы.
          </p>
          <Button type="button" onClick={onClose} className="mt-7">
            Вернуться на сайт
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="grid gap-5">
          <label className="grid">
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoComplete="name"
              aria-label="Как к вам обращаться"
              placeholder="Как к вам обращаться"
              className="min-h-12 rounded-2xl border border-[var(--color-line)] bg-white px-4 text-base text-[var(--color-heading)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
            />
          </label>
          <label className="grid">
            <input
              value={phone}
              onChange={(event) => setPhone(formatRussianPhone(event.target.value))}
              required
              inputMode="tel"
              autoComplete="tel"
              aria-label="Телефон для связи"
              placeholder="Телефон для связи: +7 (___) ___-__-__"
              className="min-h-12 rounded-2xl border border-[var(--color-line)] bg-white px-4 text-base text-[var(--color-heading)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
            />
          </label>
          <label className="grid">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={4}
              aria-label="Что вас беспокоит"
              placeholder="Что вас беспокоит? Можно не заполнять"
              className="resize-none rounded-2xl border border-[var(--color-line)] bg-white px-4 py-3 text-base text-[var(--color-heading)] outline-none transition placeholder:text-slate-400 focus:border-[var(--color-accent)] focus:ring-4 focus:ring-[var(--color-accent)]/10"
            />
          </label>

          {validationError ? (
            <div role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {validationError}
            </div>
          ) : null}

          {mutation.error ? (
            <div role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">
              {mutation.error.message}
            </div>
          ) : null}

          <label className="flex w-full cursor-pointer items-start gap-2 text-xs leading-5 text-[var(--color-muted)]">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} required className="peer sr-only" />
            <span aria-hidden="true" className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${consent ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white' : 'border-[var(--color-line)] bg-white text-[var(--color-accent-strong)]'}`}>
              <svg viewBox="0 0 36 36" fill="none" className="h-4 w-4"><path d="M10.5 5.5c3.1 0 3.9 1.7 7.5 1.7s4.4-1.7 7.5-1.7c4.1 0 6.9 3.3 6.9 7.3 0 3.4-1.7 5.5-2.9 8.5-1.5 3.8-1.8 9.5-5.5 9.5-2.7 0-1.8-6.6-6-6.6s-3.3 6.6-6 6.6c-3.7 0-4-5.7-5.5-9.5-1.2-3-2.9-5.1-2.9-8.5 0-4 2.8-7.3 6.9-7.3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg>
            </span>
            <span>Нажимая на кнопку Получить консультацию, я даю <button type="button" onClick={onOpenConsent} className="text-[var(--color-accent-strong)] transition hover:text-[var(--color-heading)]">согласие на обработку персональных данных</button> и принимаю <button type="button" onClick={onOpenPrivacy} className="text-[var(--color-accent-strong)] transition hover:text-[var(--color-heading)]">Политику обработки персональных данных</button>.</span>
          </label>
          <Button type="submit" disabled={mutation.isPending || !name.trim() || !isValidRussianPhone(phone) || !consent} className="mt-1 w-full sm:w-auto">
            {mutation.isPending ? 'Отправляем заявку…' : 'Получить консультацию'}
          </Button>
        </form>
      )}
    </Modal>
  )
}
